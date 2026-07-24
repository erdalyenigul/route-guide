-- Verified destination context and conservative caravan planning data for the
-- ten stops after Bafa Lake. Visible copy remains in vue-i18n; this migration
-- stores translation keys, structured route values and a verification ledger.
--
-- Official sources reviewed 2026-07-24:
-- Bodrum / Gümüşlük / Akyarlar / Mazı:
-- https://mugla.ktb.gov.tr/TR-296341/nereye-gidilir.html
-- https://mugla.ktb.gov.tr/TR-296343/alisveris.html
-- Akbük / Gökova:
-- https://mugla.ktb.gov.tr/TR-296590/nereye-gidilir.html
-- https://mugla.ktb.gov.tr/Eklenti/104517,bodrumpdf.pdf?0=
-- Dalyan:
-- https://tvk.csb.gov.tr/koycegiz-dalyan-i-397
-- Karaot / Faralya:
-- https://tvk.csb.gov.tr/fethiye-gocek-i-391
-- https://mugla.ktb.gov.tr/TR-296365/nereye-gidilir.html
-- Kaş:
-- https://tvk.csb.gov.tr/haberler/kas-kekova-ozel-cevre-koruma-bolgesi-denizel-yonetim-plani-tamamlandi-14229
-- https://www.kas.bel.tr/cardDetay/limanagz%C4%B1-plaj%C4%B1-3619
-- Çıralı:
-- https://www.kemer.bel.tr/tr/tarihi-yerler/cirali-yanartas.html
-- https://antalya.ktb.gov.tr/TR-310897/olympos.html
-- Lara:
-- https://antalya.ktb.gov.tr/TR-68436/deniz-turizmi.html
--
-- Coordinates are approximate locality centres, never overnight pitches.
-- Distances and times are rounded OSRM planning estimates captured 2026-07-24;
-- they are not live navigation or traffic values.

begin;

update public.routes
set title_key = 'content.route.title',
    description_key = 'content.route.description',
    total_distance_km = 923
where slug = 'izmir-lara';

with stop_content(slug, content_name, latitude, longitude, source_note) as (
  values
    ('gumusluk','gumusluk',37.0537::double precision,27.2338::double precision,
      'Official Muğla tourism sources confirm Gümüşlük as a Bodrum destination and its Wednesday market. Operational caravan services, parking and network quality remain unverified.'),
    ('akyarlar','akyarlar',36.9729,27.2986,
      'Official Muğla tourism identifies Akyarlar/Kefaluka Bay on the southern Bodrum peninsula and lists the Thursday market. Operational caravan services, parking and network quality remain unverified.'),
    ('mazi','mazi',37.0957,27.6766,
      'Official Muğla tourism lists Mazı market day and Bodrum coastal context. Exact cove access, caravan services, parking and network quality remain unverified.'),
    ('akbuk','akbuk',37.0318,28.1017,
      'Official Muğla tourism material places Akbük on the Ören–Gökova coastal itinerary. Exact road geometry, caravan services, parking and network quality remain unverified.'),
    ('dalyan','dalyan',36.8342,28.6427,
      'Official protected-area material verifies the Köyceğiz–Dalyan wetland system, İztuzu and turtle habitat. Operational caravan services, parking and network quality remain unverified.'),
    ('karaot','karaotBeach',36.6997,29.0358,
      'Fethiye municipal material identifies Karaot as a public beach; official protected-area material establishes the wider Fethiye–Göcek sensitive coastal context. Facilities and overnight rules require direct confirmation.'),
    ('faralya','faralya',36.4934,29.1272,
      'Official Muğla tourism material verifies Faralya in the Butterfly Valley and Lycian Way landscape. Road suitability, parking and all caravan services require direct confirmation.'),
    ('kas','kas',36.2018,29.6377,
      'Official protected-area and Kaş municipal sources verify the Kaş–Kekova marine landscape and Limanağzı/Lycian Way context. Operational caravan services and parking remain unverified.'),
    ('cirali','cirali',36.4193,30.4803,
      'Official Kemer and Antalya tourism sources verify Çıralı, Olympos, Yanartaş, the national-park setting and turtle-nesting context. Caravan services and current access rules require direct confirmation.'),
    ('lara','lara',36.8515,30.8042,
      'Official Antalya tourism material verifies Lara public beach and general visitor facilities. Dedicated motorhome services, overnight permission and network quality remain unverified.')
)
update public.stops s
set content_key = 'content.stops.' || c.content_name,
    title_key = 'content.stops.' || c.content_name || '.title',
    region_key = 'content.stops.' || c.content_name || '.region',
    overview_key = 'content.stops.' || c.content_name || '.overview',
    why_visit_key = 'content.stops.' || c.content_name || '.whyVisit',
    latitude = c.latitude,
    longitude = c.longitude,
    sea_score = null,
    silence_score = null,
    internet_score = null,
    safety_score = null,
    solar_suitability = null,
    shade = null,
    crowd_level = null,
    ducato_accessibility = 'caution',
    drone_suitability = null,
    best_sunrise_key = 'content.stops.' || c.content_name || '.sunrise',
    best_sunset_key = 'content.stops.' || c.content_name || '.sunset',
    verification_status = 'partially_verified',
    source_note = c.source_note,
    last_verified_at = '2026-07-24T00:00:00+03:00'
from stop_content c
where s.slug = c.slug;

with legs(slug, nights, min_nights, max_nights, distance_km, duration_minutes) as (
  values
    ('gumusluk',2,1,3,105,102),
    ('akyarlar',1,1,2,17,25),
    ('mazi',2,1,3,54,54),
    ('akbuk',2,1,3,58,76),
    ('dalyan',2,1,3,85,81),
    ('karaot',1,1,2,51,52),
    ('faralya',2,1,3,40,57),
    ('kas',2,1,3,91,127),
    ('cirali',3,2,4,123,115),
    ('lara',2,1,3,94,89)
)
update public.route_stops rs
set recommended_nights = l.nights,
    min_nights = l.min_nights,
    max_nights = l.max_nights,
    driving_distance_km = l.distance_km,
    drive_time_minutes = l.duration_minutes
from legs l, public.routes r, public.stops s
where rs.route_id = r.id
  and rs.stop_id = s.id
  and r.slug = 'izmir-lara'
  and s.slug = l.slug;

-- Operational services are intentionally stored as unavailable/unverified.
-- This means “not confirmed by this guide”, not “does not exist”.
with stop_keys(slug, content_name) as (
  values
    ('gumusluk','gumusluk'), ('akyarlar','akyarlar'), ('mazi','mazi'),
    ('akbuk','akbuk'), ('dalyan','dalyan'), ('karaot','karaotBeach'),
    ('faralya','faralya'), ('kas','kas'), ('cirali','cirali'), ('lara','lara')
), facility_kinds(facility_type, name_suffix, notes_suffix, municipal) as (
  values
    ('municipality','municipality','municipality',true),
    ('market','marketName','marketNotes',false),
    ('fuel','fuelName','fuelNotes',false),
    ('water','waterName','waterNotes',false),
    ('dump','dumpName','dumpNotes',false)
), records as (
  select
    (
      substr(md5('route-guide:facility:' || sk.slug || ':' || fk.facility_type),1,8) || '-' ||
      substr(md5('route-guide:facility:' || sk.slug || ':' || fk.facility_type),9,4) || '-4' ||
      substr(md5('route-guide:facility:' || sk.slug || ':' || fk.facility_type),14,3) || '-8' ||
      substr(md5('route-guide:facility:' || sk.slug || ':' || fk.facility_type),18,3) || '-' ||
      substr(md5('route-guide:facility:' || sk.slug || ':' || fk.facility_type),21,12)
    )::uuid as id,
    s.id as stop_id,
    fk.facility_type,
    fk.municipal,
    case when fk.facility_type = 'municipality' then null
         else 'content.stops.' || sk.content_name || '.' || fk.name_suffix end as name_key,
    'content.stops.' || sk.content_name || '.' || fk.notes_suffix as notes_key
  from stop_keys sk
  join public.stops s on s.slug = sk.slug
  cross join facility_kinds fk
)
insert into public.facilities
  (id, stop_id, camping_spot_id, facility_type, available, is_municipal,
   name_key, notes_key, distance_km, metadata, verification_status,
   source_note, last_verified_at)
select id, stop_id, null, facility_type, false, municipal, name_key, notes_key,
       null, '{"status":"not_verified"}'::jsonb, 'unverified',
       'No specific current motorhome-compatible service or business is endorsed; confirm directly before relying on it.',
       null
from records
on conflict (id) do update set
  stop_id = excluded.stop_id,
  facility_type = excluded.facility_type,
  available = excluded.available,
  is_municipal = excluded.is_municipal,
  name_key = excluded.name_key,
  notes_key = excluded.notes_key,
  metadata = excluded.metadata,
  verification_status = excluded.verification_status,
  source_note = excluded.source_note,
  last_verified_at = excluded.last_verified_at;

with stop_keys(slug, content_name) as (
  values
    ('gumusluk','gumusluk'), ('akyarlar','akyarlar'), ('mazi','mazi'),
    ('akbuk','akbuk'), ('dalyan','dalyan'), ('karaot','karaotBeach'),
    ('faralya','faralya'), ('kas','kas'), ('cirali','cirali'), ('lara','lara')
), records as (
  select
    (
      substr(md5('route-guide:tip:' || sk.slug),1,8) || '-' ||
      substr(md5('route-guide:tip:' || sk.slug),9,4) || '-4' ||
      substr(md5('route-guide:tip:' || sk.slug),14,3) || '-8' ||
      substr(md5('route-guide:tip:' || sk.slug),18,3) || '-' ||
      substr(md5('route-guide:tip:' || sk.slug),21,12)
    )::uuid as id,
    s.id as stop_id,
    sk.content_name
  from stop_keys sk join public.stops s on s.slug = sk.slug
)
insert into public.tips
  (id, stop_id, tip_type, subject_key, body_key, lens_key, timing_key,
   settings_key, position, verification_status, source_note, last_verified_at)
select id, stop_id, 'luna_ultra',
       'content.stops.' || content_name || '.luna.subject',
       'content.stops.' || content_name || '.luna.note',
       'content.stops.' || content_name || '.luna.lens',
       'content.stops.' || content_name || '.luna.timing',
       'content.stops.' || content_name || '.luna.settings',
       0, 'partially_verified',
       'Destination subject is based on the official sources listed in this migration; camera technique is editorial.',
       '2026-07-24T00:00:00+03:00'
from records
on conflict (id) do update set
  stop_id = excluded.stop_id,
  subject_key = excluded.subject_key,
  body_key = excluded.body_key,
  lens_key = excluded.lens_key,
  timing_key = excluded.timing_key,
  settings_key = excluded.settings_key,
  verification_status = excluded.verification_status,
  source_note = excluded.source_note,
  last_verified_at = excluded.last_verified_at;

with stop_keys(slug, content_name) as (
  values
    ('gumusluk','gumusluk'), ('akyarlar','akyarlar'), ('mazi','mazi'),
    ('akbuk','akbuk'), ('dalyan','dalyan'), ('karaot','karaotBeach'),
    ('faralya','faralya'), ('kas','kas'), ('cirali','cirali'), ('lara','lara')
), positions(position, suffix) as (
  values (0,'warning1'), (1,'warning2')
), records as (
  select
    (
      substr(md5('route-guide:warning:' || sk.slug || ':' || p.position),1,8) || '-' ||
      substr(md5('route-guide:warning:' || sk.slug || ':' || p.position),9,4) || '-4' ||
      substr(md5('route-guide:warning:' || sk.slug || ':' || p.position),14,3) || '-8' ||
      substr(md5('route-guide:warning:' || sk.slug || ':' || p.position),18,3) || '-' ||
      substr(md5('route-guide:warning:' || sk.slug || ':' || p.position),21,12)
    )::uuid as id,
    s.id as stop_id,
    sk.content_name,
    p.position,
    p.suffix
  from stop_keys sk
  join public.stops s on s.slug = sk.slug
  cross join positions p
)
insert into public.warnings
  (id, stop_id, warning_type, severity, body_key, position,
   verification_status, source_note, last_verified_at)
select id, stop_id, 'road', 'warning',
       'content.stops.' || content_name || '.' || suffix,
       position, 'unverified',
       'Conservative trip-planning warning; confirm current access, signs and vehicle suitability locally.',
       null
from records
on conflict (id) do update set
  stop_id = excluded.stop_id,
  body_key = excluded.body_key,
  position = excluded.position,
  verification_status = excluded.verification_status,
  source_note = excluded.source_note,
  last_verified_at = excluded.last_verified_at;

-- No camping_spots or galleries are inserted: no legal overnight coordinates,
-- real Storage objects or source-cleared image URLs were verified.

commit;
