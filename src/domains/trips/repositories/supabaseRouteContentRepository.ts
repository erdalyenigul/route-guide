import type { Accessibility, CampingType, ContentTranslationKey, DucatoAccess, Level, OvernightStatus, RouteDataset, RouteStatus, StopExperience, StopStatus, VerificationStatus, WarningSeverity } from '@/content/types'
import { departureChecklist } from '@/content/checklists/departure'
import { supabase } from '@/infrastructure/supabase/client'
import type { FacilityRow, GalleryRow, StopRow, TipRow } from '@/infrastructure/supabase/database.types'

import type { RouteContentRepository } from './routeContentRepository'

function contentKey(value: string | null): ContentTranslationKey {
  if (!value?.startsWith('content.')) throw new Error(`Invalid content translation key: ${value ?? 'null'}`)
  return value as ContentTranslationKey
}

function level(value: string | null): Level | null {
  if (value === null) return null
  if (!['none', 'low', 'medium', 'high', 'excellent'].includes(value)) throw new Error(`Invalid level: ${value}`)
  return value as Level
}

function accessibility(value: string | null): Accessibility | null {
  if (value === null) return null
  if (!['difficult', 'caution', 'good', 'excellent'].includes(value)) throw new Error(`Invalid accessibility: ${value}`)
  return value as Accessibility
}

function ducatoAccess(value: string | null | undefined, fallback: Accessibility | null): DucatoAccess | null {
  if (value && ['comfortable', 'caution', 'leave_above', 'do_not_enter'].includes(value)) return value as DucatoAccess
  if (fallback === 'excellent' || fallback === 'good') return 'comfortable'
  if (fallback === 'caution') return 'caution'
  if (fallback === 'difficult') return 'leave_above'
  return null
}

function optionalContentKey(value: string | null | undefined): ContentTranslationKey | null {
  return value?.startsWith('content.') ? value as ContentTranslationKey : null
}

function publicMediaUrl(gallery: GalleryRow): string {
  if (gallery.external_url) return gallery.external_url
  if (!gallery.storage_path || !supabase) return ''
  return supabase.storage.from(gallery.bucket).getPublicUrl(gallery.storage_path).data.publicUrl
}

function metadataFlag(facility: FacilityRow | undefined, property: string): boolean {
  const metadata = facility?.metadata
  return Boolean(metadata && typeof metadata === 'object' && !Array.isArray(metadata) && metadata[property] === true)
}

function service(facilities: FacilityRow[], type: string) {
  const facility = facilities.find((item) => item.facility_type === type && !item.camping_spot_id)
  return {
    available: facility?.available ?? false,
    name: contentKey(facility?.name_key ?? 'content.placeholder.overview'),
    distanceKm: facility?.distance_km ?? 0,
    notes: contentKey(facility?.notes_key ?? 'content.placeholder.overview')
  }
}

function lunaTips(tips: TipRow[], row: StopRow) {
  const matching = tips.filter((tip) => tip.stop_id === row.id && tip.tip_type === 'luna_ultra')
  return matching.map((tip) => ({
    subject: contentKey(tip.subject_key),
    lens: contentKey(tip.lens_key),
    timing: contentKey(tip.timing_key),
    settings: contentKey(tip.settings_key),
    fieldNote: contentKey(tip.body_key)
  }))
}

export const supabaseRouteContentRepository: RouteContentRepository = {
  async getDataset(): Promise<RouteDataset> {
    if (!supabase) throw new Error('Supabase environment variables are not configured')

    const [routeResult, routeStopResult, stopResult, spotResult, galleryResult, facilityResult, activityResult, tipResult, warningResult, experienceResult] = await Promise.all([
      supabase.from('routes').select('*').order('created_at'),
      supabase.from('route_stops').select('*').order('position'),
      supabase.from('stops').select('*').order('slug'),
      supabase.from('camping_spots').select('*').order('position'),
      supabase.from('galleries').select('*').order('is_cover', { ascending: false }).order('position'),
      supabase.from('facilities').select('*').order('created_at'),
      supabase.from('activities').select('*').order('position'),
      supabase.from('tips').select('*').order('position'),
      supabase.from('warnings').select('*').order('position'),
      supabase.from('stop_experiences').select('*').order('updated_at', { ascending: false })
    ])
    const results = [routeResult, routeStopResult, stopResult, spotResult, galleryResult, facilityResult, activityResult, tipResult, warningResult]
    const failed = results.find((result) => result.error)
    if (failed?.error) throw failed.error
    const missingExperienceTable = experienceResult.error
      && ['42P01', 'PGRST205'].includes(experienceResult.error.code ?? '')
    if (experienceResult.error && !missingExperienceTable) throw experienceResult.error

    const routeRows = routeResult.data ?? []
    const routeStopRows = routeStopResult.data ?? []
    const stopRows = stopResult.data ?? []
    const spotRows = spotResult.data ?? []
    const galleryRows = galleryResult.data ?? []
    const facilityRows = facilityResult.data ?? []
    const activityRows = activityResult.data ?? []
    const tipRows = tipResult.data ?? []
    const warningRows = warningResult.data ?? []
    const experienceRows = missingExperienceTable ? [] : (experienceResult.data ?? [])
    if (!routeRows.length) throw new Error('Supabase returned no route content')

    const routeSlugById = new Map(routeRows.map((route) => [route.id, route.slug]))
    const stopSlugById = new Map(stopRows.map((stop) => [stop.id, stop.slug]))

    const routes = routeRows.map((route) => ({
      id: route.slug,
      title: contentKey(route.title_key),
      description: contentKey(route.description_key),
      startDate: route.start_date,
      endDate: route.end_date,
      status: route.status as RouteStatus,
      stopIds: routeStopRows.filter((item) => item.route_id === route.id).sort((a, b) => a.position - b.position).map((item) => stopSlugById.get(item.stop_id) ?? item.stop_id),
      totalDistanceKm: route.total_distance_km
    }))

    const stops = stopRows.map((row) => {
      const routeStop = routeStopRows.find((item) => item.stop_id === row.id)
      if (!routeStop) throw new Error(`Stop ${row.slug} is not assigned to a route`)
      const stopFacilities = facilityRows.filter((facility) => facility.stop_id === row.id)
      const municipality = stopFacilities.find((facility) => facility.facility_type === 'municipality' && !facility.camping_spot_id)
      const stopGalleries = galleryRows.filter((gallery) => gallery.stop_id === row.id)
      const stopSpotRows = spotRows.filter((spot) => spot.stop_id === row.id)
      const stopExperienceRows = experienceRows.filter(item => item.stop_id === row.id)
      const experienceRow = stopExperienceRows.find(item => item.locale === 'tr') ?? stopExperienceRows[0]
      const experience: StopExperience | undefined = experienceRow ? {
        body: experienceRow.body,
        isPublished: experienceRow.is_published,
        authorName: experienceRow.author_name,
        updatedAt: experienceRow.updated_at
      } : undefined
      const legacyDucatoAccess = accessibility(row.ducato_accessibility)
      return {
        id: row.slug,
        routeId: routeSlugById.get(routeStop.route_id) ?? routeStop.route_id,
        order: routeStop.position,
        title: contentKey(row.title_key),
        slug: row.slug,
        region: contentKey(row.region_key),
        coordinates: { latitude: row.latitude, longitude: row.longitude },
        overview: contentKey(row.overview_key),
        whyVisit: contentKey(row.why_visit_key),
        recommendedNights: routeStop.recommended_nights,
        minNights: routeStop.min_nights,
        maxNights: routeStop.max_nights,
        drivingDistanceFromPreviousKm: routeStop.driving_distance_km,
        estimatedDriveTimeMinutes: routeStop.drive_time_minutes,
        seaScore: row.sea_score,
        silenceScore: row.silence_score,
        internetScore: row.internet_score,
        safetyScore: row.safety_score,
        solarSuitability: level(row.solar_suitability),
        shade: level(row.shade),
        crowdLevel: level(row.crowd_level),
        ducatoAccessibility: legacyDucatoAccess,
        ducatoAccess: ducatoAccess(row.ducato_access, legacyDucatoAccess),
        roadSurface: row.road_surface ?? null,
        roadWidth: row.road_width ?? null,
        steepGrade: row.steep_grade ?? null,
        hairpins: row.hairpins ?? null,
        cliffExposure: row.cliff_exposure ?? null,
        guardrails: row.guardrails ?? null,
        turnaroundPossible: row.turnaround_possible ?? null,
        lastMileNote: optionalContentKey(row.last_mile_note_key),
        supplyNote: optionalContentKey(row.supply_note_key),
        decisionSummary: optionalContentKey(row.decision_summary_key),
        droneSuitability: accessibility(row.drone_suitability),
        lunaUltraRecommendations: lunaTips(tipRows, row),
        municipalityFacilities: {
          available: municipality?.available ?? false,
          wc: metadataFlag(municipality, 'wc'),
          shower: metadataFlag(municipality, 'shower'),
          potableWater: metadataFlag(municipality, 'potableWater'),
          wasteBins: metadataFlag(municipality, 'wasteBins'),
          notes: contentKey(municipality?.notes_key ?? 'content.placeholder.overview')
        },
        nearbyMarket: service(stopFacilities, 'market'),
        fuelStation: service(stopFacilities, 'fuel'),
        waterRefill: service(stopFacilities, 'water'),
        dumpStation: service(stopFacilities, 'dump'),
        freecampSpotIds: stopSpotRows.filter((spot) => spot.spot_type === 'freecamp').map((spot) => spot.slug),
        paidAlternativeIds: stopSpotRows.filter((spot) => spot.spot_type !== 'freecamp').map((spot) => spot.slug),
        roadWarnings: warningRows.filter((warning) => warning.stop_id === row.id).map((warning) => contentKey(warning.body_key)),
        warnings: warningRows.filter((warning) => warning.stop_id === row.id).map((warning) => ({
          id: warning.id,
          type: warning.warning_type,
          severity: warning.severity as WarningSeverity,
          body: contentKey(warning.body_key),
          verificationStatus: warning.verification_status as VerificationStatus,
          lastVerifiedAt: warning.last_verified_at
        })),
        bestSunrise: contentKey(row.best_sunrise_key),
        bestSunset: contentKey(row.best_sunset_key),
        photos: stopGalleries.map((gallery) => ({
          id: gallery.id,
          url: publicMediaUrl(gallery),
          alt: contentKey(gallery.alt_key),
          caption: gallery.caption,
          isCover: gallery.is_cover,
          sourceType: gallery.source_type as 'guide' | 'placeholder' | 'trip',
          storagePath: gallery.storage_path,
          bucket: gallery.bucket as 'covers' | 'gallery'
        })),
        ...(experience ? { experience } : {}),
        initialStatus: routeStop.initial_status as StopStatus,
        verificationStatus: row.verification_status as VerificationStatus,
        sourceNote: row.source_note,
        lastVerifiedAt: row.last_verified_at
      }
    })

    const spots = spotRows.map((row) => ({
      id: row.slug,
      stopId: stopSlugById.get(row.stop_id) ?? row.stop_id,
      title: contentKey(row.title_key),
      type: row.spot_type as CampingType,
      coordinates: { latitude: row.latitude, longitude: row.longitude },
      overview: contentKey(row.overview_key),
      priceNote: contentKey(row.price_note_key),
      rating: row.rating,
      recommended: row.recommended,
      facilities: facilityRows.filter((facility) => facility.camping_spot_id === row.id && facility.name_key).map((facility) => contentKey(facility.name_key)),
      accessNote: contentKey(row.access_note_key),
      ducatoAccess: ducatoAccess(row.ducato_access, null),
      overnightStatus: row.overnight_status as OvernightStatus | null,
      beachfront: row.beachfront ?? null,
      seaView: row.sea_view ?? null,
      distanceToSeaM: row.distance_to_sea_m ?? null,
      groundSurface: row.ground_surface ?? null,
      levelGround: row.level_ground ?? null,
      capacityVehicles: row.capacity_vehicles ?? null,
      shadeAvailable: row.shade_available ?? null,
      waterAvailable: row.water_available ?? null,
      toiletAvailable: row.toilet_available ?? null,
      showerAvailable: row.shower_available ?? null,
      wasteAvailable: row.waste_available ?? null,
      mobileSignal: row.mobile_signal ?? null,
      crowdLevel: row.crowd_level ?? null,
      nightQuiet: row.night_quiet ?? null,
      safetyNote: optionalContentKey(row.safety_note_key),
      verificationStatus: row.verification_status as VerificationStatus,
      lastVerifiedAt: row.last_verified_at
    }))

    const activities = activityRows.map((row) => ({
      id: row.id,
      stopId: stopSlugById.get(row.stop_id) ?? row.stop_id,
      type: row.activity_type,
      title: contentKey(row.title_key),
      description: contentKey(row.description_key)
    }))

    return { routes, stops, spots, activities, checklist: departureChecklist }
  }
}
