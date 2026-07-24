import { municipalityNotes, servicePoint, stopCopy, stopPhoto } from '../helpers'
import type { StopContent } from '../types'

export const guzelcamli = {
  id: 'guzelcamli', routeId: 'izmir-to-lara', order: 1, slug: 'guzelcamli', ...stopCopy('guzelcamli'),
  coordinates: { latitude: 37.7118, longitude: 27.2336 }, recommendedNights: 2, minNights: 1, maxNights: 3,
  drivingDistanceFromPreviousKm: 112, estimatedDriveTimeMinutes: 105, seaScore: 5, silenceScore: 4, internetScore: 4, safetyScore: 4,
  solarSuitability: 'high', shade: 'high', crowdLevel: 'high', ducatoAccessibility: 'good', droneSuitability: 'difficult',
  municipalityFacilities: { available: true, wc: true, shower: true, potableWater: false, wasteBins: true, notes: municipalityNotes('guzelcamli') },
  nearbyMarket: servicePoint('guzelcamli', 'market', true, 1), fuelStation: servicePoint('guzelcamli', 'fuel', true, 8), waterRefill: servicePoint('guzelcamli', 'water', false, 0), dumpStation: servicePoint('guzelcamli', 'dump', false, 0),
  freecampSpotIds: ['guzelcamli-outskirts'], paidAlternativeIds: ['guzelcamli-camp'],
  photos: [stopPhoto('guzelcamli-cove', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85', 'guzelcamli')], initialStatus: 'planned'
} satisfies StopContent
