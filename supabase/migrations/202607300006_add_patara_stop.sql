-- Add Patara between Faralya and Kaş as a one-night, free/wild-first stage.
-- The dune-overlook record is a community-reported arrival-check candidate,
-- not a declaration of legal overnight permission.
-- Sources checked 2026-07-30:
-- https://www.kas.gov.tr/plajlar
-- https://www.park4night.com/en/place/75720
-- https://www.camperonline.it/sosta-camper/aree-di-sosta/turchia/parcheggio-patara-beach/27355

begin;

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
  '79000000-0000-4000-8000-000000000001'::uuid,
  'patara',
  'content.stops.patara',
  'content.stops.patara.title',
  'content.stops.patara.region',
  'content.stops.patara.overview',
  'content.stops.patara.whyVisit',
  36.2704,
  29.3034,
  5,
  4,
  4,
  3,
  'excellent',
  'medium',
  'medium',
  'caution',
  'difficult',
  'content.stops.patara.sunrise',
  'content.stops.patara.sunset',
  'partially_verified',
  'Patara protected-coast status is documented by Kaş District Governor. Coordinates, free use and motorhome access are supported by 2024–2026 community reports, but overnight permission is not guaranteed. https://www.kas.gov.tr/plajlar | https://www.park4night.com/en/place/75720 | https://www.camperonline.it/sosta-camper/aree-di-sosta/turchia/parcheggio-patara-beach/27355',
  '2026-07-30T00:00:00+03:00',
  'caution',
  'asphalt then rough track',
  'narrow final approach',
  true,
  true,
  false,
  false,
  true,
  'content.stops.patara.ops.lastMile',
  'content.stops.patara.ops.supply',
  'content.stops.patara.ops.decision'
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

do $$
begin
  if not exists (
    select 1
    from public.route_stops as rs
    join public.routes as r on r.id = rs.route_id
    join public.stops as s on s.id = rs.stop_id
    where r.slug = 'izmir-lara' and s.slug = 'patara'
  ) then
    update public.route_stops as rs
    set position = position + 100
    from public.routes as r
    where rs.route_id = r.id and r.slug = 'izmir-lara' and position >= 13;

    update public.route_stops as rs
    set position = position - 99
    from public.routes as r
    where rs.route_id = r.id and r.slug = 'izmir-lara' and position >= 113;
  end if;
end $$;

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
select r.id, s.id, 13, 1, 1, 1, 59, 112, 'planned'
from public.routes as r
join public.stops as s on s.slug = 'patara'
where r.slug = 'izmir-lara'
on conflict (route_id, stop_id) do update
set position = excluded.position,
    recommended_nights = excluded.recommended_nights,
    min_nights = excluded.min_nights,
    max_nights = excluded.max_nights,
    driving_distance_km = excluded.driving_distance_km,
    drive_time_minutes = excluded.drive_time_minutes,
    initial_status = excluded.initial_status;

update public.route_stops as rs
set driving_distance_km = 42,
    drive_time_minutes = 54
from public.routes as r, public.stops as s
where rs.route_id = r.id
  and rs.stop_id = s.id
  and r.slug = 'izmir-lara'
  and s.slug = 'kas';

insert into public.trip_stop_states (route_id, stop_id, status)
select r.id, s.id, 'planned'
from public.routes as r
join public.stops as s on s.slug = 'patara'
where r.slug = 'izmir-lara'
on conflict (route_id, stop_id) do nothing;

insert into public.camping_spots (
  id,
  stop_id,
  slug,
  content_key,
  title_key,
  spot_type,
  latitude,
  longitude,
  overview_key,
  price_note_key,
  access_note_key,
  rating,
  recommended,
  position,
  verification_status,
  source_note,
  last_verified_at,
  ducato_access,
  overnight_status,
  beachfront,
  sea_view,
  distance_to_sea_m,
  ground_surface,
  level_ground,
  shade_available,
  water_available,
  toilet_available,
  shower_available,
  waste_available,
  mobile_signal,
  crowd_level,
  night_quiet,
  safety_note_key
)
select
  '79000000-0000-4000-8000-000000000002'::uuid,
  s.id,
  'patara-dunes-wildcamp',
  'content.spots.pataraDunes',
  'content.spots.pataraDunes.title',
  'freecamp',
  36.2704,
  29.3034,
  'content.spots.pataraDunes.overview',
  'content.prices.arrivalCheckFree',
  'content.spots.pataraDunes.access',
  4.1,
  true,
  0,
  'partially_verified',
  'Recent community reports describe free parking, good signal, shade and motorhome access. Contradictory historic enforcement and protected-coast rules mean overnight use must be checked on arrival. https://www.park4night.com/en/place/75720 | https://www.camperonline.it/sosta-camper/aree-di-sosta/turchia/parcheggio-patara-beach/27355',
  '2026-07-30T00:00:00+03:00',
  'caution',
  'restricted',
  false,
  true,
  null,
  'rough track and firm clearings',
  null,
  true,
  false,
  false,
  false,
  false,
  'good',
  'medium',
  true,
  'content.spots.pataraDunes.safety'
from public.stops as s
where s.slug = 'patara'
on conflict (slug) do update
set stop_id = excluded.stop_id,
    content_key = excluded.content_key,
    title_key = excluded.title_key,
    spot_type = excluded.spot_type,
    latitude = excluded.latitude,
    longitude = excluded.longitude,
    overview_key = excluded.overview_key,
    price_note_key = excluded.price_note_key,
    access_note_key = excluded.access_note_key,
    rating = excluded.rating,
    recommended = excluded.recommended,
    position = excluded.position,
    verification_status = excluded.verification_status,
    source_note = excluded.source_note,
    last_verified_at = excluded.last_verified_at,
    ducato_access = excluded.ducato_access,
    overnight_status = excluded.overnight_status,
    beachfront = excluded.beachfront,
    sea_view = excluded.sea_view,
    distance_to_sea_m = excluded.distance_to_sea_m,
    ground_surface = excluded.ground_surface,
    level_ground = excluded.level_ground,
    shade_available = excluded.shade_available,
    water_available = excluded.water_available,
    toilet_available = excluded.toilet_available,
    shower_available = excluded.shower_available,
    waste_available = excluded.waste_available,
    mobile_signal = excluded.mobile_signal,
    crowd_level = excluded.crowd_level,
    night_quiet = excluded.night_quiet,
    safety_note_key = excluded.safety_note_key,
    updated_at = now();

delete from public.facilities
where stop_id = (select id from public.stops where slug = 'patara');

insert into public.facilities (
  id,
  stop_id,
  camping_spot_id,
  facility_type,
  available,
  is_municipal,
  name_key,
  notes_key,
  distance_km,
  metadata
)
select data.id, s.id, data.spot_id, data.facility_type, data.available,
  false, data.name_key, data.notes_key, data.distance_km, data.metadata
from public.stops as s
cross join (
  values
    ('79000000-0000-4000-8000-000000000010'::uuid, null::uuid, 'municipality', false, null::text, 'content.stops.patara.municipality', 0::numeric, '{"wc":false,"shower":false,"potableWater":false,"wasteBins":true}'::jsonb),
    ('79000000-0000-4000-8000-000000000011'::uuid, null::uuid, 'market', true, 'content.stops.patara.marketName', 'content.stops.patara.marketNotes', 4::numeric, '{}'::jsonb),
    ('79000000-0000-4000-8000-000000000012'::uuid, null::uuid, 'fuel', true, 'content.stops.patara.fuelName', 'content.stops.patara.fuelNotes', 14::numeric, '{}'::jsonb),
    ('79000000-0000-4000-8000-000000000013'::uuid, null::uuid, 'water', false, 'content.stops.patara.waterName', 'content.stops.patara.waterNotes', 0::numeric, '{}'::jsonb),
    ('79000000-0000-4000-8000-000000000014'::uuid, null::uuid, 'dump', false, 'content.stops.patara.dumpName', 'content.stops.patara.dumpNotes', 0::numeric, '{}'::jsonb),
    ('79000000-0000-4000-8000-000000000015'::uuid, '79000000-0000-4000-8000-000000000002'::uuid, 'waste_bins', true, 'content.facilities.wasteBins', null::text, 0::numeric, '{}'::jsonb),
    ('79000000-0000-4000-8000-000000000016'::uuid, '79000000-0000-4000-8000-000000000002'::uuid, 'shade', true, 'content.facilities.shade', null::text, 0::numeric, '{}'::jsonb)
) as data(id, spot_id, facility_type, available, name_key, notes_key, distance_km, metadata)
where s.slug = 'patara';

delete from public.tips
where stop_id = (select id from public.stops where slug = 'patara');

insert into public.tips (
  id,
  stop_id,
  tip_type,
  subject_key,
  body_key,
  lens_key,
  timing_key,
  settings_key,
  position
)
select
  '79000000-0000-4000-8000-000000000020'::uuid,
  s.id,
  'photography',
  'content.stops.patara.luna.subject',
  'content.stops.patara.luna.note',
  'content.stops.patara.luna.lens',
  'content.stops.patara.luna.timing',
  'content.stops.patara.luna.settings',
  0
from public.stops as s
where s.slug = 'patara';

delete from public.warnings
where stop_id = (select id from public.stops where slug = 'patara');

insert into public.warnings (
  id,
  stop_id,
  warning_type,
  severity,
  body_key,
  position,
  verification_status,
  source_note,
  last_verified_at
)
select data.id, s.id, data.warning_type, data.severity, data.body_key,
  data.position, data.verification_status, data.source_note,
  '2026-07-30T00:00:00+03:00'
from public.stops as s
cross join (
  values
    ('79000000-0000-4000-8000-000000000030'::uuid, 'protected_area', 'danger', 'content.stops.patara.warning1', 0, 'verified', 'Patara is a protected turtle-nesting beach; https://www.kas.gov.tr/plajlar'),
    ('79000000-0000-4000-8000-000000000031'::uuid, 'road', 'warning', 'content.stops.patara.warning2', 1, 'partially_verified', 'Multiple 2026 motorhome reports describe a rough, winding final approach and warn against the steep northern shortcut; https://www.park4night.com/en/place/75720')
) as data(id, warning_type, severity, body_key, position, verification_status, source_note)
where s.slug = 'patara';

update public.routes
set total_distance_km = 1463,
    updated_at = now()
where slug = 'izmir-lara';

notify pgrst, 'reload schema';

commit;
