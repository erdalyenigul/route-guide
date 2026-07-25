export type RouteStatus = 'planning' | 'active' | 'completed'
export type StopStatus = 'planned' | 'current' | 'visited' | 'skipped'
export type CampingType = 'freecamp' | 'municipality' | 'paid'
export type Level = 'none' | 'low' | 'medium' | 'high' | 'excellent'
export type Accessibility = 'difficult' | 'caution' | 'good' | 'excellent'
export type ContentTranslationKey = `content.${string}`
export type VerificationStatus = 'unverified' | 'partially_verified' | 'verified'

export interface Coordinates {
  latitude: number | null
  longitude: number | null
}

export interface PhotoAsset {
  id: string
  url: string
  alt: ContentTranslationKey
  caption?: string | null
  isCover?: boolean
  sourceType?: 'guide' | 'placeholder' | 'trip'
  storagePath?: string | null
  bucket?: 'covers' | 'gallery'
}

export interface StopExperience {
  body: string
  isPublished: boolean
  authorName: string | null
  updatedAt: string
}

export interface ServicePoint {
  available: boolean
  name: ContentTranslationKey
  distanceKm: number
  notes: ContentTranslationKey
}

export interface MunicipalityFacilities {
  available: boolean
  wc: boolean
  shower: boolean
  potableWater: boolean
  wasteBins: boolean
  notes: ContentTranslationKey
}

export interface LunaUltraRecommendation {
  subject: ContentTranslationKey
  lens: ContentTranslationKey
  timing: ContentTranslationKey
  settings: ContentTranslationKey
  fieldNote: ContentTranslationKey
}

export interface SpotContent {
  id: string
  stopId: string
  title: ContentTranslationKey
  type: CampingType
  coordinates: Coordinates
  overview: ContentTranslationKey
  priceNote: ContentTranslationKey
  rating: number
  recommended: boolean
  facilities: ContentTranslationKey[]
  accessNote: ContentTranslationKey
}

export interface StopContent {
  id: string
  routeId: string
  order: number
  title: ContentTranslationKey
  slug: string
  region: ContentTranslationKey
  coordinates: Coordinates
  overview: ContentTranslationKey
  whyVisit: ContentTranslationKey
  recommendedNights: number
  minNights: number
  maxNights: number
  drivingDistanceFromPreviousKm: number | null
  estimatedDriveTimeMinutes: number | null
  seaScore: number | null
  silenceScore: number | null
  internetScore: number | null
  safetyScore: number | null
  solarSuitability: Level | null
  shade: Level | null
  crowdLevel: Level | null
  ducatoAccessibility: Accessibility | null
  droneSuitability: Accessibility | null
  lunaUltraRecommendations: LunaUltraRecommendation[]
  municipalityFacilities: MunicipalityFacilities
  nearbyMarket: ServicePoint
  fuelStation: ServicePoint
  waterRefill: ServicePoint
  dumpStation: ServicePoint
  freecampSpotIds: string[]
  paidAlternativeIds: string[]
  roadWarnings: ContentTranslationKey[]
  bestSunrise: ContentTranslationKey
  bestSunset: ContentTranslationKey
  photos: PhotoAsset[]
  experience?: StopExperience
  initialStatus: StopStatus
  verificationStatus?: VerificationStatus
  sourceNote?: string | null
  lastVerifiedAt?: string | null
}

export interface RouteContent {
  id: string
  title: ContentTranslationKey
  description: ContentTranslationKey
  startDate: string
  endDate: string
  status: RouteStatus
  stopIds: string[]
  totalDistanceKm: number
}

export interface ChecklistItemContent {
  id: string
  labelKey: string
  category: 'vehicle' | 'camp' | 'camera'
  initiallyCompleted: boolean
}

export interface ActivityContent {
  id: string
  stopId: string
  type: string
  title: ContentTranslationKey
  description: ContentTranslationKey
}

export interface RouteDataset {
  routes: RouteContent[]
  stops: StopContent[]
  spots: SpotContent[]
  activities: ActivityContent[]
  checklist: ChecklistItemContent[]
}

export type StopViewModel = StopContent & { status: StopStatus; favorite: boolean; nightsStayed: number | null; actualDistanceKm: number | null }
export type ChecklistItemViewModel = ChecklistItemContent & { completed: boolean }
