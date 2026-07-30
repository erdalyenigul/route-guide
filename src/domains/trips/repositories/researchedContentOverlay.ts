import type {
  ActivityContent,
  ContentTranslationKey,
  RouteDataset,
  ServicePoint,
  SpotContent,
  StopContent
} from '@/content/types'

type ResearchedStop = {
  contentName: 'izmir' | 'guzelcamli' | 'bafaLake'
  coordinates: { latitude: number; longitude: number }
  recommendedNights: number
  minNights: number
  maxNights: number
  distanceKm: number
  driveMinutes: number
  sourceUrl: string
}

const researchedStops: Record<string, ResearchedStop> = {
  izmir: {
    contentName: 'izmir',
    coordinates: { latitude: 38.4897894, longitude: 27.1649118 },
    recommendedNights: 1,
    minNights: 1,
    maxNights: 2,
    distanceKm: 0,
    driveMinutes: 0,
    sourceUrl: 'https://www.visitizmir.org/en/Content/135'
  },
  guzelcamli: {
    contentName: 'guzelcamli',
    coordinates: { latitude: 37.7118, longitude: 27.2336 },
    recommendedNights: 2,
    minNights: 1,
    maxNights: 3,
    distanceKm: 126,
    driveMinutes: 95,
    sourceUrl: 'https://ekotaban.tarimorman.gov.tr/alan/5156'
  },
  bafa: {
    contentName: 'bafaLake',
    coordinates: { latitude: 37.5009, longitude: 27.5254 },
    recommendedNights: 2,
    minNights: 1,
    maxNights: 3,
    distanceKm: 79,
    driveMinutes: 80,
    sourceUrl: 'https://ekotaban.tarimorman.gov.tr/alan/630'
  }
}

function key(path: string): ContentTranslationKey {
  return `content.${path}`
}

function service(
  contentName: ResearchedStop['contentName'],
  type: 'market' | 'fuel' | 'water' | 'dump',
  available = false
): ServicePoint {
  return {
    available,
    name: key(`stops.${contentName}.${type}Name`),
    distanceKm: 0,
    notes: key(`stops.${contentName}.${type}Notes`)
  }
}

function enrichStop(stop: StopContent, researched: ResearchedStop): StopContent {
  const root = `stops.${researched.contentName}`
  const freecampId = `${stop.id}-freecamp-unverified`

  return {
    ...stop,
    title: key(`${root}.title`),
    region: key(`${root}.region`),
    coordinates: researched.coordinates,
    overview: key(`${root}.overview`),
    whyVisit: key(`${root}.whyVisit`),
    recommendedNights: researched.recommendedNights,
    minNights: researched.minNights,
    maxNights: researched.maxNights,
    drivingDistanceFromPreviousKm: researched.distanceKm,
    estimatedDriveTimeMinutes: researched.driveMinutes,
    seaScore: null,
    silenceScore: null,
    internetScore: null,
    safetyScore: null,
    solarSuitability: null,
    shade: null,
    crowdLevel: null,
    ducatoAccessibility: 'caution',
    droneSuitability: null,
    lunaUltraRecommendations: [
      {
        subject: key(`${root}.luna.subject`),
        lens: key(`${root}.luna.lens`),
        timing: key(`${root}.luna.timing`),
        settings: key(`${root}.luna.settings`),
        fieldNote: key(`${root}.luna.note`)
      }
    ],
    municipalityFacilities: {
      available: false,
      wc: false,
      shower: false,
      potableWater: false,
      wasteBins: false,
      notes: key(`${root}.municipality`)
    },
    nearbyMarket: service(researched.contentName, 'market', stop.id === 'izmir'),
    fuelStation: service(researched.contentName, 'fuel'),
    waterRefill: service(researched.contentName, 'water'),
    dumpStation: service(researched.contentName, 'dump'),
    freecampSpotIds: [freecampId],
    paidAlternativeIds: [],
    roadWarnings: [key(`${root}.warning1`), key(`${root}.warning2`)],
    bestSunrise: key(`${root}.sunrise`),
    bestSunset: key(`${root}.sunset`),
    verificationStatus: 'partially_verified',
    sourceNote: researched.sourceUrl,
    lastVerifiedAt: '2026-07-22T00:00:00+03:00'
  }
}

function freecamp(stop: StopContent, researched: ResearchedStop): SpotContent {
  const spotName =
    researched.contentName === 'bafaLake' ? 'bafaFree' : `${researched.contentName}Free`
  return {
    id: `${stop.id}-freecamp-unverified`,
    stopId: stop.id,
    title: key(`spots.${spotName}.title`),
    type: 'freecamp',
    coordinates: researched.coordinates,
    overview: key(`spots.${spotName}.overview`),
    priceNote: key(`guide.${researched.contentName}.freecampPrice`),
    rating: 0,
    recommended: false,
    facilities: [],
    accessNote: key(`spots.${spotName}.access`)
  }
}

function activities(stop: StopContent, researched: ResearchedStop): ActivityContent[] {
  const root = `guide.${researched.contentName}`
  const definitions: Array<[string, string, string]> = [
    ['hidden_place', 'hiddenTitle', 'hiddenDescription'],
    ['beach', 'beachTitle', 'beachDescription'],
    ['note', 'practicalTitle', 'practicalDescription'],
    ['hiking', 'hikingTitle', 'hikingDescription'],
    ['viewpoint', 'viewpointTitle', 'viewpointDescription']
  ]
  return definitions.map(([type, title, description], index) => ({
    id: `researched-${stop.id}-${index}`,
    stopId: stop.id,
    type,
    title: key(`${root}.${title}`),
    description: key(`${root}.${description}`)
  }))
}

/**
 * Keeps verified local copy visible while an older Supabase seed is still live.
 * Once the migration is applied the values are equivalent, so this operation is
 * intentionally idempotent and can remain as an offline-ready content layer.
 */
export function applyResearchedContentOverlay(dataset: RouteDataset): RouteDataset {
  const stopIds = new Set<string>()
  const enrichedStops = dataset.stops.map((stop) => {
    const researched = researchedStops[stop.slug]
    if (!researched) return stop
    stopIds.add(stop.id)
    return enrichStop(stop, researched)
  })

  const additions = enrichedStops.flatMap((stop) => {
    const researched = researchedStops[stop.slug]
    return researched ? [freecamp(stop, researched)] : []
  })
  const activityAdditions = enrichedStops.flatMap((stop) => {
    const researched = researchedStops[stop.slug]
    return researched ? activities(stop, researched) : []
  })

  return {
    ...dataset,
    stops: enrichedStops,
    spots: [...dataset.spots.filter((spot) => !stopIds.has(spot.stopId)), ...additions],
    activities: [
      ...dataset.activities.filter((activity) => !stopIds.has(activity.stopId)),
      ...activityAdditions
    ]
  }
}
