import { municipalityNotes, servicePoint, stopCopy, stopPhoto } from '../helpers'
import type { StopContent } from '../types'

export const faralya = {
  id: 'faralya',
  routeId: 'izmir-to-lara',
  order: 15,
  slug: 'faralya',
  ...stopCopy('faralya'),
  coordinates: { latitude: 36.4934, longitude: 29.1272 },
  recommendedNights: 2,
  minNights: 1,
  maxNights: 3,
  drivingDistanceFromPreviousKm: 47,
  estimatedDriveTimeMinutes: 80,
  seaScore: 4,
  silenceScore: 5,
  internetScore: 3,
  safetyScore: 3,
  solarSuitability: 'high',
  shade: 'medium',
  crowdLevel: 'medium',
  ducatoAccessibility: 'difficult',
  droneSuitability: 'caution',
  municipalityFacilities: {
    available: false,
    wc: false,
    shower: false,
    potableWater: false,
    wasteBins: true,
    notes: municipalityNotes('faralya')
  },
  nearbyMarket: servicePoint('faralya', 'market', true, 1.5),
  fuelStation: servicePoint('faralya', 'fuel', true, 18),
  waterRefill: servicePoint('faralya', 'water', true, 1.5),
  dumpStation: servicePoint('faralya', 'dump', false, 0),
  freecampSpotIds: ['faralya-upper-road'],
  paidAlternativeIds: ['faralya-terrace-camp'],
  photos: [
    stopPhoto(
      'faralya-cliffs',
      'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1600&q=85',
      'faralya'
    )
  ],
  initialStatus: 'planned'
} satisfies StopContent
