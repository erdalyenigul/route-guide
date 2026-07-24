import { municipalityNotes, servicePoint, stopCopy, stopPhoto } from '../helpers'
import type { StopContent } from '../types'

export const lara = {
  id: 'lara', routeId: 'izmir-to-lara', order: 12, slug: 'lara-antalya', ...stopCopy('lara'),
  coordinates: { latitude: 36.8515, longitude: 30.8042 }, recommendedNights: 2, minNights: 1, maxNights: 3,
  drivingDistanceFromPreviousKm: 88, estimatedDriveTimeMinutes: 105, seaScore: 4, silenceScore: 1, internetScore: 5, safetyScore: 4,
  solarSuitability: 'excellent', shade: 'medium', crowdLevel: 'high', ducatoAccessibility: 'good', droneSuitability: 'difficult',
  municipalityFacilities: { available: true, wc: true, shower: true, potableWater: false, wasteBins: true, notes: municipalityNotes('lara') },
  nearbyMarket: servicePoint('lara', 'market', true, 1), fuelStation: servicePoint('lara', 'fuel', true, 2), waterRefill: servicePoint('lara', 'water', true, 12), dumpStation: servicePoint('lara', 'dump', true, 12),
  freecampSpotIds: ['lara-inland-stopover'], paidAlternativeIds: ['lara-caravan-park'],
  photos: [stopPhoto('lara-beach', 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=1600&q=85', 'lara')], initialStatus: 'planned'
} satisfies StopContent
