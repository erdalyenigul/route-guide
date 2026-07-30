import { municipalityNotes, servicePoint, stopCopy, stopPhoto } from '../helpers'
import type { StopContent } from '../types'

export const cirali = {
  id: 'cirali',
  routeId: 'izmir-to-lara',
  order: 17,
  slug: 'cirali',
  ...stopCopy('cirali'),
  coordinates: { latitude: 36.4193, longitude: 30.4803 },
  recommendedNights: 3,
  minNights: 2,
  maxNights: 5,
  drivingDistanceFromPreviousKm: 128,
  estimatedDriveTimeMinutes: 160,
  seaScore: 5,
  silenceScore: 4,
  internetScore: 4,
  safetyScore: 5,
  solarSuitability: 'high',
  shade: 'high',
  crowdLevel: 'medium',
  ducatoAccessibility: 'good',
  droneSuitability: 'difficult',
  municipalityFacilities: {
    available: true,
    wc: true,
    shower: true,
    potableWater: false,
    wasteBins: true,
    notes: municipalityNotes('cirali')
  },
  nearbyMarket: servicePoint('cirali', 'market', true, 0.8),
  fuelStation: servicePoint('cirali', 'fuel', true, 10),
  waterRefill: servicePoint('cirali', 'water', true, 1),
  dumpStation: servicePoint('cirali', 'dump', true, 1.5),
  freecampSpotIds: ['cirali-upper-village'],
  paidAlternativeIds: ['cirali-garden-camp'],
  photos: [
    stopPhoto(
      'cirali-beach',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
      'cirali'
    )
  ],
  initialStatus: 'planned'
} satisfies StopContent
