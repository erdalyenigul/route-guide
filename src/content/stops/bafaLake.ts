import { municipalityNotes, servicePoint, stopCopy, stopPhoto } from '../helpers'
import type { StopContent } from '../types'

export const bafaLake = {
  id: 'bafa-lake',
  routeId: 'izmir-to-lara',
  order: 2,
  slug: 'bafa-lake',
  ...stopCopy('bafaLake'),
  coordinates: { latitude: 37.5009, longitude: 27.5254 },
  recommendedNights: 2,
  minNights: 1,
  maxNights: 3,
  drivingDistanceFromPreviousKm: 78,
  estimatedDriveTimeMinutes: 80,
  seaScore: 2,
  silenceScore: 5,
  internetScore: 3,
  safetyScore: 4,
  solarSuitability: 'excellent',
  shade: 'low',
  crowdLevel: 'low',
  ducatoAccessibility: 'caution',
  droneSuitability: 'caution',
  municipalityFacilities: {
    available: false,
    wc: false,
    shower: false,
    potableWater: false,
    wasteBins: true,
    notes: municipalityNotes('bafaLake')
  },
  nearbyMarket: servicePoint('bafaLake', 'market', true, 1),
  fuelStation: servicePoint('bafaLake', 'fuel', true, 16),
  waterRefill: servicePoint('bafaLake', 'water', false, 0),
  dumpStation: servicePoint('bafaLake', 'dump', false, 0),
  freecampSpotIds: ['bafa-kapikiri-edge'],
  paidAlternativeIds: ['bafa-lakeside-pension-camp'],
  photos: [
    stopPhoto(
      'bafa-lake',
      'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=1600&q=85',
      'bafaLake'
    )
  ],
  initialStatus: 'planned'
} satisfies StopContent
