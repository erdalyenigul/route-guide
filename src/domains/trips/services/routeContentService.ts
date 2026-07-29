import type { RouteDataset } from '@/content/types'
import type { RouteContentRepository } from '@/domains/trips/repositories/routeContentRepository'
import { applyResearchedContentOverlay } from '@/domains/trips/repositories/researchedContentOverlay'
import { supabaseRouteContentRepository } from '@/domains/trips/repositories/supabaseRouteContentRepository'

function withTimeout<T>(promise: Promise<T>, milliseconds: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_resolve, reject) =>
      window.setTimeout(() => reject(new Error('Supabase request timed out')), milliseconds)
    )
  ])
}

export class RouteContentService {
  constructor(private readonly repository: RouteContentRepository) {}

  async load(): Promise<RouteDataset> {
    const dataset = await withTimeout(this.repository.getDataset(), 8000)
    return applyResearchedContentOverlay(dataset)
  }
}

export const routeContentService = new RouteContentService(supabaseRouteContentRepository)
