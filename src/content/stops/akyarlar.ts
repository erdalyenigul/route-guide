import { municipalityNotes, servicePoint, stopCopy, stopPhoto } from '../helpers'
import type { StopContent } from '../types'

export const akyarlar = {
  id: 'akyarlar',
  routeId: 'izmir-to-lara',
  order: 8,
  slug: 'akyarlar',
  ...stopCopy('akyarlar'),
  coordinates: { latitude: 36.97115, longitude: 27.29979 },
  recommendedNights: 0,
  minNights: 0,
  maxNights: 1,
  drivingDistanceFromPreviousKm: 17,
  estimatedDriveTimeMinutes: 25,
  seaScore: 5,
  silenceScore: 2,
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
  nearbyMarket: servicePoint('akyarlar', 'market', true, 1),
  fuelStation: servicePoint('akyarlar', 'fuel', true, 8),
  waterRefill: servicePoint('akyarlar', 'water', false, 0),
  dumpStation: servicePoint('akyarlar', 'dump', false, 0),
  freecampSpotIds: [],
  paidAlternativeIds: [],
  photos: [
    stopPhoto(
      'akyarlar-bay',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85',
      'akyarlar'
    )
  ],
  initialStatus: 'planned',
  verificationStatus: 'verified',
  sourceNote:
    'Karaincir Public Beach and its seasonal facilities are listed by Bodrum Municipality. This stop is intentionally a zero-night swim stop; no public-beach overnight permission is inferred.',
  lastVerifiedAt: '2026-07-30T00:00:00+03:00'
} satisfies StopContent
