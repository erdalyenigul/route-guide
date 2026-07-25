-- Practical navigation targets for a 15 m³ Fiat Ducato motorcaravan.
-- Stops remain sightseeing regions; the recommended camping spot is the
-- destination used by the in-app navigation action.

update public.camping_spots
set recommended = false, updated_at = now()
where stop_id in (
  select id from public.stops
  where slug in ('guzelcamli', 'bafa', 'gumusluk', 'akyarlar', 'akbuk', 'karaot', 'faralya', 'kas', 'cirali')
);

insert into public.camping_spots (
  stop_id, slug, content_key, title_key, spot_type, latitude, longitude,
  overview_key, price_note_key, access_note_key, rating, recommended,
  position, verification_status, source_note, last_verified_at
)
select
  stops.id, data.spot_slug, data.content_key, data.content_key || '.title',
  'paid', data.latitude, data.longitude, data.content_key || '.overview',
  data.content_key || '.price', data.content_key || '.access', 0, data.recommended,
  10, data.verification_status, data.source_note, '2026-07-25T00:00:00+03:00'
from (
  values
    ('guzelcamli', 'hayal-bahcesi-caravan', 'content.stops.guzelcamli.spots.hayalBahcesi', 37.713018::double precision, 27.217319::double precision, true, 'verified', 'Operator website confirms a caravan area at Güzelçamlı, Milli Park Cd. No:34; coordinates cross-checked against the published street address.'),
    ('bafa', 'selenes-garden-camping', 'content.stops.bafaLake.spots.selenes', 37.501508::double precision, 27.523673::double precision, false, 'partially_verified', 'Operator camping page confirms legal garden camping and states that wild camping on the protected shore is prohibited. A Ducato vehicle pitch must be confirmed by phone.'),
    ('gumusluk', 'mandi-camping', 'content.stops.gumusluk.spots.mandi', 37.0789787::double precision, 27.2487318::double precision, true, 'verified', 'Operator website confirms caravan infrastructure, security and proximity to Gümüşlük; coordinates resolved from its official Google Maps link.'),
    ('akyarlar', 'cuce-camping-akyarlar', 'content.stops.akyarlar.spots.cuce', 36.9726155::double precision, 27.2988613::double precision, true, 'verified', 'Operator website and camping rules confirm a managed Akyarlar caravan park and services; coordinates cross-checked from its embedded map.'),
    ('akbuk', 'pasali-camping-caravan', 'content.stops.akbuk.spots.pasali', 37.0344522::double precision, 28.0990632::double precision, true, 'verified', 'Operator website explicitly accepts guests with their own caravans at Akbük shore; coordinates cross-checked with a current campground listing.'),
    ('karaot', 'onur-camping-caravan', 'content.stops.karaotBeach.spots.onur', 36.7525528::double precision, 29.0731861::double precision, true, 'verified', 'Current listings identify Onur Camping as a seaside caravan area at Yanıklar, Deniz Sokak No:3; coordinates cross-checked with the published caravan route point.'),
    ('faralya', 'aydede-camping-oludeniz', 'content.stops.faralya.spots.aydede', 36.5617::double precision, 29.1356::double precision, true, 'verified', 'Operator website publishes coordinates, dedicated caravan rates and services. Chosen as a safe base instead of routing a large Ducato onto Faralya cliff roads.'),
    ('kas', 'kas-camping', 'content.stops.kas.spots.kasCamp', 36.1993892::double precision, 29.6325869::double precision, true, 'verified', 'Kaş District Governor lists Kaş Camping; operator confirms caravan pitches and seaside access; coordinates cross-checked against the published address.'),
    ('cirali', 'olympos-222-camping-van', 'content.stops.cirali.spots.olympos222', 36.4200193::double precision, 30.4738084::double precision, true, 'verified', 'Operator website explicitly documents caravan infrastructure, electricity and clean-water connections; coordinates cross-checked against the published address.')
) as data(stop_slug, spot_slug, content_key, latitude, longitude, recommended, verification_status, source_note)
join public.stops as stops on stops.slug = data.stop_slug
on conflict (slug) do update set
  stop_id = excluded.stop_id,
  content_key = excluded.content_key,
  title_key = excluded.title_key,
  spot_type = excluded.spot_type,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  overview_key = excluded.overview_key,
  price_note_key = excluded.price_note_key,
  access_note_key = excluded.access_note_key,
  recommended = excluded.recommended,
  position = excluded.position,
  verification_status = excluded.verification_status,
  source_note = excluded.source_note,
  last_verified_at = excluded.last_verified_at,
  updated_at = now();
