-- Researched content for İzmir, Güzelçamlı and Bafa Lake.
--
-- This project stores visible copy as vue-i18n keys. The English and Turkish
-- copy referenced below lives under content.stops/content.guide/content.spots.
-- This migration stores those keys, the researched structured values and the
-- source/verification ledger without changing the established schema.
--
-- Editorial content ledger (English):
-- İzmir overview: A practical urban starting point around Konak and the
-- Kordon, combining major-city provisioning with an easy waterfront walk.
-- Why visit: stock the van, resolve vehicle errands, then explore Kordon,
-- Kemeraltı and the historic centre on foot. It is a city base, not freecamp.
-- Güzelçamlı overview: a coastal town beside Dilek Peninsula–Büyük Menderes
-- Delta National Park, useful for protected coves, walking and photography.
-- Why visit: beaches, coastal cliffs, maquis, forest and wetland habitats are
-- combined in one protected landscape; current access rules always control.
-- Bafa overview: a protected lake and archaeological landscape where Kapıkırı
-- sits among Herakleia remains beneath Latmos rock forms.
-- Why visit: lakeshore atmosphere, ancient walls and the Athena temple share
-- one sensitive landscape; access and overnight decisions must be conservative.
--
-- Sources reviewed 2026-07-22:
-- https://www.visitizmir.org/en/Content/135
-- https://www.visitizmir.org/tr/Destinasyon/24618
-- https://www.visitizmir.org/en/Icerik/102
-- https://ekotaban.tarimorman.gov.tr/alan/5156
-- https://aydin.ktb.gov.tr/TR-64397/korunan-alanlar-milli-parklar-ve-tabiat-parklari.html
-- https://aydin.ktb.gov.tr/TR-64527/sportif-etkinlikler.html
-- https://www.kusadasi.bel.tr/en/they-will-swim-385-kilometers-for-maritime-and-cabotage-festival-in-kusadasi-p2218
-- https://ekotaban.tarimorman.gov.tr/alan/630
-- https://mugla.ktb.gov.tr/TR-177909/herakleia.html
-- https://aydin.ktb.gov.tr/TR-64391/dag-ve-doga-yuruyusu.html
-- Road estimates are rounded planning values calculated from the locality
-- coordinates using the public OSRM road-routing service on 2026-07-22.

begin;

-- Stops are deliberately updated by their seeded slugs. Subjective scores and
-- network measurements remain NULL because no dependable current measurement
-- was found. Coordinates are approximate locality centres, never camp pitches.
update public.stops
set content_key = 'content.stops.izmir',
    title_key = 'content.stops.izmir.title',
    region_key = 'content.stops.izmir.region',
    overview_key = 'content.stops.izmir.overview',
    why_visit_key = 'content.stops.izmir.whyVisit',
    latitude = 38.4192,
    longitude = 27.1287,
    sea_score = null,
    silence_score = null,
    internet_score = null,
    safety_score = null,
    solar_suitability = null,
    shade = null,
    crowd_level = null,
    ducato_accessibility = 'caution',
    drone_suitability = null,
    best_sunrise_key = 'content.stops.izmir.sunrise',
    best_sunset_key = 'content.stops.izmir.sunset',
    verification_status = 'partially_verified',
    source_note = 'Destination basis: Visit İzmir Konak, Kordon and Historical Elevator pages. Approximate Konak locality coordinates only. Internet quality, mobile coverage, motorhome services and exact Ducato parking access were not field-verified.',
    last_verified_at = '2026-07-22T00:00:00+03:00'
where slug = 'izmir';

update public.stops
set content_key = 'content.stops.guzelcamli',
    title_key = 'content.stops.guzelcamli.title',
    region_key = 'content.stops.guzelcamli.region',
    overview_key = 'content.stops.guzelcamli.overview',
    why_visit_key = 'content.stops.guzelcamli.whyVisit',
    latitude = 37.7118,
    longitude = 27.2336,
    sea_score = null,
    silence_score = null,
    internet_score = null,
    safety_score = null,
    solar_suitability = null,
    shade = null,
    crowd_level = null,
    ducato_accessibility = 'caution',
    drone_suitability = null,
    best_sunrise_key = 'content.stops.guzelcamli.sunrise',
    best_sunset_key = 'content.stops.guzelcamli.sunset',
    verification_status = 'partially_verified',
    source_note = 'Destination basis: official DKMP Dilek Peninsula record, Aydın tourism protected-area and walking guidance, and Kuşadası municipal references to Güzelçamlı and Karasu. Approximate town coordinates only. Current park rules, network quality and motorhome services require direct confirmation.',
    last_verified_at = '2026-07-22T00:00:00+03:00'
where slug = 'guzelcamli';

update public.stops
set content_key = 'content.stops.bafaLake',
    title_key = 'content.stops.bafaLake.title',
    region_key = 'content.stops.bafaLake.region',
    overview_key = 'content.stops.bafaLake.overview',
    why_visit_key = 'content.stops.bafaLake.whyVisit',
    latitude = 37.5009,
    longitude = 27.5254,
    sea_score = null,
    silence_score = null,
    internet_score = null,
    safety_score = null,
    solar_suitability = null,
    shade = null,
    crowd_level = null,
    ducato_accessibility = 'caution',
    drone_suitability = null,
    best_sunrise_key = 'content.stops.bafaLake.sunrise',
    best_sunset_key = 'content.stops.bafaLake.sunset',
    verification_status = 'partially_verified',
    source_note = 'Destination basis: official DKMP Bafa Lake Nature Park record, Muğla cultural-tourism Herakleia page and Aydın nature-walking guidance. Approximate Kapıkırı locality coordinates only. Network quality, final Ducato approach and all motorhome services remain unverified.',
    last_verified_at = '2026-07-22T00:00:00+03:00'
where slug = 'bafa';

-- Recommended stays are editorial planning ranges. Driving values are rounded
-- OSRM estimates and must not be treated as live navigation or traffic data.
update public.route_stops rs
set recommended_nights = 1,
    min_nights = 1,
    max_nights = 2,
    driving_distance_km = 0,
    drive_time_minutes = 0
from public.routes r, public.stops s
where rs.route_id = r.id and rs.stop_id = s.id
  and r.slug = 'izmir-lara' and s.slug = 'izmir';

update public.route_stops rs
set recommended_nights = 2,
    min_nights = 1,
    max_nights = 3,
    driving_distance_km = 126,
    drive_time_minutes = 95
from public.routes r, public.stops s
where rs.route_id = r.id and rs.stop_id = s.id
  and r.slug = 'izmir-lara' and s.slug = 'guzelcamli';

update public.route_stops rs
set recommended_nights = 2,
    min_nights = 1,
    max_nights = 3,
    driving_distance_km = 79,
    drive_time_minutes = 80
from public.routes r, public.stops s
where rs.route_id = r.id and rs.stop_id = s.id
  and r.slug = 'izmir-lara' and s.slug = 'bafa';

-- These rows are explicit "no verified freecamp" summaries. Their coordinates
-- are locality centres for map context, not endorsed overnight locations.
insert into public.camping_spots
  (id, stop_id, slug, content_key, title_key, spot_type, latitude, longitude,
   overview_key, price_note_key, access_note_key, rating, recommended, position,
   verification_status, source_note, last_verified_at)
select v.id::uuid, s.id, v.slug, v.content_key, v.title_key, 'freecamp',
       v.latitude, v.longitude, v.overview_key, v.price_note_key,
       v.access_note_key, 0, false, 0, 'unverified', v.source_note, null
from (values
  ('30000000-0000-4000-8000-000000000001','izmir','izmir-freecamp-unverified','content.spots.izmirFree','content.spots.izmirFree.title',38.4192::double precision,27.1287::double precision,'content.spots.izmirFree.overview','content.guide.izmir.freecampPrice','content.spots.izmirFree.access','Locality centroid only; not an overnight coordinate. No legal urban freecamp was verified.'),
  ('30000000-0000-4000-8000-000000000002','guzelcamli','guzelcamli-freecamp-unverified','content.spots.guzelcamliFree','content.spots.guzelcamliFree.title',37.7118::double precision,27.2336::double precision,'content.spots.guzelcamliFree.overview','content.guide.guzelcamli.freecampPrice','content.spots.guzelcamliFree.access','Locality centroid only; not an overnight coordinate. Protected-area access is not camping permission.'),
  ('30000000-0000-4000-8000-000000000003','bafa','bafa-freecamp-unverified','content.spots.bafaFree','content.spots.bafaFree.title',37.5009::double precision,27.5254::double precision,'content.spots.bafaFree.overview','content.guide.bafaLake.freecampPrice','content.spots.bafaFree.access','Locality centroid only; not an overnight coordinate. No legal lakeside freecamp was verified.')
) as v(id, stop_slug, slug, content_key, title_key, latitude, longitude, overview_key, price_note_key, access_note_key, source_note)
join public.stops s on s.slug = v.stop_slug
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
  rating = excluded.rating,
  recommended = excluded.recommended,
  position = excluded.position,
  verification_status = excluded.verification_status,
  source_note = excluded.source_note,
  last_verified_at = excluded.last_verified_at;

-- Facility availability false + unverified means "not confirmed", not a claim
-- that a facility can never exist. Exact businesses are intentionally omitted.
insert into public.facilities
  (id, stop_id, camping_spot_id, facility_type, available, is_municipal,
   name_key, notes_key, distance_km, metadata, verification_status,
   source_note, last_verified_at)
select v.id::uuid, s.id, null, v.facility_type, v.available, v.is_municipal,
       v.name_key, v.notes_key, null, jsonb_build_object('status','not_verified'),
       v.verification_status, v.source_note, v.last_verified_at::timestamptz
from (values
  ('40000000-0000-4000-8000-000000000001','izmir','municipality',false,true,null,'content.stops.izmir.municipality','unverified','No dedicated municipal motorhome service point verified.',null),
  ('40000000-0000-4000-8000-000000000002','izmir','market',true,false,'content.stops.izmir.marketName','content.stops.izmir.marketNotes','partially_verified','Konak and Kemeraltı are official central commercial destinations; select a current vehicle-accessible supermarket at travel time.','2026-07-22T00:00:00+03:00'),
  ('40000000-0000-4000-8000-000000000003','izmir','fuel',false,false,'content.stops.izmir.fuelName','content.stops.izmir.fuelNotes','unverified','No specific Ducato-suitable station endorsed.',null),
  ('40000000-0000-4000-8000-000000000004','izmir','water',false,false,'content.stops.izmir.waterName','content.stops.izmir.waterNotes','unverified','No potable public motorhome refill verified.',null),
  ('40000000-0000-4000-8000-000000000005','izmir','dump',false,false,'content.stops.izmir.dumpName','content.stops.izmir.dumpNotes','unverified','No licensed public dump station verified.',null),
  ('40000000-0000-4000-8000-000000000006','guzelcamli','municipality',false,true,null,'content.stops.guzelcamli.municipality','unverified','Town and park visitor facilities require current direct confirmation.',null),
  ('40000000-0000-4000-8000-000000000007','guzelcamli','market',false,false,'content.stops.guzelcamli.marketName','content.stops.guzelcamli.marketNotes','unverified','No specific supermarket and Ducato parking combination verified.',null),
  ('40000000-0000-4000-8000-000000000008','guzelcamli','fuel',false,false,'content.stops.guzelcamli.fuelName','content.stops.guzelcamli.fuelNotes','unverified','No specific suitable station verified.',null),
  ('40000000-0000-4000-8000-000000000009','guzelcamli','water',false,false,'content.stops.guzelcamli.waterName','content.stops.guzelcamli.waterNotes','unverified','No potable public motorhome refill verified.',null),
  ('40000000-0000-4000-8000-000000000010','guzelcamli','dump',false,false,'content.stops.guzelcamli.dumpName','content.stops.guzelcamli.dumpNotes','unverified','No licensed public dump station verified.',null),
  ('40000000-0000-4000-8000-000000000011','bafa','municipality',false,true,null,'content.stops.bafaLake.municipality','unverified','No dedicated municipal motorhome service facility verified.',null),
  ('40000000-0000-4000-8000-000000000012','bafa','market',false,false,'content.stops.bafaLake.marketName','content.stops.bafaLake.marketNotes','unverified','No full supermarket near Kapıkırı verified.',null),
  ('40000000-0000-4000-8000-000000000013','bafa','fuel',false,false,'content.stops.bafaLake.fuelName','content.stops.bafaLake.fuelNotes','unverified','No specific Ducato-suitable station verified.',null),
  ('40000000-0000-4000-8000-000000000014','bafa','water',false,false,'content.stops.bafaLake.waterName','content.stops.bafaLake.waterNotes','unverified','No potable public motorhome refill verified; lake water is not presented as a supply.',null),
  ('40000000-0000-4000-8000-000000000015','bafa','dump',false,false,'content.stops.bafaLake.dumpName','content.stops.bafaLake.dumpNotes','unverified','No licensed dump station verified.',null),
  ('40000000-0000-4000-8000-000000000016','izmir','wc',false,true,'content.facilities.wc','content.guide.izmir.wcNotes','unverified','No dedicated municipal motorhome WC verified.',null),
  ('40000000-0000-4000-8000-000000000017','izmir','shower',false,true,'content.facilities.shower','content.guide.izmir.showerNotes','unverified','No dedicated municipal motorhome shower verified.',null),
  ('40000000-0000-4000-8000-000000000018','izmir','electricity',false,true,'content.facilities.electricity','content.guide.izmir.electricityNotes','unverified','No public motorhome electricity connection verified.',null),
  ('40000000-0000-4000-8000-000000000019','guzelcamli','wc',false,true,'content.facilities.wc','content.guide.guzelcamli.wcNotes','unverified','Seasonal public WC operation not verified for the travel date.',null),
  ('40000000-0000-4000-8000-000000000020','guzelcamli','shower',false,true,'content.facilities.shower','content.guide.guzelcamli.showerNotes','unverified','No shower suitable as a public motorhome service point verified.',null),
  ('40000000-0000-4000-8000-000000000021','guzelcamli','electricity',false,true,'content.facilities.electricity','content.guide.guzelcamli.electricityNotes','unverified','No public motorhome electricity connection verified.',null),
  ('40000000-0000-4000-8000-000000000022','bafa','wc',false,true,'content.facilities.wc','content.guide.bafaLake.wcNotes','unverified','No dependable public motorhome-traveller WC verified in Kapıkırı.',null),
  ('40000000-0000-4000-8000-000000000023','bafa','shower',false,true,'content.facilities.shower','content.guide.bafaLake.showerNotes','unverified','No public motorhome shower verified.',null),
  ('40000000-0000-4000-8000-000000000024','bafa','electricity',false,true,'content.facilities.electricity','content.guide.bafaLake.electricityNotes','unverified','No public motorhome electricity connection verified.',null)
) as v(id, stop_slug, facility_type, available, is_municipal, name_key, notes_key, verification_status, source_note, last_verified_at)
join public.stops s on s.slug = v.stop_slug
on conflict (id) do update set
  stop_id = excluded.stop_id,
  camping_spot_id = excluded.camping_spot_id,
  facility_type = excluded.facility_type,
  available = excluded.available,
  is_municipal = excluded.is_municipal,
  name_key = excluded.name_key,
  notes_key = excluded.notes_key,
  distance_km = excluded.distance_km,
  metadata = excluded.metadata,
  verification_status = excluded.verification_status,
  source_note = excluded.source_note,
  last_verified_at = excluded.last_verified_at;

insert into public.activities
  (id, stop_id, activity_type, title_key, description_key, position,
   verification_status, source_note, last_verified_at)
select v.id::uuid, s.id, v.activity_type, v.title_key, v.description_key,
       v.position, v.verification_status, v.source_note, v.last_verified_at::timestamptz
from (values
  ('50000000-0000-4000-8000-000000000001','izmir','hidden_place','content.guide.izmir.hiddenTitle','content.guide.izmir.hiddenDescription',0,'partially_verified','https://www.visitizmir.org/en/Content/135','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000002','izmir','beach','content.guide.izmir.beachTitle','content.guide.izmir.beachDescription',1,'partially_verified','Kordon is verified as an urban waterfront by Visit İzmir; this record expressly does not claim it is a swimming beach.','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000003','izmir','note','content.guide.izmir.practicalTitle','content.guide.izmir.practicalDescription',2,'unverified','Operational planning advice; current parking must be checked locally.',null),
  ('50000000-0000-4000-8000-000000000004','guzelcamli','hidden_place','content.guide.guzelcamli.hiddenTitle','content.guide.guzelcamli.hiddenDescription',0,'verified','https://ekotaban.tarimorman.gov.tr/alan/5156','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000005','guzelcamli','beach','content.guide.guzelcamli.beachTitle','content.guide.guzelcamli.beachDescription',1,'partially_verified','Official tourism and municipal sources establish the peninsula beaches and Karasu; live access requires confirmation.','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000006','guzelcamli','note','content.guide.guzelcamli.practicalTitle','content.guide.guzelcamli.practicalDescription',2,'partially_verified','https://ekotaban.tarimorman.gov.tr/alan/5156','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000007','bafa','hidden_place','content.guide.bafaLake.hiddenTitle','content.guide.bafaLake.hiddenDescription',0,'verified','https://mugla.ktb.gov.tr/TR-177909/herakleia.html','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000008','bafa','beach','content.guide.bafaLake.beachTitle','content.guide.bafaLake.beachDescription',1,'partially_verified','https://ekotaban.tarimorman.gov.tr/alan/630','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000009','bafa','note','content.guide.bafaLake.practicalTitle','content.guide.bafaLake.practicalDescription',2,'unverified','Conservative motorhome planning advice; services and parking require local confirmation.',null),
  ('50000000-0000-4000-8000-000000000010','izmir','hiking','content.guide.izmir.hikingTitle','content.guide.izmir.hikingDescription',3,'partially_verified','https://www.visitizmir.org/tr/Destinasyon/24618','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000011','izmir','viewpoint','content.guide.izmir.viewpointTitle','content.guide.izmir.viewpointDescription',4,'verified','https://www.visitizmir.org/en/Icerik/102','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000012','guzelcamli','hiking','content.guide.guzelcamli.hikingTitle','content.guide.guzelcamli.hikingDescription',3,'partially_verified','https://aydin.ktb.gov.tr/TR-64527/sportif-etkinlikler.html','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000013','guzelcamli','viewpoint','content.guide.guzelcamli.viewpointTitle','content.guide.guzelcamli.viewpointDescription',4,'partially_verified','Protected landscape verified by DKMP; exact viewpoint access must be confirmed on the day.','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000014','bafa','hiking','content.guide.bafaLake.hikingTitle','content.guide.bafaLake.hikingDescription',3,'partially_verified','Official Aydın walking guidance and Muğla Herakleia description; no sensitive rock-art directions are included.','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000015','bafa','viewpoint','content.guide.bafaLake.viewpointTitle','content.guide.bafaLake.viewpointDescription',4,'partially_verified','https://mugla.ktb.gov.tr/TR-177909/herakleia.html','2026-07-22T00:00:00+03:00')
) as v(id, stop_slug, activity_type, title_key, description_key, position, verification_status, source_note, last_verified_at)
join public.stops s on s.slug = v.stop_slug
on conflict (id) do update set
  stop_id = excluded.stop_id,
  activity_type = excluded.activity_type,
  title_key = excluded.title_key,
  description_key = excluded.description_key,
  position = excluded.position,
  verification_status = excluded.verification_status,
  source_note = excluded.source_note,
  last_verified_at = excluded.last_verified_at;

-- Luna Ultra suggestions are editorial technique tied only to verified subjects.
-- Season advice is deliberately general and always subordinate to live weather.
insert into public.tips
  (id, stop_id, tip_type, subject_key, body_key, lens_key, timing_key,
   settings_key, position, verification_status, source_note, last_verified_at)
select v.id::uuid, s.id, v.tip_type, v.subject_key, v.body_key, v.lens_key,
       v.timing_key, v.settings_key, v.position, v.verification_status,
       v.source_note, v.last_verified_at::timestamptz
from (values
  ('60000000-0000-4000-8000-000000000001','izmir','luna_ultra','content.stops.izmir.luna.subject','content.stops.izmir.luna.note','content.stops.izmir.luna.lens','content.stops.izmir.luna.timing','content.stops.izmir.luna.settings',0,'partially_verified','Kordon and the bay subjects are official Visit İzmir destinations; camera technique is editorial.','2026-07-22T00:00:00+03:00'),
  ('60000000-0000-4000-8000-000000000002','guzelcamli','luna_ultra','content.stops.guzelcamli.luna.subject','content.stops.guzelcamli.luna.note','content.stops.guzelcamli.luna.lens','content.stops.guzelcamli.luna.timing','content.stops.guzelcamli.luna.settings',0,'partially_verified','Protected landscape is verified by DKMP; camera technique is editorial.','2026-07-22T00:00:00+03:00'),
  ('60000000-0000-4000-8000-000000000003','bafa','luna_ultra','content.stops.bafaLake.luna.subject','content.stops.bafaLake.luna.note','content.stops.bafaLake.luna.lens','content.stops.bafaLake.luna.timing','content.stops.bafaLake.luna.settings',0,'partially_verified','Bafa, Herakleia and the Athena temple are verified subjects; camera technique is editorial.','2026-07-22T00:00:00+03:00'),
  ('60000000-0000-4000-8000-000000000004','izmir','best_season','content.guide.izmir.seasonTitle','content.guide.izmir.seasonDescription',null,null,null,1,'unverified','General comfort guidance, not a forecast.',null),
  ('60000000-0000-4000-8000-000000000005','guzelcamli','best_season','content.guide.guzelcamli.seasonTitle','content.guide.guzelcamli.seasonDescription',null,null,null,1,'partially_verified','Official Aydın tourism identifies nature walking and seasonal coastal use; live weather and park rules take precedence.','2026-07-22T00:00:00+03:00'),
  ('60000000-0000-4000-8000-000000000006','bafa','best_season','content.guide.bafaLake.seasonTitle','content.guide.bafaLake.seasonDescription',null,null,null,1,'unverified','General exposed-walking safety guidance, not a climate guarantee.',null)
) as v(id, stop_slug, tip_type, subject_key, body_key, lens_key, timing_key, settings_key, position, verification_status, source_note, last_verified_at)
join public.stops s on s.slug = v.stop_slug
on conflict (id) do update set
  stop_id = excluded.stop_id,
  tip_type = excluded.tip_type,
  subject_key = excluded.subject_key,
  body_key = excluded.body_key,
  lens_key = excluded.lens_key,
  timing_key = excluded.timing_key,
  settings_key = excluded.settings_key,
  position = excluded.position,
  verification_status = excluded.verification_status,
  source_note = excluded.source_note,
  last_verified_at = excluded.last_verified_at;

insert into public.warnings
  (id, stop_id, warning_type, severity, body_key, position,
   verification_status, source_note, last_verified_at)
select v.id::uuid, s.id, v.warning_type, v.severity, v.body_key, v.position,
       v.verification_status, v.source_note, v.last_verified_at::timestamptz
from (values
  ('70000000-0000-4000-8000-000000000001','izmir','road','warning','content.stops.izmir.warning1',0,'unverified','Operational guidance; current restrictions and vehicle geometry require direct checking.',null),
  ('70000000-0000-4000-8000-000000000002','izmir','parking','warning','content.stops.izmir.warning2',1,'unverified','No overnight permission was inferred from ordinary parking.',null),
  ('70000000-0000-4000-8000-000000000003','guzelcamli','protected_area','warning','content.stops.guzelcamli.warning1',0,'partially_verified','https://ekotaban.tarimorman.gov.tr/alan/5156','2026-07-22T00:00:00+03:00'),
  ('70000000-0000-4000-8000-000000000004','guzelcamli','overnight','warning','content.stops.guzelcamli.warning2',1,'unverified','Day access and parking are not represented as camping permission.',null),
  ('70000000-0000-4000-8000-000000000005','bafa','road','warning','content.stops.bafaLake.warning1',0,'unverified','Final village approach and parking geometry were not field-verified for every Ducato length.',null),
  ('70000000-0000-4000-8000-000000000006','bafa','protected_area','warning','content.stops.bafaLake.warning2',1,'partially_verified','https://ekotaban.tarimorman.gov.tr/alan/630','2026-07-22T00:00:00+03:00')
) as v(id, stop_slug, warning_type, severity, body_key, position, verification_status, source_note, last_verified_at)
join public.stops s on s.slug = v.stop_slug
on conflict (id) do update set
  stop_id = excluded.stop_id,
  warning_type = excluded.warning_type,
  severity = excluded.severity,
  body_key = excluded.body_key,
  position = excluded.position,
  verification_status = excluded.verification_status,
  source_note = excluded.source_note,
  last_verified_at = excluded.last_verified_at;

-- No gallery rows are inserted: no genuine Storage objects or source-cleared
-- image URLs were available, and fake paths/URLs would misrepresent availability.

commit;
