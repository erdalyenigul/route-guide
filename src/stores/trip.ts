import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { ChecklistItemViewModel, RouteDataset, StopContent, StopViewModel } from '@/content/types'
import { routeContentService } from '@/domains/trips/services/routeContentService'
import { userStateRepository } from '@/infrastructure/persistence/userStateRepository'

const emptyDataset: RouteDataset = { routes: [], stops: [], spots: [], activities: [], checklist: [] }

export const useTripStore = defineStore('trip', () => {
  const userState = ref(userStateRepository.load())
  const dataset = ref<RouteDataset>(emptyDataset)
  const dataSource = ref<'supabase'>('supabase')
  const isLoading = ref(true)
  const loadError = ref<string | null>(null)

  const activeTrip = computed(() => dataset.value.routes.find((route) => route.status === 'active') ?? dataset.value.routes[0])

  async function initialize(): Promise<void> {
    isLoading.value = true
    loadError.value = null
    try {
      dataset.value = await routeContentService.load()
    } catch (error) {
      dataset.value = emptyDataset
      loadError.value = error instanceof Error ? error.message : 'content_load_failed'
      console.error('Supabase content could not be loaded.', error)
    } finally {
      isLoading.value = false
    }
  }

  function toStopViewModel(stop: StopContent): StopViewModel {
    return {
      ...stop,
      status: userState.value.stopStatuses[stop.id] ?? stop.initialStatus,
      favorite: userState.value.favoriteStopIds.includes(stop.id)
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
  const currentStop = computed(() => activeStops.value.find((stop) => stop.status === 'current') ?? activeStops.value[0])
  const currentStopIndex = computed(() => currentStop.value ? activeStops.value.findIndex((stop) => stop.id === currentStop.value?.id) : -1)
  const nextStop = computed(() => activeStops.value[currentStopIndex.value + 1])
  const remainingDistance = computed(() => activeStops.value.slice(Math.max(currentStopIndex.value + 1, 0)).reduce((total, stop) => total + (stop.drivingDistanceFromPreviousKm ?? 0), 0))
  const remainingNights = computed(() => activeStops.value.slice(Math.max(currentStopIndex.value, 0)).reduce((total, stop) => total + stop.recommendedNights, 0))
  const totalDistance = computed(() => activeTrip.value?.totalDistanceKm || activeStops.value.reduce((total, stop) => total + (stop.drivingDistanceFromPreviousKm ?? 0), 0))
  const completedDistance = computed(() => activeStops.value.filter(stop => stop.status === 'visited').reduce((total, stop) => total + (stop.drivingDistanceFromPreviousKm ?? 0), 0))
  const totalNights = computed(() => activeStops.value.reduce((total, stop) => total + stop.recommendedNights, 0))
  const nightsStayed = computed(() => activeStops.value.filter(stop => stop.status === 'visited').reduce((total, stop) => total + stop.recommendedNights, 0))
  const routeProgress = computed(() => activeStops.value.length ? Math.round((activeStops.value.filter(stop => stop.status === 'visited').length / activeStops.value.length) * 100) : 0)
  const favoriteStops = computed(() => dataset.value.stops.map(toStopViewModel).filter((stop) => stop.favorite))
  const checklist = computed<ChecklistItemViewModel[]>(() => dataset.value.checklist.map((item) => ({
    ...item,
    completed: userState.value.checklistCompleted[item.id] ?? item.initiallyCompleted
  })))
  const checklistProgress = computed(() => checklist.value.length
    ? Math.round((checklist.value.filter((item) => item.completed).length / checklist.value.length) * 100)
    : 0)

  function persist(): void {
    userStateRepository.save(userState.value)
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

  function toggleFavorite(stopId: string): void {
    if (!dataset.value.stops.some((stop) => stop.id === stopId)) return
    const favorites = userState.value.favoriteStopIds
    userState.value.favoriteStopIds = favorites.includes(stopId) ? favorites.filter((id) => id !== stopId) : [...favorites, stopId]
    persist()
  }

  function toggleVisited(stopId: string): void {
    const stop = dataset.value.stops.find((item) => item.id === stopId)
    if (!stop) return
    const currentStatus = userState.value.stopStatuses[stopId] ?? stop.initialStatus
    userState.value.stopStatuses[stopId] = currentStatus === 'visited' ? stop.initialStatus : 'visited'
    persist()
  }

  function toggleChecklistItem(itemId: string): void {
    const item = checklist.value.find((entry) => entry.id === itemId)
    if (!item) return
    userState.value.checklistCompleted[itemId] = !item.completed
    persist()
  }

  return { activeTrip, activeStops, currentStop, currentStopIndex, nextStop, remainingDistance, remainingNights, totalDistance, completedDistance, totalNights, nightsStayed, routeProgress, favoriteStops, checklist, checklistProgress, dataSource, isLoading, loadError, initialize, routeById, stopsForRoute, stopById, campingSpotsForStop, activitiesForStop, toggleFavorite, toggleVisited, toggleChecklistItem }
})
