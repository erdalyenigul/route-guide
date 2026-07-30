import { municipalityNotes, servicePoint, stopCopy, stopPhoto } from '../helpers'
import type { StopContent } from '../types'

export const karaotBeach = {
  id: 'karaot-beach',
  routeId: 'izmir-to-lara',
  order: 12,
  slug: 'karaot-beach',
  ...stopCopy('karaotBeach'),
  coordinates: { latitude: 36.6997, longitude: 29.0358 },
  recommendedNights: 1,
  minNights: 1,
  maxNights: 2,
  drivingDistanceFromPreviousKm: 58,
  estimatedDriveTimeMinutes: 70,
  seaScore: 4,
  silenceScore: 4,
  internetScore: 3,
  safetyScore: 4,
  solarSuitability: 'excellent',
  shade: 'low',
  crowdLevel: 'medium',
  ducatoAccessibility: 'good',
  droneSuitability: 'difficult',
  municipalityFacilities: {
    available: true,
    wc: true,
    shower: true,
    potableWater: false,
    wasteBins: true,
    notes: municipalityNotes('karaotBeach')
  },
  nearbyMarket: servicePoint('karaotBeach', 'market', true, 4),
  fuelStation: servicePoint('karaotBeach', 'fuel', true, 9),
  waterRefill: servicePoint('karaotBeach', 'water', false, 0),
  dumpStation: servicePoint('karaotBeach', 'dump', false, 0),
  freecampSpotIds: ['karaot-designated-edge'],
  paidAlternativeIds: ['karaot-eco-camp'],
  photos: [
    stopPhoto(
      'karaot-beach',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85',
      'karaotBeach'
    )
  ],
  initialStatus: 'planned'
} satisfies StopContent
