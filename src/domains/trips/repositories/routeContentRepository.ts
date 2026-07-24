import type { RouteDataset } from '@/content/types'

export interface RouteContentRepository {
  getDataset(): Promise<RouteDataset>
}
