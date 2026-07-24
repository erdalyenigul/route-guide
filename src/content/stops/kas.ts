import { municipalityNotes, servicePoint, stopCopy, stopPhoto } from '../helpers'
import type { StopContent } from '../types'

export const kas = {
  id: 'kas', routeId: 'izmir-to-lara', order: 10, slug: 'kas', ...stopCopy('kas'),
  coordinates: { latitude: 36.2018, longitude: 29.6377 }, recommendedNights: 3, minNights: 2, maxNights: 4,
  drivingDistanceFromPreviousKm: 125, estimatedDriveTimeMinutes: 155, seaScore: 5, silenceScore: 2, internetScore: 5, safetyScore: 4,
  solarSuitability: 'excellent', shade: 'low', crowdLevel: 'high', ducatoAccessibility: 'caution', droneSuitability: 'difficult',
  municipalityFacilities: { available: true, wc: true, shower: true, potableWater: false, wasteBins: true, notes: municipalityNotes('kas') },
  nearbyMarket: servicePoint('kas', 'market', true, 1), fuelStation: servicePoint('kas', 'fuel', true, 3.5), waterRefill: servicePoint('kas', 'water', true, 4), dumpStation: servicePoint('kas', 'dump', true, 4),
  freecampSpotIds: ['kas-inland-plateau'], paidAlternativeIds: ['kas-peninsula-camp'],
  photos: [stopPhoto('kas-harbour', 'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1600&q=85', 'kas')], initialStatus: 'planned'
} satisfies StopContent
