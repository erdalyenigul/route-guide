import type {
  ContentTranslationKey,
  LunaUltraRecommendation,
  PhotoAsset,
  ServicePoint
} from './types'

function key(value: string): ContentTranslationKey {
  return `content.${value}`
}

export function stopCopy(stopKey: string) {
  const root = `stops.${stopKey}`
  return {
    title: key(`${root}.title`),
    region: key(`${root}.region`),
    overview: key(`${root}.overview`),
    whyVisit: key(`${root}.whyVisit`),
    lunaUltraRecommendations: [
      {
        subject: key(`${root}.luna.subject`),
        lens: key(`${root}.luna.lens`),
        timing: key(`${root}.luna.timing`),
        settings: key(`${root}.luna.settings`),
        fieldNote: key(`${root}.luna.note`)
      }
    ] satisfies LunaUltraRecommendation[],
    roadWarnings: [key(`${root}.warning1`), key(`${root}.warning2`)],
    bestSunrise: key(`${root}.sunrise`),
    bestSunset: key(`${root}.sunset`)
  }
}

export function servicePoint(
  stopKey: string,
  serviceKey: 'market' | 'fuel' | 'water' | 'dump',
  available: boolean,
  distanceKm: number
): ServicePoint {
  const root = `stops.${stopKey}`
  return {
    available,
    distanceKm,
    name: key(`${root}.${serviceKey}Name`),
    notes: key(`${root}.${serviceKey}Notes`)
  }
}

export function stopPhoto(id: string, url: string, stopKey: string): PhotoAsset {
  return { id, url, alt: key(`stops.${stopKey}.photoAlt`) }
}

export function municipalityNotes(stopKey: string): ContentTranslationKey {
  return key(`stops.${stopKey}.municipality`)
}

export function spotCopy(spotKey: string) {
  const root = `spots.${spotKey}`
  return {
    title: key(`${root}.title`),
    overview: key(`${root}.overview`),
    accessNote: key(`${root}.access`)
  }
}

export function sharedKey(path: string): ContentTranslationKey {
  return key(path)
}
