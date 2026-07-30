import { municipalityNotes, servicePoint, stopCopy, stopPhoto } from '../helpers'
import type { StopContent } from '../types'

export const akbuk = {
  id: 'akbuk',
  routeId: 'izmir-to-lara',
  order: 10,
  slug: 'akbuk-bay-gokova',
  ...stopCopy('akbuk'),
  coordinates: { latitude: 37.0318, longitude: 28.1017 },
  recommendedNights: 2,
  minNights: 1,
  maxNights: 3,
  drivingDistanceFromPreviousKm: 44,
  estimatedDriveTimeMinutes: 60,
  seaScore: 5,
  silenceScore: 4,
  internetScore: 3,
  safetyScore: 4,
  solarSuitability: 'excellent',
  shade: 'medium',
  crowdLevel: 'high',
  ducatoAccessibility: 'caution',
  droneSuitability: 'caution',
  municipalityFacilities: {
    available: true,
    wc: true,
    shower: true,
    potableWater: false,
    wasteBins: true,
    notes: municipalityNotes('akbuk')
  },
  nearbyMarket: servicePoint('akbuk', 'market', true, 1),
  fuelStation: servicePoint('akbuk', 'fuel', true, 24),
  waterRefill: servicePoint('akbuk', 'water', false, 0),
  dumpStation: servicePoint('akbuk', 'dump', false, 0),
  freecampSpotIds: ['akbuk-gokova-upper-bay'],
  paidAlternativeIds: ['akbuk-gokova-camp'],
  photos: [
    stopPhoto(
      'akbuk-gokova',
      'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=1600&q=85',
      'akbuk'
    )
  ],
  initialStatus: 'planned'
} satisfies StopContent
