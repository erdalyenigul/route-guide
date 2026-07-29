import { departureChecklist, routes, spots, stops } from './index'

function uniqueMap<T extends { id: string }>(
  entries: readonly T[],
  label: string
): ReadonlyMap<string, T> {
  const result = new Map<string, T>()
  for (const entry of entries) {
    if (result.has(entry.id)) throw new Error(`Duplicate ${label} content id: ${entry.id}`)
    result.set(entry.id, entry)
  }
  return result
}

const routeById = uniqueMap(routes, 'route')
const stopById = uniqueMap(stops, 'stop')
const spotById = uniqueMap(spots, 'spot')

for (const route of routes) {
  for (const stopId of route.stopIds) {
    const stop = stopById.get(stopId)
    if (!stop) throw new Error(`Route ${route.id} references missing stop: ${stopId}`)
    if (stop.routeId !== route.id) throw new Error(`Stop ${stop.id} belongs to a different route`)
  }
}

for (const stop of stops) {
  if (!routeById.has(stop.routeId))
    throw new Error(`Stop ${stop.id} references missing route: ${stop.routeId}`)
  for (const spotId of [...stop.freecampSpotIds, ...stop.paidAlternativeIds]) {
    const spot = spotById.get(spotId)
    if (!spot) throw new Error(`Stop ${stop.id} references missing spot: ${spotId}`)
    if (spot.stopId !== stop.id) throw new Error(`Spot ${spot.id} belongs to a different stop`)
  }
}

export const contentCatalog = {
  routes,
  stops,
  spots,
  checklist: departureChecklist,
  routeById,
  stopById,
  spotById
} as const
