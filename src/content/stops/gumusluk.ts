import { municipalityNotes, servicePoint, stopCopy, stopPhoto } from '../helpers'
import type { StopContent } from '../types'

export const gumusluk = {
  id: 'gumusluk',
  routeId: 'izmir-to-lara',
  order: 7,
  slug: 'gumusluk',
  ...stopCopy('gumusluk'),
  coordinates: { latitude: 37.0537, longitude: 27.2338 },
  recommendedNights: 1,
  minNights: 0,
  maxNights: 2,
  drivingDistanceFromPreviousKm: 12,
  estimatedDriveTimeMinutes: 20,
  seaScore: 4,
  silenceScore: 2,
  internetScore: 5,
  safetyScore: 4,
  solarSuitability: 'excellent',
  shade: 'medium',
  crowdLevel: 'high',
  ducatoAccessibility: 'caution',
  droneSuitability: 'difficult',
  municipalityFacilities: {
    available: true,
    wc: true,
    shower: false,
    potableWater: false,
    wasteBins: true,
    notes: municipalityNotes('gumusluk')
  },
  nearbyMarket: servicePoint('gumusluk', 'market', true, 1.2),
  fuelStation: servicePoint('gumusluk', 'fuel', true, 4.5),
  waterRefill: servicePoint('gumusluk', 'water', false, 0),
  dumpStation: servicePoint('gumusluk', 'dump', false, 0),
  freecampSpotIds: [],
  paidAlternativeIds: ['gumusluk-caravan-camp'],
  photos: [
    stopPhoto(
      'gumusluk-sunset',
      'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1600&q=85',
      'gumusluk'
    )
  ],
  initialStatus: 'planned'
} satisfies StopContent
