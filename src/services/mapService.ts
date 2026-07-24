import type { StyleSpecification } from 'maplibre-gl'
import type { Coordinates } from '@/content/types'
import type { MapBounds, MapCoordinate, MapRouteFeature, MapStop } from '@/types/map'

const darkRasterStyle: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', 'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }
  },
  layers: [{ id: 'osm-dark', type: 'raster', source: 'osm', minzoom: 0, maxzoom: 20 }]
}

function isFiniteCoordinate(latitude: number | null, longitude: number | null): latitude is number {
  return latitude !== null && longitude !== null && Number.isFinite(latitude) && Number.isFinite(longitude) && latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180
}

export const mapService = {
  style(): StyleSpecification {
    return darkRasterStyle
  },

  coordinate(value: Coordinates): MapCoordinate | null {
    if (!isFiniteCoordinate(value.latitude, value.longitude)) return null
    return { latitude: value.latitude, longitude: value.longitude as number }
  },

  validStops(stops: MapStop[]): MapStop[] {
    return stops.filter((stop) => stop.coordinate !== null)
  },

  routeFeature(stops: MapStop[]): MapRouteFeature | null {
    const coordinates = this.validStops(stops).map((stop) => [stop.coordinate!.longitude, stop.coordinate!.latitude] satisfies [number, number])
    return coordinates.length >= 2 ? { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates } } : null
  },

  bounds(stops: MapStop[]): MapBounds | null {
    const coordinates = this.validStops(stops).map((stop) => stop.coordinate!)
    if (!coordinates.length) return null
    return {
      southWest: [Math.min(...coordinates.map(item => item.longitude)), Math.min(...coordinates.map(item => item.latitude))],
      northEast: [Math.max(...coordinates.map(item => item.longitude)), Math.max(...coordinates.map(item => item.latitude))]
    }
  },

  externalNavigationUrl(coordinate: MapCoordinate | null): string | undefined {
    if (!coordinate) return undefined
    const parameters = new URLSearchParams({
      api: '1',
      destination: `${coordinate.latitude},${coordinate.longitude}`,
      travelmode: 'driving'
    })
    return `https://www.google.com/maps/dir/?${parameters.toString()}`
  },

  externalRouteUrl(coordinates: Array<MapCoordinate | null | undefined>): string | undefined {
    const validCoordinates = coordinates.filter((coordinate): coordinate is MapCoordinate => coordinate !== null && coordinate !== undefined)
    if (!validCoordinates.length) return undefined
    if (validCoordinates.length === 1) return this.externalNavigationUrl(validCoordinates[0]!)

    const origin = validCoordinates[0]!
    const destination = validCoordinates[validCoordinates.length - 1]!
    const remaining = validCoordinates.slice(1)
    const waypoints = remaining.slice(0, -1)
    const parameters = new URLSearchParams({
      api: '1',
      origin: `${origin.latitude},${origin.longitude}`,
      destination: `${destination.latitude},${destination.longitude}`,
      travelmode: 'driving'
    })
    if (waypoints.length) {
      parameters.set('waypoints', waypoints.map((coordinate) => `${coordinate.latitude},${coordinate.longitude}`).join('|'))
    }
    return `https://www.google.com/maps/dir/?${parameters.toString()}`
  }
}
