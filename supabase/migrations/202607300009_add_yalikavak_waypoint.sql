-- Add Yalıkavak as a zero-night logistics waypoint between Torba and Gümüşlük.
-- This is not an overnight recommendation. It supports parcel pickup, dinner
-- and a short waterfront break before continuing to Gümüşlük.

begin;

alter table public.route_stops
  drop constraint if exists route_stops_recommended_nights_check;

alter table public.route_stops
  drop constraint if exists route_stops_min_nights_check;

alter table public.route_stops
  drop constraint if exists route_stops_max_nights_check;

alter table public.route_stops
  add constraint route_stops_recommended_nights_check
  check (recommended_nights >= 0);

alter table public.route_stops
  add constraint route_stops_min_nights_check
  check (min_nights >= 0);

alter table public.route_stops
  add constraint route_stops_max_nights_check
  check (max_nights >= min_nights);

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
  '79200000-0000-4000-8000-000000000001'::uuid,
  'yalikavak',
  'content.stops.yalikavak',
  'content.stops.yalikavak.title',
  'content.stops.yalikavak.region',
  'content.stops.yalikavak.overview',
  'content.stops.yalikavak.whyVisit',
  37.1057,
  27.2849,
  4,
  2,
  5,
  4,
  'medium',
  'medium',
  'high',
  'caution',
  'difficult',
  'content.stops.yalikavak.sunrise',
  'content.stops.yalikavak.sunset',
  'partially_verified',
  'Yalıkavak is used as a flexible daytime logistics and dinner waypoint between Torba and Gümüşlük. No specific Hepsiburada pickup point is hardcoded because pickup locations must be selected and checked in the delivery app at the time of ordering.',
  '2026-07-30T00:00:00+03:00',
  'caution',
  'asphalt',
  'urban streets and marina traffic',
  false,
  false,
  false,
  true,
  false,
  'content.stops.yalikavak.ops.lastMile',
  'content.stops.yalikavak.ops.supply',
  'content.stops.yalikavak.ops.decision'
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
select route.id, stop.id, 1999, 0, 0, 1, 20, 30, 'planned'
from public.routes as route
join public.stops as stop on stop.slug = 'yalikavak'
where route.slug = 'izmir-lara'
on conflict (route_id, stop_id) do update
set position = excluded.position,
    recommended_nights = excluded.recommended_nights,
    min_nights = excluded.min_nights,
    max_nights = excluded.max_nights,
    driving_distance_km = excluded.driving_distance_km,
    drive_time_minutes = excluded.drive_time_minutes,
    initial_status = excluded.initial_status;

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
    ('torba', 5, 1, 1, 1, 320, 250),
    ('yalikavak', 6, 0, 0, 1, 20, 30),
    ('gumusluk', 7, 2, 1, 2, 12, 20),
    ('akyarlar', 8, 1, 1, 1, 17, 25),
    ('mazi', 9, 1, 1, 1, 73, 85),
    ('ilgin-koyu', 10, 1, 1, 1, 5, 12),
    ('akbuk', 11, 2, 1, 2, 44, 60),
    ('dalyan', 12, 2, 1, 2, 98, 120),
    ('karaot', 13, 1, 1, 1, 58, 70),
    ('faralya', 14, 2, 1, 2, 47, 80),
    ('patara', 15, 1, 1, 1, 59, 112),
    ('kas', 16, 2, 1, 2, 42, 54),
    ('cirali', 17, 2, 1, 2, 128, 160),
    ('lara', 18, 1, 1, 14, 88, 105)
) as data(slug, position, recommended_nights, min_nights, max_nights, driving_distance_km, drive_time_minutes)
join public.stops as stop on stop.slug = data.slug
where route_stop.route_id = route.id
  and route.slug = 'izmir-lara'
  and route_stop.stop_id = stop.id;

insert into public.trip_stop_states (route_id, stop_id, status)
select route.id, stop.id, 'planned'
from public.routes as route
join public.stops as stop on stop.slug = 'yalikavak'
where route.slug = 'izmir-lara'
on conflict (route_id, stop_id) do nothing;

delete from public.facilities
where stop_id = (select id from public.stops where slug = 'yalikavak');

insert into public.facilities (
  stop_id,
  facility_type,
  available,
  is_municipal,
  name_key,
  notes_key,
  distance_km,
  metadata
)
select stop.id, facility_type, available, is_municipal, name_key, notes_key, distance_km, metadata
from public.stops as stop
cross join (
  values
    (
      'municipality',
      true,
      false,
      null,
      'content.stops.yalikavak.municipality',
      null::numeric,
      '{"wc":true,"shower":false,"potableWater":false,"wasteBins":true}'::jsonb
    ),
    (
      'market',
      true,
      false,
      'content.stops.yalikavak.marketName',
      'content.stops.yalikavak.marketNotes',
      1::numeric,
      '{}'::jsonb
    ),
    (
      'fuel',
      true,
      false,
      'content.stops.yalikavak.fuelName',
      'content.stops.yalikavak.fuelNotes',
      3::numeric,
      '{}'::jsonb
    ),
    (
      'water',
      false,
      false,
      'content.stops.yalikavak.waterName',
      'content.stops.yalikavak.waterNotes',
      null::numeric,
      '{}'::jsonb
    ),
    (
      'dump',
      false,
      false,
      'content.stops.yalikavak.dumpName',
      'content.stops.yalikavak.dumpNotes',
      null::numeric,
      '{}'::jsonb
    )
) as data(facility_type, available, is_municipal, name_key, notes_key, distance_km, metadata)
where stop.slug = 'yalikavak';

delete from public.tips
where stop_id = (select id from public.stops where slug = 'yalikavak');

insert into public.tips (
  stop_id,
  tip_type,
  subject_key,
  body_key,
  lens_key,
  timing_key,
  settings_key,
  position
)
select stop.id,
       'photo',
       'content.stops.yalikavak.luna.subject',
       'content.stops.yalikavak.luna.note',
       'content.stops.yalikavak.luna.lens',
       'content.stops.yalikavak.luna.timing',
       'content.stops.yalikavak.luna.settings',
       1
from public.stops as stop
where stop.slug = 'yalikavak';

delete from public.warnings
where stop_id = (select id from public.stops where slug = 'yalikavak');

insert into public.warnings (stop_id, warning_type, severity, body_key, position)
select stop.id, data.warning_type, data.severity, data.body_key, data.position
from public.stops as stop
cross join (
  values
    ('road', 'warning', 'content.stops.yalikavak.warning1', 1),
    ('logistics', 'info', 'content.stops.yalikavak.warning2', 2)
) as data(warning_type, severity, body_key, position)
where stop.slug = 'yalikavak';

update public.routes
set total_distance_km = 1479,
    updated_at = now()
where slug = 'izmir-lara';

notify pgrst, 'reload schema';

commit;
