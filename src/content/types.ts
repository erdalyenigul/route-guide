export type RouteStatus = 'planning' | 'active' | 'completed'
export type StopStatus = 'planned' | 'current' | 'visited' | 'skipped'
export type CampingType = 'freecamp' | 'municipality' | 'paid'
export type Level = 'none' | 'low' | 'medium' | 'high' | 'excellent'
export type Accessibility = 'difficult' | 'caution' | 'good' | 'excellent'
export type ContentTranslationKey = `content.${string}`
export type VerificationStatus = 'unverified' | 'partially_verified' | 'verified'
export type DucatoAccess = 'comfortable' | 'caution' | 'leave_above' | 'do_not_enter'
export type OvernightStatus = 'allowed' | 'tolerated' | 'restricted' | 'prohibited' | 'unknown'
export type WarningSeverity = 'info' | 'warning' | 'danger'

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
  ducatoAccess?: DucatoAccess | null
  overnightStatus?: OvernightStatus | null
  beachfront?: boolean | null
  seaView?: boolean | null
  distanceToSeaM?: number | null
  groundSurface?: string | null
  levelGround?: boolean | null
  capacityVehicles?: number | null
  shadeAvailable?: boolean | null
  waterAvailable?: boolean | null
  toiletAvailable?: boolean | null
  showerAvailable?: boolean | null
  wasteAvailable?: boolean | null
  mobileSignal?: string | null
  crowdLevel?: string | null
  nightQuiet?: boolean | null
  safetyNote?: ContentTranslationKey | null
  verificationStatus?: VerificationStatus
  lastVerifiedAt?: string | null
}

export interface StopWarning {
  id: string
  type: string
  severity: WarningSeverity
  body: ContentTranslationKey
  verificationStatus?: VerificationStatus
  lastVerifiedAt?: string | null
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
  ducatoAccess?: DucatoAccess | null
  roadSurface?: string | null
  roadWidth?: string | null
  steepGrade?: boolean | null
  hairpins?: boolean | null
  cliffExposure?: boolean | null
  guardrails?: boolean | null
  turnaroundPossible?: boolean | null
  lastMileNote?: ContentTranslationKey | null
  supplyNote?: ContentTranslationKey | null
  decisionSummary?: ContentTranslationKey | null
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
  warnings?: StopWarning[]
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

export type StopViewModel = StopContent & {
  status: StopStatus
  favorite: boolean
  nightsStayed: number | null
  actualDistanceKm: number | null
}
export type ChecklistItemViewModel = ChecklistItemContent & { completed: boolean }
