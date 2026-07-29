import type { SupabaseClient, User } from '@supabase/supabase-js'

import { supabase } from '@/infrastructure/supabase/client'
import type { Database, GalleryRow } from '@/infrastructure/supabase/database.types'

import type { AdminContentRepository } from './adminContentRepository'
import type { AdminUser, SharedStopExperience, SharedStopPhoto } from '../types'

function client(): SupabaseClient<Database> {
  if (!supabase) throw new Error('Supabase environment variables are not configured')
  return supabase
}

function usernameEmail(username: string): string {
  if (!/^[a-z0-9._-]{3,32}$/.test(username)) throw new Error('INVALID_USERNAME')
  return `${username}.routeguide@example.com`
}

async function adminUser(user: User): Promise<AdminUser> {
  const { data, error } = await client()
    .from('profiles')
    .select('username,display_name,is_editor')
    .eq('id', user.id)
    .maybeSingle()
  if (!error && data && !data.is_editor) throw new Error('EDITOR_ACCESS_REQUIRED')
  const username =
    data?.username ?? String(user.user_metadata.username ?? user.email?.split('@')[0] ?? '')
  const displayName = data?.display_name ?? String(user.user_metadata.display_name ?? username)
  return { id: user.id, username, displayName }
}

function publicUrl(row: GalleryRow): string {
  if (row.external_url) return row.external_url
  if (!row.storage_path) return ''
  return client().storage.from(row.bucket).getPublicUrl(row.storage_path).data.publicUrl
}

function photo(row: GalleryRow): SharedStopPhoto {
  return {
    id: row.id,
    url: publicUrl(row),
    storagePath: row.storage_path,
    bucket: row.bucket as 'covers' | 'gallery',
    caption: row.caption,
    isCover: row.is_cover,
    position: row.position,
    sourceType: row.source_type as 'guide' | 'placeholder' | 'trip'
  }
}

function emptyExperience(): SharedStopExperience {
  return {
    body: '',
    isPublished: true,
    authorName: null,
    updatedAt: null
  }
}

async function requireUser(): Promise<User> {
  const { data, error } = await client().auth.getUser()
  if (error || !data.user) throw error ?? new Error('Authentication required')
  return data.user
}

async function stopIdForSlug(
  stopSlug: string
): Promise<{ id: string; titleKey: string; contentKey: string }> {
  const { data, error } = await client()
    .from('stops')
    .select('id,title_key,content_key')
    .eq('slug', stopSlug)
    .single()
  if (error) throw error
  return { id: data.id, titleKey: data.title_key, contentKey: data.content_key }
}

export const supabaseAdminContentRepository: AdminContentRepository = {
  async currentUser() {
    const { data } = await client().auth.getSession()
    return data.session?.user ? adminUser(data.session.user) : null
  },

  async signIn(username, password) {
    const { data, error } = await client().auth.signInWithPassword({
      email: usernameEmail(username),
      password
    })
    if (error) throw error
    if (!data.user) throw new Error('Authentication failed')
    return adminUser(data.user)
  },

  async signOut() {
    const { error } = await client().auth.signOut()
    if (error) throw error
  },

  async getStopEditor(stopSlug) {
    await requireUser()
    const stop = await stopIdForSlug(stopSlug)
    const [experienceResult, galleryResult] = await Promise.all([
      client().from('stop_experiences').select('*').eq('stop_id', stop.id),
      client()
        .from('galleries')
        .select('*')
        .eq('stop_id', stop.id)
        .order('is_cover', { ascending: false })
        .order('position')
    ])
    if (experienceResult.error) throw experienceResult.error
    if (galleryResult.error) throw galleryResult.error
    const rows = [...(experienceResult.data ?? [])].sort((a, b) =>
      b.updated_at.localeCompare(a.updated_at)
    )
    const row = rows.find((experience) => experience.locale === 'tr') ?? rows[0]
    const experience = row
      ? {
          body: row.body,
          isPublished: row.is_published,
          authorName: row.author_name,
          updatedAt: row.updated_at
        }
      : emptyExperience()

    return {
      stopId: stop.id,
      stopSlug,
      titleKey: stop.titleKey,
      photos: (galleryResult.data ?? []).map(photo),
      experience
    }
  },

  async saveExperience(stopSlug, input) {
    const user = await requireUser()
    const author = await adminUser(user)
    const stop = await stopIdForSlug(stopSlug)
    const { error } = await client().from('stop_experiences').upsert(
      {
        stop_id: stop.id,
        body: input.body,
        locale: 'tr',
        is_published: input.isPublished,
        updated_by: user.id,
        author_name: author.displayName
      },
      { onConflict: 'stop_id,locale' }
    )
    if (error) throw error
    const { error: cleanupError } = await client()
      .from('stop_experiences')
      .delete()
      .eq('stop_id', stop.id)
      .neq('locale', 'tr')
    if (cleanupError) throw cleanupError
  },

  async uploadPhoto(stopSlug, image, caption) {
    const user = await requireUser()
    const stop = await stopIdForSlug(stopSlug)
    const { data: existing, error: countError } = await client()
      .from('galleries')
      .select('id,position,source_type')
      .eq('stop_id', stop.id)
      .order('position', { ascending: false })
    if (countError) throw countError
    const tripPhotoCount = existing?.filter((item) => item.source_type === 'trip').length ?? 0
    if (tripPhotoCount >= 10) throw new Error('PHOTO_LIMIT_REACHED')

    const storagePath = `${stopSlug}/${Date.now()}-${crypto.randomUUID()}.webp`
    const uploadResult = await client().storage.from('gallery').upload(storagePath, image, {
      contentType: 'image/webp',
      cacheControl: '31536000',
      upsert: false
    })
    if (uploadResult.error) throw uploadResult.error

    const position = existing?.length ? Math.max(...existing.map((item) => item.position)) + 1 : 0
    const insertResult = await client()
      .from('galleries')
      .insert({
        route_id: null,
        stop_id: stop.id,
        camping_spot_id: null,
        bucket: 'gallery',
        storage_path: storagePath,
        external_url: null,
        alt_key: `${stop.contentKey}.photoAlt`,
        position,
        is_cover: (existing?.length ?? 0) === 0,
        caption: caption.trim() || null,
        uploaded_by: user.id,
        source_type: 'trip'
      })
    if (insertResult.error) {
      await client().storage.from('gallery').remove([storagePath])
      throw insertResult.error
    }
  },

  async deletePhoto(photoId) {
    await requireUser()
    const { data, error } = await client().from('galleries').select('*').eq('id', photoId).single()
    if (error) throw error
    if (data.storage_path) {
      const storageResult = await client().storage.from(data.bucket).remove([data.storage_path])
      if (storageResult.error) throw storageResult.error
    }
    const deleteResult = await client().from('galleries').delete().eq('id', photoId)
    if (deleteResult.error) throw deleteResult.error
    if (data.is_cover && data.stop_id) {
      const { data: replacement, error: replacementError } = await client()
        .from('galleries')
        .select('id')
        .eq('stop_id', data.stop_id)
        .order('position')
        .limit(1)
        .maybeSingle()
      if (replacementError) throw replacementError
      if (replacement) {
        const promoteResult = await client()
          .from('galleries')
          .update({ is_cover: true })
          .eq('id', replacement.id)
        if (promoteResult.error) throw promoteResult.error
      }
    }
  },

  async setCover(stopSlug, photoId) {
    await requireUser()
    const stop = await stopIdForSlug(stopSlug)
    const clearResult = await client()
      .from('galleries')
      .update({ is_cover: false })
      .eq('stop_id', stop.id)
    if (clearResult.error) throw clearResult.error
    const coverResult = await client()
      .from('galleries')
      .update({ is_cover: true })
      .eq('id', photoId)
      .eq('stop_id', stop.id)
    if (coverResult.error) throw coverResult.error
  }
}
