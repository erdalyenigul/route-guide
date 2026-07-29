import type { RealtimeChannel, User } from '@supabase/supabase-js'

import type { StopStatus } from '@/content/types'
import { supabase } from '@/infrastructure/supabase/client'

import { emptyTripState, type TripStateRepository } from './tripStateRepository'

interface ResolvedRoute {
  routeId: string
  stopIdBySlug: Map<string, string>
  stopSlugById: Map<string, string>
}

const routeCache = new Map<string, ResolvedRoute>()

function client() {
  if (!supabase) throw new Error('SUPABASE_UNAVAILABLE')
  return supabase
}

async function currentUser(): Promise<User> {
  const { data, error } = await client().auth.getUser()
  if (error || !data.user) throw new Error('AUTH_REQUIRED')
  return data.user
}

async function resolveRoute(routeSlug: string): Promise<ResolvedRoute> {
  const cached = routeCache.get(routeSlug)
  if (cached) return cached

  const { data: route, error: routeError } = await client()
    .from('routes')
    .select('id')
    .eq('slug', routeSlug)
    .single()
  if (routeError) throw routeError

  const { data: routeStops, error: routeStopsError } = await client()
    .from('route_stops')
    .select('stop_id')
    .eq('route_id', route.id)
  if (routeStopsError) throw routeStopsError
  const stopIds = (routeStops ?? []).map((item) => item.stop_id)

  const { data: stops, error: stopsError } = await client()
    .from('stops')
    .select('id,slug')
    .in('id', stopIds)
  if (stopsError) throw stopsError

  const resolved = {
    routeId: route.id,
    stopIdBySlug: new Map((stops ?? []).map((stop) => [stop.slug, stop.id])),
    stopSlugById: new Map((stops ?? []).map((stop) => [stop.id, stop.slug]))
  }
  routeCache.set(routeSlug, resolved)
  return resolved
}

function stopId(resolved: ResolvedRoute, stopSlug: string): string {
  const id = resolved.stopIdBySlug.get(stopSlug)
  if (!id) throw new Error('STOP_NOT_FOUND')
  return id
}

async function verifyWrite(result: { error: Error | null }): Promise<void> {
  if (result.error) throw result.error
}

export const supabaseTripStateRepository: TripStateRepository = {
  async getState(routeSlug) {
    const resolved = await resolveRoute(routeSlug)
    const [stopResult, checklistResult] = await Promise.all([
      client()
        .from('trip_stop_states')
        .select('stop_id,status,is_favorite,nights_stayed,actual_distance_km')
        .eq('route_id', resolved.routeId),
      client()
        .from('trip_checklist_states')
        .select('item_id,completed')
        .eq('route_id', resolved.routeId)
    ])
    if (stopResult.error) throw stopResult.error
    if (checklistResult.error) throw checklistResult.error

    const state = emptyTripState()
    for (const row of stopResult.data ?? []) {
      const slug = resolved.stopSlugById.get(row.stop_id)
      if (!slug) continue
      state.stopStatuses[slug] = row.status as StopStatus
      if (row.nights_stayed !== null) state.nightsStayedByStop[slug] = row.nights_stayed
      if (row.actual_distance_km !== null) state.actualDistanceByStop[slug] = row.actual_distance_km
      if (row.is_favorite) state.favoriteStopIds.push(slug)
    }
    for (const row of checklistResult.data ?? [])
      state.checklistCompleted[row.item_id] = row.completed
    return state
  },

  async setFavorite(routeSlug, stopSlug, favorite) {
    const [resolved, user] = await Promise.all([resolveRoute(routeSlug), currentUser()])
    await verifyWrite(
      await client()
        .from('trip_stop_states')
        .update({
          is_favorite: favorite,
          updated_by: user.id
        })
        .eq('route_id', resolved.routeId)
        .eq('stop_id', stopId(resolved, stopSlug))
    )
  },

  async setStopProgress(routeSlug, stopSlug, status, nightsStayed, actualDistanceKm) {
    const [resolved, user] = await Promise.all([resolveRoute(routeSlug), currentUser()])
    await verifyWrite(
      await client()
        .from('trip_stop_states')
        .update({
          status,
          nights_stayed: nightsStayed,
          actual_distance_km: actualDistanceKm,
          updated_by: user.id
        })
        .eq('route_id', resolved.routeId)
        .eq('stop_id', stopId(resolved, stopSlug))
    )
  },

  async setChecklistItem(routeSlug, itemId, completed) {
    const [resolved, user] = await Promise.all([resolveRoute(routeSlug), currentUser()])
    await verifyWrite(
      await client().from('trip_checklist_states').upsert(
        {
          route_id: resolved.routeId,
          item_id: itemId,
          completed,
          updated_by: user.id
        },
        { onConflict: 'route_id,item_id' }
      )
    )
  },

  async subscribe(routeSlug, onChange) {
    const resolved = await resolveRoute(routeSlug)
    const channel: RealtimeChannel = client()
      .channel(`trip-state:${resolved.routeId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trip_stop_states',
          filter: `route_id=eq.${resolved.routeId}`
        },
        onChange
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trip_checklist_states',
          filter: `route_id=eq.${resolved.routeId}`
        },
        onChange
      )
      .subscribe()

    return () => {
      void client().removeChannel(channel)
    }
  }
}
