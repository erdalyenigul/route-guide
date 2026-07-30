-- Make Gümüşlük an evening visit based at Mandi Camping, then add Geriş as
-- the cautious one-night freecamp candidate before central Bodrum.

begin;

update public.stops
set overview_key = 'content.stops.gumusluk.overview',
    why_visit_key = 'content.stops.gumusluk.whyVisit',
    ducato_accessibility = 'caution',
    ducato_access = 'caution',
    road_surface = 'asphalt',
    road_width = 'narrow coastal streets',
    turnaround_possible = false,
    last_mile_note_key = 'content.stops.gumusluk.ops.lastMile',
    supply_note_key = 'content.stops.gumusluk.ops.supply',
    decision_summary_key = 'content.stops.gumusluk.ops.decision',
    verification_status = 'partially_verified',
    source_note = 'Gümüşlük is an evening visit; central overnight parking is not recommended. Mandi Camping is the planned serviced overnight base for this stage.',
    last_verified_at = '2026-07-30T00:00:00+03:00',
    updated_at = now()
where slug = 'gumusluk';

update public.camping_spots
set title_key = 'content.stops.gumusluk.spots.mandi.title',
    overview_key = 'content.stops.gumusluk.spots.mandi.overview',
    price_note_key = 'content.stops.gumusluk.spots.mandi.price',
    access_note_key = 'content.stops.gumusluk.spots.mandi.access',
    recommended = true,
    ducato_access = 'comfortable',
    overnight_status = 'allowed',
    water_available = true,
    toilet_available = true,
    shower_available = true,
    waste_available = true,
    verification_status = 'verified',
    source_note = 'Mandi Camping publishes caravan services including fresh water, grey-water drainage and cassette disposal; its facilities page lists showers and WC. Confirm current availability and reserve before arrival. Source: https://mandicamping.com/',
    last_verified_at = '2026-07-30T00:00:00+03:00',
    updated_at = now()
where slug = 'mandi-camping';

insert into public.stops (
  id, slug, content_key, title_key, region_key, overview_key, why_visit_key,
  latitude, longitude, sea_score, silence_score, internet_score, safety_score,
  solar_suitability, shade, crowd_level, ducato_accessibility,
  drone_suitability, best_sunrise_key, best_sunset_key, verification_status,
  source_note, last_verified_at, ducato_access, road_surface, road_width,
  steep_grade, hairpins, cliff_exposure, guardrails, turnaround_possible,
  last_mile_note_key, supply_note_key, decision_summary_key
)
values (
  '79300000-0000-4000-8000-000000000002'::uuid,
  'geris-piknik', 'content.stops.gerisPiknik',
  'content.stops.gerisPiknik.title', 'content.stops.gerisPiknik.region',
  'content.stops.gerisPiknik.overview', 'content.stops.gerisPiknik.whyVisit',
  37.0796, 27.2771, 3, 4, null, 3, 'medium', 'medium', 'medium', 'caution',
  'caution', 'content.stops.gerisPiknik.sunrise',
  'content.stops.gerisPiknik.sunset', 'partially_verified',
  'Community listings describe Geriş as a small sea-view camping or picnic area with capacity around 20 vehicles. Current access, signs and overnight rules must be checked on arrival; no services are guaranteed.',
  '2026-07-30T00:00:00+03:00', 'caution', 'mixed', 'local access road',
  null, null, null, null, null, 'content.stops.gerisPiknik.ops.lastMile',
  'content.stops.gerisPiknik.ops.supply', 'content.stops.gerisPiknik.ops.decision'
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

insert into public.camping_spots (
  id, stop_id, slug, content_key, title_key, spot_type, latitude, longitude,
  overview_key, price_note_key, access_note_key, rating, recommended, position,
  verification_status, source_note, last_verified_at, ducato_access,
  overnight_status, beachfront, sea_view, capacity_vehicles, water_available,
  toilet_available, shower_available, waste_available, night_quiet,
  safety_note_key
)
select '79310000-0000-4000-8000-000000000002'::uuid, stop.id,
       'geris-piknik-freecamp', 'content.spots.gerisPiknikFree',
       'content.spots.gerisPiknikFree.title', 'freecamp', 37.0796, 27.2771,
       'content.spots.gerisPiknikFree.overview', 'content.prices.arrivalCheckFree',
       'content.spots.gerisPiknikFree.access', 3.8, true, 0,
       'partially_verified',
       'Community listings describe a sea-view camping/picnic area with approximate capacity of 20 vehicles. This is not official overnight permission; signs and local rules control on arrival.',
       '2026-07-30T00:00:00+03:00', 'caution', 'tolerated', null, true, 20,
       false, false, false, false, true, 'content.spots.gerisPiknikFree.safety'
from public.stops as stop
where stop.slug = 'geris-piknik'
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
    capacity_vehicles = excluded.capacity_vehicles,
    water_available = excluded.water_available,
    toilet_available = excluded.toilet_available,
    shower_available = excluded.shower_available,
    waste_available = excluded.waste_available,
    night_quiet = excluded.night_quiet,
    safety_note_key = excluded.safety_note_key,
    updated_at = now();

-- Rebuild the active route order without deleting the optional Akyarlar stop
-- content itself. The current plan goes directly from Geriş to Bodrum centre.
delete from public.route_stops as route_stop
using public.routes as route, public.stops as stop
where route_stop.route_id = route.id
  and route_stop.stop_id = stop.id
  and route.slug = 'izmir-lara'
  and stop.slug = 'akyarlar';

update public.route_stops as route_stop
set position = position + 1000
from public.routes as route
where route_stop.route_id = route.id
  and route.slug = 'izmir-lara';

insert into public.route_stops (
  route_id, stop_id, position, recommended_nights, min_nights, max_nights,
  driving_distance_km, drive_time_minutes, initial_status
)
select route.id, stop.id, 1999, 1, 0, 1, 10, 17, 'planned'
from public.routes as route
join public.stops as stop on stop.slug = 'geris-piknik'
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
    driving_distance_km = data.distance_km,
    drive_time_minutes = data.drive_minutes
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
    ('geris-piknik', 8, 1, 0, 1, 10, 17),
    ('bodrum-center', 9, 1, 0, 1, 22, 28),
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
) as data(slug, position, recommended_nights, min_nights, max_nights, distance_km, drive_minutes)
join public.stops as stop on stop.slug = data.slug
where route_stop.route_id = route.id
  and route.slug = 'izmir-lara'
  and route_stop.stop_id = stop.id;

insert into public.trip_stop_states (route_id, stop_id, status)
select route.id, stop.id, 'planned'
from public.routes as route
join public.stops as stop on stop.slug = 'geris-piknik'
where route.slug = 'izmir-lara'
on conflict (route_id, stop_id) do nothing;

delete from public.warnings
where stop_id in (select id from public.stops where slug in ('gumusluk', 'geris-piknik'));

insert into public.warnings (
  stop_id, warning_type, severity, body_key, position,
  verification_status, source_note, last_verified_at
)
select stop.id, data.warning_type, data.severity, data.body_key, data.position,
       data.verification_status, data.source_note,
       '2026-07-30T00:00:00+03:00'::timestamptz
from public.stops as stop
join (
  values
    ('gumusluk', 'traffic', 'warning', 'content.stops.gumusluk.warning1', 0, 'partially_verified', 'Narrow central waterfront approach; use a separate parking decision.'),
    ('gumusluk', 'overnight', 'warning', 'content.stops.gumusluk.warning2', 1, 'partially_verified', 'Central shore parking is not treated as overnight permission.'),
    ('geris-piknik', 'access', 'warning', 'content.stops.gerisPiknik.warning1', 0, 'partially_verified', 'Capacity is community-listed and must be rechecked on arrival.'),
    ('geris-piknik', 'overnight', 'warning', 'content.stops.gerisPiknik.warning2', 1, 'partially_verified', 'Current signs and local rules control overnight use.')
) as data(slug, warning_type, severity, body_key, position, verification_status, source_note)
  on stop.slug = data.slug;

delete from public.tips
where stop_id = (select id from public.stops where slug = 'geris-piknik');

insert into public.tips (
  stop_id, tip_type, subject_key, body_key, lens_key, timing_key,
  settings_key, position, verification_status, source_note, last_verified_at
)
select stop.id, 'photo', 'content.stops.gerisPiknik.luna.subject',
       'content.stops.gerisPiknik.luna.note', 'content.stops.gerisPiknik.luna.lens',
       'content.stops.gerisPiknik.luna.timing', 'content.stops.gerisPiknik.luna.settings',
       0, 'partially_verified', 'Photography suggestion based on the sea-view position.',
       '2026-07-30T00:00:00+03:00'
from public.stops as stop
where stop.slug = 'geris-piknik';

update public.routes
set total_distance_km = 1484,
    updated_at = now()
where slug = 'izmir-lara';

notify pgrst, 'reload schema';

commit;
