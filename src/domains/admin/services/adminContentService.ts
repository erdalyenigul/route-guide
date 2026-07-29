import type { AdminContentRepository } from '../repositories/adminContentRepository'
import { supabaseAdminContentRepository } from '../repositories/supabaseAdminContentRepository'
import type { SaveExperienceInput } from '../types'

const MAX_PHOTOS_PER_STOP = 10
const MAX_SOURCE_FILE_BYTES = 20 * 1024 * 1024
const MAX_IMAGE_EDGE = 2400
const INVISIBLE_INPUT_CHARACTERS = /[\u200B-\u200D\u2060\uFEFF]/g

function normalizeUsername(value: string): string {
  return value
    .normalize('NFKC')
    .replace(INVISIBLE_INPUT_CHARACTERS, '')
    .trim()
    .toLocaleLowerCase('en-US')
}

function normalizePassword(value: string): string {
  return value.normalize('NFKC').replace(INVISIBLE_INPUT_CHARACTERS, '').trim()
}

async function imageBlob(file: File): Promise<Blob> {
  if (!file.type.startsWith('image/')) throw new Error('INVALID_IMAGE_TYPE')
  if (file.size > MAX_SOURCE_FILE_BYTES) throw new Error('IMAGE_TOO_LARGE')

  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(bitmap.width * scale))
  canvas.height = Math.max(1, Math.round(bitmap.height * scale))
  const context = canvas.getContext('2d')
  if (!context) {
    bitmap.close()
    throw new Error('IMAGE_PROCESSING_FAILED')
  }
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/webp', 0.86)
  )
  if (!blob) throw new Error('IMAGE_PROCESSING_FAILED')
  return blob
}

export class AdminContentService {
  constructor(private readonly repository: AdminContentRepository) {}

  currentUser() {
    return this.repository.currentUser()
  }
  signIn(username: string, password: string) {
    return this.repository.signIn(normalizeUsername(username), normalizePassword(password))
  }
  signOut() {
    return this.repository.signOut()
  }
  getStopEditor(stopSlug: string) {
    return this.repository.getStopEditor(stopSlug)
  }

  async saveExperience(stopSlug: string, input: SaveExperienceInput): Promise<void> {
    const body = input.body.trim()
    if (body.length > 10000) throw new Error('EXPERIENCE_TOO_LONG')
    await this.repository.saveExperience(stopSlug, { ...input, body })
  }

  async uploadPhotos(
    stopSlug: string,
    files: File[],
    caption: string,
    currentCount: number
  ): Promise<void> {
    if (!files.length) return
    if (currentCount + files.length > MAX_PHOTOS_PER_STOP) throw new Error('PHOTO_LIMIT_REACHED')
    for (const file of files) {
      const prepared = await imageBlob(file)
      await this.repository.uploadPhoto(stopSlug, prepared, caption)
    }
  }

  deletePhoto(photoId: string) {
    return this.repository.deletePhoto(photoId)
  }
  setCover(stopSlug: string, photoId: string) {
    return this.repository.setCover(stopSlug, photoId)
  }
}

export const adminContentService = new AdminContentService(supabaseAdminContentRepository)
export { MAX_PHOTOS_PER_STOP }
