import { municipalityNotes, servicePoint, stopCopy, stopPhoto } from '../helpers'
import type { StopContent } from '../types'

export const dalyan = {
  id: 'dalyan', routeId: 'izmir-to-lara', order: 7, slug: 'dalyan', ...stopCopy('dalyan'),
  coordinates: { latitude: 36.8342, longitude: 28.6427 }, recommendedNights: 3, minNights: 2, maxNights: 4,
  drivingDistanceFromPreviousKm: 98, estimatedDriveTimeMinutes: 120, seaScore: 4, silenceScore: 3, internetScore: 5, safetyScore: 4,
  solarSuitability: 'excellent', shade: 'medium', crowdLevel: 'high', ducatoAccessibility: 'good', droneSuitability: 'difficult',
  municipalityFacilities: { available: true, wc: true, shower: false, potableWater: false, wasteBins: true, notes: municipalityNotes('dalyan') },
  nearbyMarket: servicePoint('dalyan', 'market', true, 0.8), fuelStation: servicePoint('dalyan', 'fuel', true, 2.5), waterRefill: servicePoint('dalyan', 'water', true, 2), dumpStation: servicePoint('dalyan', 'dump', true, 2),
  freecampSpotIds: ['dalyan-rural-orchard-edge'], paidAlternativeIds: ['dalyan-camping'],
  photos: [stopPhoto('dalyan-river', 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1600&q=85', 'dalyan')], initialStatus: 'planned'
} satisfies StopContent
