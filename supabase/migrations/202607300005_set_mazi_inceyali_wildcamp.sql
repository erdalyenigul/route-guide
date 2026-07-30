-- Make the user-selected İnceyalı Google Maps pin the Mazı navigation target.
-- The pin identifies the destination, not a legal overnight permit. Current
-- signs, local instructions and Ducato access must be checked on arrival.

begin;

delete from public.camping_spots
where slug in ('mazi-upper-terrace', 'mazi-family-camp');

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
  stops.id,
  'inceyali-wildcamp',
  'content.spots.maziInceyali',
  'content.spots.maziInceyali.title',
  'freecamp',
  37.001543,
  27.728339,
  'content.spots.maziInceyali.overview',
  'content.prices.arrivalCheckFree',
  'content.spots.maziInceyali.access',
  4.3,
  true,
  20,
  'partially_verified',
  'Destination supplied by the route owner as a Google Maps pin: https://maps.app.goo.gl/JyZL1acNEd3SvTj77. The pin is not an official overnight permit; current signs, local instructions and 15 m³ Ducato access must be checked on arrival.',
  '2026-07-30T00:00:00+03:00',
  'caution',
  'tolerated',
  null,
  null,
  null,
  false,
  false,
  false,
  false,
  'unknown',
  'unknown',
  null,
  'content.spots.maziInceyali.safety'
from public.stops
where slug = 'mazi'
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

update public.stops
set latitude = 37.001543,
    longitude = 27.728339,
    decision_summary_key = 'content.stops.mazi.ops.decision',
    verification_status = 'partially_verified',
    source_note = 'Mazı navigation uses the route owner supplied Google Maps pin at 37.001543, 27.728339 in İnceyalı. The pin is not an official overnight permit and requires an arrival check.',
    last_verified_at = '2026-07-30T00:00:00+03:00',
    updated_at = now()
where slug = 'mazi';

commit;
