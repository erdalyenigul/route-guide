import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { ChecklistItemViewModel, RouteDataset, StopContent, StopStatus, StopViewModel } from '@/content/types'
import { emptyTripState, type TripState } from '@/domains/trips/repositories/tripStateRepository'
import { routeContentService } from '@/domains/trips/services/routeContentService'
import { tripStateService } from '@/domains/trips/services/tripStateService'

const emptyDataset: RouteDataset = { routes: [], stops: [], spots: [], activities: [], checklist: [] }

export const useTripStore = defineStore('trip', () => {
  const userState = ref<TripState>(emptyTripState())
  const dataset = ref<RouteDataset>(emptyDataset)
  const dataSource = ref<'supabase'>('supabase')
  const isLoading = ref(true)
  const loadError = ref<string | null>(null)
  const stateSyncError = ref<'auth' | 'save' | null>(null)
  let unsubscribeFromState: (() => void) | null = null

  const activeTrip = computed(() => dataset.value.routes.find((route) => route.status === 'active') ?? dataset.value.routes[0])

  async function initialize(): Promise<void> {
    isLoading.value = true
    loadError.value = null
    try {
      dataset.value = await routeContentService.load()
      const route = dataset.value.routes.find((item) => item.status === 'active') ?? dataset.value.routes[0]
      if (route) {
        userState.value = await tripStateService.load(route.id)
        unsubscribeFromState?.()
        unsubscribeFromState = await tripStateService.subscribe(route.id, () => {
          void refreshTripState(route.id)
        })
      }
      localStorage.removeItem('route-guide:user-state:v1')
    } catch (error) {
      dataset.value = emptyDataset
      loadError.value = error instanceof Error ? error.message : 'content_load_failed'
      console.error('Supabase content could not be loaded.', error)
    } finally {
      isLoading.value = false
    }
  }

  async function refreshTripState(routeId = activeTrip.value?.id): Promise<void> {
    if (!routeId) return
    try {
      userState.value = await tripStateService.load(routeId)
      stateSyncError.value = null
    } catch {
      stateSyncError.value = 'save'
    }
  }

  async function refreshContent(): Promise<void> {
    try {
      dataset.value = await routeContentService.load()
      loadError.value = null
    } catch (error) {
      loadError.value = error instanceof Error ? error.message : 'content_load_failed'
      throw error
    }
  }

  function toStopViewModel(stop: StopContent): StopViewModel {
    return {
      ...stop,
      status: userState.value.stopStatuses[stop.id] ?? stop.initialStatus,
      favorite: userState.value.favoriteStopIds.includes(stop.id),
      nightsStayed: userState.value.nightsStayedByStop[stop.id] ?? null,
      actualDistanceKm: userState.value.actualDistanceByStop[stop.id] ?? null
    }
  }

  function routeById(id: string) {
    if (id === 'active') return activeTrip.value
    return dataset.value.routes.find((route) => route.id === id)
  }

  function stopsForRoute(routeId: string): StopViewModel[] {
    const route = routeById(routeId)
    if (!route) return []
    return route.stopIds
      .map((id) => dataset.value.stops.find((stop) => stop.id === id))
      .filter((stop) => stop !== undefined)
      .map(toStopViewModel)
  }

  const activeStops = computed(() => activeTrip.value ? stopsForRoute(activeTrip.value.id) : [])
  const accommodationStops = computed(() => activeStops.value.slice(1, -1))
  const lastProgressedStopIndex = computed(() => activeStops.value.reduce(
    (latest, stop, index) => stop.status === 'visited' || stop.status === 'skipped' ? index : latest,
    -1
  ))
  const currentStop = computed(() => lastProgressedStopIndex.value >= 0
    ? activeStops.value[lastProgressedStopIndex.value]
    : (activeStops.value.find((stop) => stop.status === 'current') ?? activeStops.value[0]))
  const currentStopIndex = computed(() => currentStop.value ? activeStops.value.findIndex((stop) => stop.id === currentStop.value?.id) : -1)
  const nextStop = computed(() => activeStops.value[currentStopIndex.value + 1])
  const remainingDistance = computed(() => activeStops.value.slice(Math.max(currentStopIndex.value + 1, 0)).reduce((total, stop) => total + (stop.drivingDistanceFromPreviousKm ?? 0), 0))
  const remainingNights = computed(() => accommodationStops.value.filter(stop => stop.status !== 'visited' && stop.status !== 'skipped').reduce((total, stop) => total + stop.recommendedNights, 0))
  const totalDistance = computed(() => activeTrip.value?.totalDistanceKm || activeStops.value.reduce((total, stop) => total + (stop.drivingDistanceFromPreviousKm ?? 0), 0))
  const completedDistance = computed(() => activeStops.value.filter(stop => stop.status === 'visited').reduce((total, stop) => total + (stop.actualDistanceKm ?? stop.drivingDistanceFromPreviousKm ?? 0), 0))
  const totalNights = computed(() => accommodationStops.value.reduce((total, stop) => total + stop.recommendedNights, 0))
  const nightsStayed = computed(() => accommodationStops.value.filter(stop => stop.status === 'visited').reduce((total, stop) => total + (stop.nightsStayed ?? 0), 0))
  const routeProgress = computed(() => activeStops.value.length ? Math.round((activeStops.value.filter(stop => stop.status === 'visited' || stop.status === 'skipped').length / activeStops.value.length) * 100) : 0)
  const favoriteStops = computed(() => dataset.value.stops.map(toStopViewModel).filter((stop) => stop.favorite))
  const checklist = computed<ChecklistItemViewModel[]>(() => dataset.value.checklist.map((item) => ({
    ...item,
    completed: userState.value.checklistCompleted[item.id] ?? item.initiallyCompleted
  })))
  const checklistProgress = computed(() => checklist.value.length
    ? Math.round((checklist.value.filter((item) => item.completed).length / checklist.value.length) * 100)
    : 0)

  function syncFailure(error: unknown): void {
    stateSyncError.value = error instanceof Error && error.message === 'AUTH_REQUIRED' ? 'auth' : 'save'
  }

  function clearStateSyncError(): void {
    stateSyncError.value = null
  }

  function stopById(id: string): StopViewModel | undefined {
    const stop = dataset.value.stops.find((item) => item.id === id)
    return stop ? toStopViewModel(stop) : undefined
  }

  function campingSpotsForStop(stopId: string) {
    const stop = dataset.value.stops.find((item) => item.id === stopId)
    if (!stop) return []
    const ids = [...stop.freecampSpotIds, ...stop.paidAlternativeIds]
    return ids.map((id) => dataset.value.spots.find((spot) => spot.id === id)).filter((spot) => spot !== undefined)
  }

  function activitiesForStop(stopId: string) {
    return dataset.value.activities.filter((activity) => activity.stopId === stopId)
  }

  async function toggleFavorite(stopId: string): Promise<void> {
    if (!dataset.value.stops.some((stop) => stop.id === stopId)) return
    const routeId = activeTrip.value?.id
    if (!routeId) return
    const favorites = userState.value.favoriteStopIds
    const favorite = !favorites.includes(stopId)
    userState.value.favoriteStopIds = favorite ? [...favorites, stopId] : favorites.filter((id) => id !== stopId)
    stateSyncError.value = null
    try {
      await tripStateService.setFavorite(routeId, stopId, favorite)
    } catch (error) {
      userState.value.favoriteStopIds = favorites
      syncFailure(error)
    }
  }

  async function setStopStatus(stopId: string, nextStatus: StopStatus, nightsStayed: number | null, actualDistanceKm: number | null): Promise<void> {
    const stop = dataset.value.stops.find((item) => item.id === stopId)
    if (!stop) return
    const routeId = activeTrip.value?.id
    if (!routeId) return
    const routeStops = stopsForRoute(routeId)
    const stopIndex = routeStops.findIndex(item => item.id === stopId)
    const followingStop = stopIndex >= 0 ? routeStops[stopIndex + 1] : undefined
    const currentStatus = userState.value.stopStatuses[stopId] ?? stop.initialStatus
    const currentNightsStayed = userState.value.nightsStayedByStop[stopId]
    const currentActualDistance = userState.value.actualDistanceByStop[stopId]
    const followingStatus = followingStop
      ? (userState.value.stopStatuses[followingStop.id] ?? followingStop.initialStatus)
      : undefined
    const isCompleted = nextStatus === 'visited'
    const advancesRoute = nextStatus === 'visited' || nextStatus === 'skipped'
    const staleCurrentStops = advancesRoute
      ? routeStops.filter(item => item.id !== stopId && item.id !== followingStop?.id && item.status === 'current')
      : []
    const nextNightsStayed = isCompleted && nightsStayed !== null ? Math.max(0, Math.trunc(nightsStayed)) : null
    const nextActualDistance = isCompleted && actualDistanceKm !== null ? Math.max(0, Math.trunc(actualDistanceKm)) : null
    const shouldPromoteFollowingStop = Boolean(advancesRoute && followingStop && followingStatus !== 'visited' && followingStatus !== 'skipped')
    const shouldRestoreFollowingStop = Boolean(!advancesRoute && followingStop && followingStatus === 'current')
    userState.value.stopStatuses[stopId] = nextStatus
    if (followingStop && shouldPromoteFollowingStop) userState.value.stopStatuses[followingStop.id] = 'current'
    if (followingStop && shouldRestoreFollowingStop) userState.value.stopStatuses[followingStop.id] = followingStop.initialStatus
    for (const staleStop of staleCurrentStops) userState.value.stopStatuses[staleStop.id] = 'planned'
    if (nextNightsStayed === null) delete userState.value.nightsStayedByStop[stopId]
    else userState.value.nightsStayedByStop[stopId] = nextNightsStayed
    if (nextActualDistance === null) delete userState.value.actualDistanceByStop[stopId]
    else userState.value.actualDistanceByStop[stopId] = nextActualDistance
    stateSyncError.value = null
    try {
      const writes = [
        tripStateService.setStopProgress(routeId, stopId, nextStatus, nextNightsStayed, nextActualDistance)
      ]
      if (followingStop && (shouldPromoteFollowingStop || shouldRestoreFollowingStop)) {
        writes.push(tripStateService.setStopProgress(
          routeId,
          followingStop.id,
          shouldPromoteFollowingStop ? 'current' : followingStop.initialStatus,
          userState.value.nightsStayedByStop[followingStop.id] ?? null,
          userState.value.actualDistanceByStop[followingStop.id] ?? null
        ))
      }
      for (const staleStop of staleCurrentStops) {
        writes.push(tripStateService.setStopProgress(
          routeId,
          staleStop.id,
          'planned',
          userState.value.nightsStayedByStop[staleStop.id] ?? null,
          userState.value.actualDistanceByStop[staleStop.id] ?? null
        ))
      }
      await Promise.all(writes)
    } catch (error) {
      userState.value.stopStatuses[stopId] = currentStatus
      if (followingStop && followingStatus) userState.value.stopStatuses[followingStop.id] = followingStatus
      for (const staleStop of staleCurrentStops) userState.value.stopStatuses[staleStop.id] = 'current'
      if (currentNightsStayed === undefined) delete userState.value.nightsStayedByStop[stopId]
      else userState.value.nightsStayedByStop[stopId] = currentNightsStayed
      if (currentActualDistance === undefined) delete userState.value.actualDistanceByStop[stopId]
      else userState.value.actualDistanceByStop[stopId] = currentActualDistance
      syncFailure(error)
    }
  }

  function setStopCompletion(stopId: string, completed: boolean, nightsStayed: number | null, actualDistanceKm: number | null): Promise<void> {
    const stop = dataset.value.stops.find(item => item.id === stopId)
    return setStopStatus(stopId, completed ? 'visited' : (stop?.initialStatus ?? 'planned'), nightsStayed, actualDistanceKm)
  }

  function skipStop(stopId: string): Promise<void> {
    return setStopStatus(stopId, 'skipped', null, null)
  }

  async function toggleChecklistItem(itemId: string): Promise<void> {
    const item = checklist.value.find((entry) => entry.id === itemId)
    if (!item) return
    const routeId = activeTrip.value?.id
    if (!routeId) return
    const completed = !item.completed
    userState.value.checklistCompleted[itemId] = completed
    stateSyncError.value = null
    try {
      await tripStateService.setChecklistItem(routeId, itemId, completed)
    } catch (error) {
      userState.value.checklistCompleted[itemId] = item.completed
      syncFailure(error)
    }
  }

  return { activeTrip, activeStops, currentStop, currentStopIndex, nextStop, remainingDistance, remainingNights, totalDistance, completedDistance, totalNights, nightsStayed, routeProgress, favoriteStops, checklist, checklistProgress, dataSource, isLoading, loadError, stateSyncError, initialize, refreshContent, refreshTripState, clearStateSyncError, routeById, stopsForRoute, stopById, campingSpotsForStop, activitiesForStop, toggleFavorite, setStopCompletion, skipStop, toggleChecklistItem }
})
