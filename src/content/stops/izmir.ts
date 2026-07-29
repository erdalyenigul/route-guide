import { municipalityNotes, servicePoint, stopCopy, stopPhoto } from '../helpers'
import type { StopContent } from '../types'

export const izmir = {
  id: 'izmir',
  routeId: 'izmir-to-lara',
  order: 0,
  slug: 'izmir',
  ...stopCopy('izmir'),
  coordinates: { latitude: 38.4192, longitude: 27.1287 },
  recommendedNights: 1,
  minNights: 1,
  maxNights: 2,
  drivingDistanceFromPreviousKm: 0,
  estimatedDriveTimeMinutes: 0,
  seaScore: 3,
  silenceScore: 1,
  internetScore: 5,
  safetyScore: 4,
  solarSuitability: 'excellent',
  shade: 'medium',
  crowdLevel: 'high',
  ducatoAccessibility: 'good',
  droneSuitability: 'difficult',
  municipalityFacilities: {
    available: true,
    wc: true,
    shower: false,
    potableWater: false,
    wasteBins: true,
    notes: municipalityNotes('izmir')
  },
  nearbyMarket: servicePoint('izmir', 'market', true, 0.5),
  fuelStation: servicePoint('izmir', 'fuel', true, 1.5),
  waterRefill: servicePoint('izmir', 'water', false, 0),
  dumpStation: servicePoint('izmir', 'dump', false, 0),
  freecampSpotIds: ['izmir-sasali'],
  paidAlternativeIds: ['izmir-inciralti-camp'],
  photos: [
    stopPhoto(
      'izmir-coast',
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1600&q=85',
      'izmir'
    )
  ],
  initialStatus: 'current'
} satisfies StopContent
