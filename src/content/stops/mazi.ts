import { municipalityNotes, servicePoint, stopCopy, stopPhoto } from '../helpers'
import type { StopContent } from '../types'

export const mazi = {
  id: 'mazi',
  routeId: 'izmir-to-lara',
  order: 8,
  slug: 'mazi',
  ...stopCopy('mazi'),
  coordinates: { latitude: 37.001543, longitude: 27.728339 },
  recommendedNights: 2,
  minNights: 1,
  maxNights: 3,
  drivingDistanceFromPreviousKm: 96,
  estimatedDriveTimeMinutes: 125,
  seaScore: 5,
  silenceScore: 5,
  internetScore: 2,
  safetyScore: 3,
  solarSuitability: 'high',
  shade: 'high',
  crowdLevel: 'medium',
  ducatoAccessibility: 'caution',
  droneSuitability: 'good',
  municipalityFacilities: {
    available: false,
    wc: false,
    shower: false,
    potableWater: false,
    wasteBins: true,
    notes: municipalityNotes('mazi')
  },
  nearbyMarket: servicePoint('mazi', 'market', true, 4),
  fuelStation: servicePoint('mazi', 'fuel', true, 27),
  waterRefill: servicePoint('mazi', 'water', false, 0),
  dumpStation: servicePoint('mazi', 'dump', false, 0),
  freecampSpotIds: ['inceyali-wildcamp'],
  paidAlternativeIds: [],
  photos: [
    stopPhoto(
      'mazi-cove',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
      'mazi'
    )
  ],
  initialStatus: 'planned'
} satisfies StopContent
