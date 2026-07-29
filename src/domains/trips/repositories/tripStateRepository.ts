import type { StopStatus } from '@/content/types'

export interface TripState {
  favoriteStopIds: string[]
  stopStatuses: Record<string, StopStatus>
  nightsStayedByStop: Record<string, number>
  actualDistanceByStop: Record<string, number>
  checklistCompleted: Record<string, boolean>
}

export interface TripStateRepository {
  getState(routeSlug: string): Promise<TripState>
  setFavorite(routeSlug: string, stopSlug: string, favorite: boolean): Promise<void>
  setStopProgress(
    routeSlug: string,
    stopSlug: string,
    status: StopStatus,
    nightsStayed: number | null,
    actualDistanceKm: number | null
  ): Promise<void>
  setChecklistItem(routeSlug: string, itemId: string, completed: boolean): Promise<void>
  subscribe(routeSlug: string, onChange: () => void): Promise<() => void>
}

export function emptyTripState(): TripState {
  return {
    favoriteStopIds: [],
    stopStatuses: {},
    nightsStayedByStop: {},
    actualDistanceByStop: {},
    checklistCompleted: {}
  }
}
