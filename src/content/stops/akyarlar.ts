import { municipalityNotes, servicePoint, stopCopy, stopPhoto } from '../helpers'
import type { StopContent } from '../types'

export const akyarlar = {
  id: 'akyarlar',
  routeId: 'izmir-to-lara',
  order: 4,
  slug: 'akyarlar',
  ...stopCopy('akyarlar'),
  coordinates: { latitude: 36.9729, longitude: 27.2986 },
  recommendedNights: 2,
  minNights: 1,
  maxNights: 3,
  drivingDistanceFromPreviousKm: 27,
  estimatedDriveTimeMinutes: 40,
  seaScore: 5,
  silenceScore: 3,
  internetScore: 4,
  safetyScore: 4,
  solarSuitability: 'excellent',
  shade: 'low',
  crowdLevel: 'high',
  ducatoAccessibility: 'good',
  droneSuitability: 'caution',
  municipalityFacilities: {
    available: true,
    wc: true,
    shower: true,
    potableWater: false,
    wasteBins: true,
    notes: municipalityNotes('akyarlar')
  },
  nearbyMarket: servicePoint('akyarlar', 'market', true, 0.8),
  fuelStation: servicePoint('akyarlar', 'fuel', true, 9),
  waterRefill: servicePoint('akyarlar', 'water', false, 0),
  dumpStation: servicePoint('akyarlar', 'dump', false, 0),
  freecampSpotIds: ['akyarlar-inland-layby'],
  paidAlternativeIds: ['akyarlar-coastal-camp'],
  photos: [
    stopPhoto(
      'akyarlar-bay',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85',
      'akyarlar'
    )
  ],
  initialStatus: 'planned'
} satisfies StopContent
