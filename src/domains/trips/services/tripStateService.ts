import type { StopStatus } from '@/content/types'

import { supabaseTripStateRepository } from '../repositories/supabaseTripStateRepository'
import type { TripStateRepository } from '../repositories/tripStateRepository'

export class TripStateService {
  constructor(private readonly repository: TripStateRepository) {}

  load(routeSlug: string) {
    return this.repository.getState(routeSlug)
  }

  setFavorite(routeSlug: string, stopSlug: string, favorite: boolean) {
    return this.repository.setFavorite(routeSlug, stopSlug, favorite)
  }

  setStopStatus(routeSlug: string, stopSlug: string, status: StopStatus) {
    return this.repository.setStopStatus(routeSlug, stopSlug, status)
  }

  setChecklistItem(routeSlug: string, itemId: string, completed: boolean) {
    return this.repository.setChecklistItem(routeSlug, itemId, completed)
  }

  subscribe(routeSlug: string, onChange: () => void) {
    return this.repository.subscribe(routeSlug, onChange)
  }
}

export const tripStateService = new TripStateService(supabaseTripStateRepository)
