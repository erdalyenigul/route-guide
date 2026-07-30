-- Split the Mazı stage into two practical stops:
-- 1. Existing "mazi" is preserved and repurposed as Çakıllı Plajı so prior
--    photos, notes and trip state linked to the stop are not lost.
-- 2. Aşağı Mazı Ilgın Koyu is inserted after Çakıllı as a separate
--    arrival-check freecamp candidate.

begin;

update public.stops
set content_key = 'content.stops.mazi',
    title_key = 'content.stops.mazi.title',
    region_key = 'content.stops.mazi.region',
    overview_key = 'content.stops.mazi.overview',
    why_visit_key = 'content.stops.mazi.whyVisit',
    latitude = 37.001543,
    longitude = 27.728339,
    sea_score = 5,
    silence_score = 5,
    internet_score = 2,
    safety_score = 3,
    solar_suitability = 'high',
    shade = 'high',
    crowd_level = 'medium',
    ducato_accessibility = 'caution',
    drone_suitability = 'good',
    best_sunrise_key = 'content.stops.mazi.sunrise',
    best_sunset_key = 'content.stops.mazi.sunset',
    verification_status = 'partially_verified',
    source_note = 'Çakıllı/Çakıllıyalı is one of the Mazı coves described in public travel guides. It is used here as an arrival-check natural stop, not as a confirmed legal campsite. Sources: https://bodrumguru.com/mazikoy-rehberi/ | https://www.bizevdeyokuz.com/en/bodrum-beaches/',
    last_verified_at = '2026-07-30T00:00:00+03:00',
    ducato_access = 'caution',
    road_surface = 'asphalt then variable cove approach',
    road_width = 'narrow final approach',
    steep_grade = true,
    hairpins = true,
    cliff_exposure = false,
    guardrails = false,
    turnaround_possible = null,
    last_mile_note_key = 'content.stops.mazi.ops.lastMile',
    supply_note_key = 'content.stops.mazi.ops.supply',
    decision_summary_key = 'content.stops.mazi.ops.decision',
    updated_at = now()
where slug = 'mazi';

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
  '79100000-0000-4000-8000-000000000001'::uuid,
  'ilgin-koyu',
  'content.stops.ilginKoyu',
  'content.stops.ilginKoyu.title',
  'content.stops.ilginKoyu.region',
  'content.stops.ilginKoyu.overview',
  'content.stops.ilginKoyu.whyVisit',
  37.0010509,
  27.7560274,
  5,
  5,
  2,
  3,
  'high',
  'medium',
  'low',
  'caution',
  'good',
  'content.stops.ilginKoyu.sunrise',
  'content.stops.ilginKoyu.sunset',
  'partially_verified',
  'Destination, name, address and coordinates supplied by the route owner: Aşağı Mazı Ilgın Koyu, Unnamed Road, Mazıköy, 48440 Bodrum/Muğla, 37.0010509, 27.7560274. Public camping records describe Ilgın Koyu as a natural camping candidate, but not as guaranteed overnight permission. Sources: https://dogadakiler.com/Kamp-Alanlari/Mugla-Kamp-Alanlari/Asagi-Mazi-Ilgin-Koyu/ | https://www.campalow.com/kamp-alani/ilgin-koyu-kamp-alani',
  '2026-07-30T00:00:00+03:00',
  'caution',
  'asphalt then variable coastal surface',
  'narrow final approach',
  true,
  true,
  false,
  false,
  null,
  'content.stops.ilginKoyu.ops.lastMile',
  'content.stops.ilginKoyu.ops.supply',
  'content.stops.ilginKoyu.ops.decision'
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

update public.route_stops as rs
set position = position + 1000
from public.routes as r
where rs.route_id = r.id and r.slug = 'izmir-lara';

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
select r.id, s.id, 1999, 1, 1, 1, 5, 12, 'planned'
from public.routes as r
join public.stops as s on s.slug = 'ilgin-koyu'
where r.slug = 'izmir-lara'
on conflict (route_id, stop_id) do update
set position = 1999,
    recommended_nights = excluded.recommended_nights,
    min_nights = excluded.min_nights,
    max_nights = excluded.max_nights,
    driving_distance_km = excluded.driving_distance_km,
    drive_time_minutes = excluded.drive_time_minutes,
    initial_status = excluded.initial_status;

update public.route_stops as rs
set position = data.position,
    recommended_nights = data.recommended_nights,
    min_nights = data.min_nights,
    max_nights = data.max_nights,
    driving_distance_km = data.driving_distance_km,
    drive_time_minutes = data.drive_time_minutes
from public.routes as r
cross join (
  values
    ('izmir', 0, 1, 1, 1, 0, 0),
    ('guzelcamli', 1, 2, 1, 2, 126, 95),
    ('bafa', 2, 1, 1, 1, 79, 80),
    ('izmir-restart', 3, 4, 1, 14, 180, 170),
    ('cesme-palmiye', 4, 1, 1, 1, 95, 80),
    ('torba', 5, 1, 1, 1, 320, 250),
    ('gumusluk', 6, 2, 1, 2, 28, 40),
    ('akyarlar', 7, 1, 1, 1, 17, 25),
    ('mazi', 8, 1, 1, 1, 73, 85),
    ('ilgin-koyu', 9, 1, 1, 1, 5, 12),
    ('akbuk', 10, 2, 1, 2, 44, 60),
    ('dalyan', 11, 2, 1, 2, 98, 120),
    ('karaot', 12, 1, 1, 1, 58, 70),
    ('faralya', 13, 2, 1, 2, 47, 80),
    ('patara', 14, 1, 1, 1, 59, 112),
    ('kas', 15, 2, 1, 2, 42, 54),
    ('cirali', 16, 2, 1, 2, 128, 160),
    ('lara', 17, 1, 1, 14, 88, 105)
) as data(slug, position, recommended_nights, min_nights, max_nights, driving_distance_km, drive_time_minutes)
join public.stops as s on s.slug = data.slug
where rs.route_id = r.id
  and r.slug = 'izmir-lara'
  and rs.stop_id = s.id;

insert into public.trip_stop_states (route_id, stop_id, status)
select r.id, s.id, 'planned'
from public.routes as r
join public.stops as s on s.slug = 'ilgin-koyu'
where r.slug = 'izmir-lara'
on conflict (route_id, stop_id) do nothing;

delete from public.camping_spots
where slug = 'inceyali-wildcamp'
  and exists (
    select 1 from public.camping_spots where slug = 'cakilli-beach-wildcamp'
  );

update public.camping_spots
set slug = 'cakilli-beach-wildcamp',
    content_key = 'content.spots.cakilliBeach',
    title_key = 'content.spots.cakilliBeach.title',
    overview_key = 'content.spots.cakilliBeach.overview',
    access_note_key = 'content.spots.cakilliBeach.access',
    safety_note_key = 'content.spots.cakilliBeach.safety',
    updated_at = now()
where slug = 'inceyali-wildcamp';

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
  '77000000-0000-4000-8000-000000000004'::uuid,
  s.id,
  'cakilli-beach-wildcamp',
  'content.spots.cakilliBeach',
  'content.spots.cakilliBeach.title',
  'freecamp',
  37.001543,
  27.728339,
  'content.spots.cakilliBeach.overview',
  'content.prices.arrivalCheckFree',
  'content.spots.cakilliBeach.access',
  4.3,
  true,
  0,
  'partially_verified',
  'Çakıllı is used as an arrival-check natural shore candidate within the Mazı cove area. This record does not assert legal overnight permission.',
  '2026-07-30T00:00:00+03:00',
  'caution',
  'restricted',
  null,
  null,
  null,
  false,
  false,
  false,
  false,
  'unknown',
  'medium',
  null,
  'content.spots.cakilliBeach.safety'
from public.stops as s
where s.slug = 'mazi'
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
    water_available = excluded.water_available,
    toilet_available = excluded.toilet_available,
    shower_available = excluded.shower_available,
    waste_available = excluded.waste_available,
    mobile_signal = excluded.mobile_signal,
    crowd_level = excluded.crowd_level,
    night_quiet = excluded.night_quiet,
    safety_note_key = excluded.safety_note_key,
    updated_at = now();

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
  '79100000-0000-4000-8000-000000000002'::uuid,
  s.id,
  'ilgin-koyu-wildcamp',
  'content.spots.ilginKoyuWild',
  'content.spots.ilginKoyuWild.title',
  'freecamp',
  37.0010509,
  27.7560274,
  'content.spots.ilginKoyuWild.overview',
  'content.prices.arrivalCheckFree',
  'content.spots.ilginKoyuWild.access',
  4.4,
  true,
  0,
  'partially_verified',
  'Coordinates and address supplied by the route owner. Public camping records support it as a natural camping candidate, not as guaranteed legal overnight permission.',
  '2026-07-30T00:00:00+03:00',
  'caution',
  'restricted',
  true,
  true,
  20,
  false,
  false,
  false,
  false,
  'unknown',
  'low',
  true,
  'content.spots.ilginKoyuWild.safety'
from public.stops as s
where s.slug = 'ilgin-koyu'
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
where stop_id in (select id from public.stops where slug in ('mazi', 'ilgin-koyu'));

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
join (
  values
    ('79100000-0000-4000-8000-000000000010'::uuid, 'mazi', null::uuid, 'municipality', false, null::text, 'content.stops.mazi.municipality', 0::numeric, '{"wc":false,"shower":false,"potableWater":false,"wasteBins":true}'::jsonb),
    ('79100000-0000-4000-8000-000000000011'::uuid, 'mazi', null::uuid, 'market', true, 'content.stops.mazi.marketName', 'content.stops.mazi.marketNotes', 4::numeric, '{}'::jsonb),
    ('79100000-0000-4000-8000-000000000012'::uuid, 'mazi', null::uuid, 'fuel', true, 'content.stops.mazi.fuelName', 'content.stops.mazi.fuelNotes', 27::numeric, '{}'::jsonb),
    ('79100000-0000-4000-8000-000000000013'::uuid, 'mazi', null::uuid, 'water', false, 'content.stops.mazi.waterName', 'content.stops.mazi.waterNotes', 0::numeric, '{}'::jsonb),
    ('79100000-0000-4000-8000-000000000014'::uuid, 'mazi', null::uuid, 'dump', false, 'content.stops.mazi.dumpName', 'content.stops.mazi.dumpNotes', 0::numeric, '{}'::jsonb),
    ('79100000-0000-4000-8000-000000000020'::uuid, 'ilgin-koyu', null::uuid, 'municipality', false, null::text, 'content.stops.ilginKoyu.municipality', 0::numeric, '{"wc":false,"shower":false,"potableWater":false,"wasteBins":false}'::jsonb),
    ('79100000-0000-4000-8000-000000000021'::uuid, 'ilgin-koyu', null::uuid, 'market', true, 'content.stops.ilginKoyu.marketName', 'content.stops.ilginKoyu.marketNotes', 5::numeric, '{}'::jsonb),
    ('79100000-0000-4000-8000-000000000022'::uuid, 'ilgin-koyu', null::uuid, 'fuel', true, 'content.stops.ilginKoyu.fuelName', 'content.stops.ilginKoyu.fuelNotes', 28::numeric, '{}'::jsonb),
    ('79100000-0000-4000-8000-000000000023'::uuid, 'ilgin-koyu', null::uuid, 'water', false, 'content.stops.ilginKoyu.waterName', 'content.stops.ilginKoyu.waterNotes', 0::numeric, '{}'::jsonb),
    ('79100000-0000-4000-8000-000000000024'::uuid, 'ilgin-koyu', null::uuid, 'dump', false, 'content.stops.ilginKoyu.dumpName', 'content.stops.ilginKoyu.dumpNotes', 0::numeric, '{}'::jsonb)
) as data(id, slug, spot_id, facility_type, available, name_key, notes_key, distance_km, metadata)
  on data.slug = s.slug;

delete from public.tips
where stop_id in (select id from public.stops where slug in ('mazi', 'ilgin-koyu'));

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
select data.id, s.id, 'photography', data.subject_key, data.body_key,
  data.lens_key, data.timing_key, data.settings_key, 0
from public.stops as s
join (
  values
    ('79100000-0000-4000-8000-000000000030'::uuid, 'mazi', 'content.stops.mazi.luna.subject', 'content.stops.mazi.luna.note', 'content.stops.mazi.luna.lens', 'content.stops.mazi.luna.timing', 'content.stops.mazi.luna.settings'),
    ('79100000-0000-4000-8000-000000000031'::uuid, 'ilgin-koyu', 'content.stops.ilginKoyu.luna.subject', 'content.stops.ilginKoyu.luna.note', 'content.stops.ilginKoyu.luna.lens', 'content.stops.ilginKoyu.luna.timing', 'content.stops.ilginKoyu.luna.settings')
) as data(id, slug, subject_key, body_key, lens_key, timing_key, settings_key)
  on data.slug = s.slug;

delete from public.warnings
where stop_id in (select id from public.stops where slug in ('mazi', 'ilgin-koyu'));

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
join (
  values
    ('79100000-0000-4000-8000-000000000040'::uuid, 'mazi', 'road', 'warning', 'content.stops.mazi.warning1', 0, 'partially_verified', 'Mazı cove roads vary by descent; check width, surface and turnaround in daylight.'),
    ('79100000-0000-4000-8000-000000000041'::uuid, 'mazi', 'overnight', 'warning', 'content.stops.mazi.warning2', 1, 'partially_verified', 'Natural cove candidate only; current signs and local instructions override this plan.'),
    ('79100000-0000-4000-8000-000000000042'::uuid, 'ilgin-koyu', 'road', 'warning', 'content.stops.ilginKoyu.warning1', 0, 'partially_verified', 'Coordinates supplied by route owner; final access still requires daylight Ducato check.'),
    ('79100000-0000-4000-8000-000000000043'::uuid, 'ilgin-koyu', 'overnight', 'warning', 'content.stops.ilginKoyu.warning2', 1, 'partially_verified', 'Public records support a natural camping candidate, not a guaranteed legal permit.')
) as data(id, slug, warning_type, severity, body_key, position, verification_status, source_note)
  on data.slug = s.slug;

update public.routes
set total_distance_km = 1487,
    updated_at = now()
where slug = 'izmir-lara';

notify pgrst, 'reload schema';

commit;
