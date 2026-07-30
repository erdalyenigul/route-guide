-- Refine the Bodrum Peninsula sequence around the actual trip decisions:
-- Torba -> Yalikavak -> Gumusluk -> optional Karaincir swim -> Bodrum/Datca ferry -> Mazi.
-- Akyarlar is retained as a zero-night day stop. Central Bodrum is a ferry base;
-- this migration does not claim that public parking permits motorhome overnighting.

begin;

update public.stops
set title_key = 'content.stops.akyarlar.title',
    region_key = 'content.stops.akyarlar.region',
    overview_key = 'content.stops.akyarlar.overview',
    why_visit_key = 'content.stops.akyarlar.whyVisit',
    latitude = 36.97115,
    longitude = 27.29979,
    sea_score = 5,
    silence_score = 2,
    internet_score = 4,
    safety_score = 4,
    solar_suitability = 'excellent',
    shade = 'low',
    crowd_level = 'high',
    ducato_accessibility = 'caution',
    drone_suitability = 'caution',
    best_sunrise_key = 'content.stops.akyarlar.sunrise',
    best_sunset_key = 'content.stops.akyarlar.sunset',
    verification_status = 'verified',
    source_note = 'Karaincir Public Beach and its seasonal visitor facilities are listed by Bodrum Municipality. It is used here as a zero-night swim stop; public-beach services do not establish motorhome overnight permission. Source: https://www.bodrum.bel.tr/halk_plajlari',
    last_verified_at = '2026-07-30T00:00:00+03:00',
    ducato_access = 'caution',
    road_surface = 'asphalt',
    road_width = 'busy beach approach streets',
    steep_grade = false,
    hairpins = false,
    cliff_exposure = false,
    guardrails = true,
    turnaround_possible = false,
    last_mile_note_key = 'content.stops.akyarlar.ops.lastMile',
    supply_note_key = 'content.stops.akyarlar.ops.supply',
    decision_summary_key = 'content.stops.akyarlar.ops.decision',
    updated_at = now()
where slug = 'akyarlar';

insert into public.stops (
  id,
  slug,
  content_key,
  title_key,
  region_key,
  overview_key,
  why_visit_key,
  latitude,
  longitude,
  sea_score,
  silence_score,
  internet_score,
  safety_score,
  solar_suitability,
  shade,
  crowd_level,
  ducato_accessibility,
  drone_suitability,
  best_sunrise_key,
  best_sunset_key,
  verification_status,
  source_note,
  last_verified_at,
  ducato_access,
  road_surface,
  road_width,
  steep_grade,
  hairpins,
  cliff_exposure,
  guardrails,
  turnaround_possible,
  last_mile_note_key,
  supply_note_key,
  decision_summary_key
)
values (
  '79300000-0000-4000-8000-000000000001'::uuid,
  'bodrum-center',
  'content.stops.bodrumCenter',
  'content.stops.bodrumCenter.title',
  'content.stops.bodrumCenter.region',
  'content.stops.bodrumCenter.overview',
  'content.stops.bodrumCenter.whyVisit',
  37.0361912,
  27.4271321,
  3,
  1,
  5,
  4,
  'medium',
  'low',
  'high',
  'caution',
  'difficult',
  'content.stops.bodrumCenter.sunrise',
  'content.stops.bodrumCenter.sunset',
  'partially_verified',
  'Bodrum Ferryboat identifies Bodrum Kale Port (Datca Ferry Pier) as the Bodrum departure point for Datca and instructs passengers to arrive 30 minutes before departure. A legal central Bodrum motorhome overnight location is not asserted. Source: https://bodrumferibot.com/seferler-bodrum-datca',
  '2026-07-30T00:00:00+03:00',
  'caution',
  'asphalt',
  'busy urban streets near the old town and harbour',
  false,
  false,
  false,
  true,
  false,
  'content.stops.bodrumCenter.ops.lastMile',
  'content.stops.bodrumCenter.ops.supply',
  'content.stops.bodrumCenter.ops.decision'
)
on conflict (slug) do update
set content_key = excluded.content_key,
    title_key = excluded.title_key,
    region_key = excluded.region_key,
    overview_key = excluded.overview_key,
    why_visit_key = excluded.why_visit_key,
    latitude = excluded.latitude,
    longitude = excluded.longitude,
    sea_score = excluded.sea_score,
    silence_score = excluded.silence_score,
    internet_score = excluded.internet_score,
    safety_score = excluded.safety_score,
    solar_suitability = excluded.solar_suitability,
    shade = excluded.shade,
    crowd_level = excluded.crowd_level,
    ducato_accessibility = excluded.ducato_accessibility,
    drone_suitability = excluded.drone_suitability,
    best_sunrise_key = excluded.best_sunrise_key,
    best_sunset_key = excluded.best_sunset_key,
    verification_status = excluded.verification_status,
    source_note = excluded.source_note,
    last_verified_at = excluded.last_verified_at,
    ducato_access = excluded.ducato_access,
    road_surface = excluded.road_surface,
    road_width = excluded.road_width,
    steep_grade = excluded.steep_grade,
    hairpins = excluded.hairpins,
    cliff_exposure = excluded.cliff_exposure,
    guardrails = excluded.guardrails,
    turnaround_possible = excluded.turnaround_possible,
    last_mile_note_key = excluded.last_mile_note_key,
    supply_note_key = excluded.supply_note_key,
    decision_summary_key = excluded.decision_summary_key,
    updated_at = now();

update public.route_stops as route_stop
set position = position + 1000
from public.routes as route
where route_stop.route_id = route.id
  and route.slug = 'izmir-lara';

insert into public.route_stops (
  route_id,
  stop_id,
  position,
  recommended_nights,
  min_nights,
  max_nights,
  driving_distance_km,
  drive_time_minutes,
  initial_status
)
select route.id, stop.id, 1999, 1, 0, 1, 23, 35, 'planned'
from public.routes as route
join public.stops as stop on stop.slug = 'bodrum-center'
where route.slug = 'izmir-lara'
on conflict (route_id, stop_id) do update
set position = excluded.position,
    recommended_nights = excluded.recommended_nights,
    min_nights = excluded.min_nights,
    max_nights = excluded.max_nights,
    driving_distance_km = excluded.driving_distance_km,
    drive_time_minutes = excluded.drive_time_minutes;

update public.route_stops as route_stop
set position = data.position,
    recommended_nights = data.recommended_nights,
    min_nights = data.min_nights,
    max_nights = data.max_nights,
    driving_distance_km = data.driving_distance_km,
    drive_time_minutes = data.drive_time_minutes
from public.routes as route
cross join (
  values
    ('izmir', 0, 1, 1, 1, 0, 0),
    ('guzelcamli', 1, 2, 1, 2, 126, 95),
    ('bafa', 2, 1, 1, 1, 79, 80),
    ('izmir-restart', 3, 4, 1, 14, 180, 170),
    ('cesme-palmiye', 4, 1, 1, 1, 95, 80),
    ('torba', 5, 1, 0, 1, 320, 250),
    ('yalikavak', 6, 0, 0, 1, 20, 30),
    ('gumusluk', 7, 1, 0, 2, 12, 20),
    ('akyarlar', 8, 0, 0, 1, 17, 25),
    ('bodrum-center', 9, 1, 0, 1, 23, 35),
    ('mazi', 10, 1, 1, 1, 51, 70),
    ('ilgin-koyu', 11, 1, 1, 1, 5, 12),
    ('akbuk', 12, 2, 1, 2, 44, 60),
    ('dalyan', 13, 2, 1, 2, 98, 120),
    ('karaot', 14, 1, 1, 1, 58, 70),
    ('faralya', 15, 2, 1, 2, 47, 80),
    ('patara', 16, 1, 1, 1, 59, 112),
    ('kas', 17, 2, 1, 2, 42, 54),
    ('cirali', 18, 2, 1, 2, 128, 160),
    ('lara', 19, 1, 1, 14, 88, 105)
) as data(slug, position, recommended_nights, min_nights, max_nights, driving_distance_km, drive_time_minutes)
join public.stops as stop on stop.slug = data.slug
where route_stop.route_id = route.id
  and route.slug = 'izmir-lara'
  and route_stop.stop_id = stop.id;

insert into public.trip_stop_states (route_id, stop_id, status)
select route.id, stop.id, 'planned'
from public.routes as route
join public.stops as stop on stop.slug = 'bodrum-center'
where route.slug = 'izmir-lara'
on conflict (route_id, stop_id) do nothing;

-- Remove old Akyarlar overnight suggestions from the active content. The stop
-- is now a deliberate daytime swim, and ordinary beach access must not be
-- presented as a freecamp recommendation.
delete from public.camping_spots
where stop_id = (select id from public.stops where slug = 'akyarlar');

delete from public.facilities
where stop_id in (select id from public.stops where slug in ('akyarlar', 'bodrum-center'));

insert into public.facilities (
  stop_id,
  facility_type,
  available,
  is_municipal,
  name_key,
  notes_key,
  distance_km,
  metadata,
  verification_status,
  source_note,
  last_verified_at
)
select stop.id,
       data.facility_type,
       data.available,
       data.is_municipal,
       data.name_key,
       data.notes_key,
       data.distance_km,
       data.metadata,
       data.verification_status,
       data.source_note,
       '2026-07-30T00:00:00+03:00'::timestamptz
from public.stops as stop
join (
  values
    ('akyarlar', 'municipality', true, true, null::text, 'content.stops.akyarlar.municipality', 0::numeric, '{"wc":true,"shower":true,"potableWater":false,"wasteBins":true}'::jsonb, 'verified', 'Bodrum Municipality 2026 public beach listing.'),
    ('akyarlar', 'market', true, false, 'content.stops.akyarlar.marketName', 'content.stops.akyarlar.marketNotes', 1::numeric, '{}'::jsonb, 'partially_verified', 'General village supply point; exact shop is intentionally not hardcoded.'),
    ('akyarlar', 'fuel', true, false, 'content.stops.akyarlar.fuelName', 'content.stops.akyarlar.fuelNotes', 8::numeric, '{}'::jsonb, 'partially_verified', 'Use an accessible main-road station.'),
    ('bodrum-center', 'municipality', true, false, null::text, 'content.stops.bodrumCenter.municipality', 0::numeric, '{"wc":true,"shower":false,"potableWater":false,"wasteBins":true}'::jsonb, 'partially_verified', 'Urban and ferry terminal services; not motorhome infrastructure.'),
    ('bodrum-center', 'market', true, false, 'content.stops.bodrumCenter.marketName', 'content.stops.bodrumCenter.marketNotes', 1::numeric, '{}'::jsonb, 'partially_verified', 'Central Bodrum retail access.'),
    ('bodrum-center', 'fuel', true, false, 'content.stops.bodrumCenter.fuelName', 'content.stops.bodrumCenter.fuelNotes', 4::numeric, '{}'::jsonb, 'partially_verified', 'Use a main-road station outside the old-town lanes.')
) as data(slug, facility_type, available, is_municipal, name_key, notes_key, distance_km, metadata, verification_status, source_note)
  on stop.slug = data.slug;

delete from public.activities
where stop_id in (select id from public.stops where slug in ('akyarlar', 'bodrum-center'));

insert into public.activities (
  stop_id,
  activity_type,
  title_key,
  description_key,
  position,
  verification_status,
  source_note,
  last_verified_at
)
select stop.id,
       data.activity_type,
       data.title_key,
       data.description_key,
       data.position,
       data.verification_status,
       data.source_note,
       '2026-07-30T00:00:00+03:00'::timestamptz
from public.stops as stop
join (
  values
    ('akyarlar', 'swimming', 'content.stops.akyarlar.activities.swim.title', 'content.stops.akyarlar.activities.swim.description', 0, 'verified', 'Bodrum Municipality lists Karaincir as a serviced public beach for the 2026 season.'),
    ('bodrum-center', 'day_trip', 'content.stops.bodrumCenter.activities.datca.title', 'content.stops.bodrumCenter.activities.datca.description', 0, 'verified', 'Bodrum Ferryboat publishes the Bodrum Kale Port to Datca service.'),
    ('bodrum-center', 'walking', 'content.stops.bodrumCenter.activities.harbour.title', 'content.stops.bodrumCenter.activities.harbour.description', 1, 'partially_verified', 'General public old-town and harbour walking plan.')
) as data(slug, activity_type, title_key, description_key, position, verification_status, source_note)
  on stop.slug = data.slug;

delete from public.tips
where stop_id in (select id from public.stops where slug in ('akyarlar', 'bodrum-center'));

insert into public.tips (
  stop_id,
  tip_type,
  subject_key,
  body_key,
  lens_key,
  timing_key,
  settings_key,
  position,
  verification_status,
  source_note,
  last_verified_at
)
select stop.id,
       'photo',
       'content.stops.' || data.content_slug || '.luna.subject',
       'content.stops.' || data.content_slug || '.luna.note',
       'content.stops.' || data.content_slug || '.luna.lens',
       'content.stops.' || data.content_slug || '.luna.timing',
       'content.stops.' || data.content_slug || '.luna.settings',
       0,
       'partially_verified',
       data.source_note,
       '2026-07-30T00:00:00+03:00'::timestamptz
from public.stops as stop
join (
  values
    ('akyarlar', 'akyarlar', 'Photography suggestion based on the verified public beach target.'),
    ('bodrum-center', 'bodrumCenter', 'Photography suggestion for public harbour viewpoints; port restrictions take priority.')
) as data(slug, content_slug, source_note)
  on stop.slug = data.slug;

delete from public.warnings
where stop_id in (select id from public.stops where slug in ('akyarlar', 'bodrum-center'));

insert into public.warnings (
  stop_id,
  warning_type,
  severity,
  body_key,
  position,
  verification_status,
  source_note,
  last_verified_at
)
select stop.id,
       data.warning_type,
       data.severity,
       data.body_key,
       data.position,
       data.verification_status,
       data.source_note,
       '2026-07-30T00:00:00+03:00'::timestamptz
from public.stops as stop
join (
  values
    ('akyarlar', 'traffic', 'warning', 'content.stops.akyarlar.warning1', 0, 'partially_verified', 'Seasonal congestion is an operational caution.'),
    ('akyarlar', 'overnight', 'info', 'content.stops.akyarlar.warning2', 1, 'verified', 'No overnight inference is made from public-beach facilities.'),
    ('bodrum-center', 'traffic', 'warning', 'content.stops.bodrumCenter.warning1', 0, 'partially_verified', 'Central port streets require a separate Ducato parking plan.'),
    ('bodrum-center', 'ferry', 'warning', 'content.stops.bodrumCenter.warning2', 1, 'verified', 'Official operator asks passengers to arrive 30 minutes before departure; sailings remain date and weather dependent.')
) as data(slug, warning_type, severity, body_key, position, verification_status, source_note)
  on stop.slug = data.slug;

update public.routes
set total_distance_km = 1480,
    updated_at = now()
where slug = 'izmir-lara';

notify pgrst, 'reload schema';

commit;
