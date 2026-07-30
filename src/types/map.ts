import type { StopStatus } from '@/content/types'

export interface MapCoordinate {
  latitude: number
  longitude: number
}

export interface MapStop {
  id: string
  order: number
  label: string
  status: StopStatus
  coordinate: MapCoordinate | null
}

export interface MapBounds {
  southWest: [longitude: number, latitude: number]
  northEast: [longitude: number, latitude: number]
}

export interface MapRouteFeature {
  type: 'FeatureCollection'
  features: Array<{
    type: 'Feature'
    properties: { completed: boolean }
    geometry: {
      type: 'LineString'
      coordinates: [longitude: number, latitude: number][]
    }
  }>
}
