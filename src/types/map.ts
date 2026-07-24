import type { StopStatus } from '@/content/types'

export interface MapCoordinate {
  latitude: number
  longitude: number
}

export interface MapStop {
  id: string
  label: string
  status: StopStatus
  coordinate: MapCoordinate | null
}

export interface MapBounds {
  southWest: [longitude: number, latitude: number]
  northEast: [longitude: number, latitude: number]
}

export interface MapRouteFeature {
  type: 'Feature'
  properties: Record<string, never>
  geometry: {
    type: 'LineString'
    coordinates: [longitude: number, latitude: number][]
  }
}
