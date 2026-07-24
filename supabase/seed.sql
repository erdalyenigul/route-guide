-- Seed for the personal İzmir → Lara route.
-- İzmir, Güzelçamlı and Bafa Lake contain editorial guide content. Remaining
-- stops intentionally retain placeholders until they are researched.

insert into public.routes (id, slug, title_key, description_key, start_date, end_date, status, total_distance_km)
values ('10000000-0000-4000-8000-000000000001', 'izmir-lara', 'content.placeholder.routeTitle', 'content.placeholder.routeDescription', '2026-01-01', '2026-01-01', 'active', 0)
on conflict (id) do nothing;

insert into public.stops (id, slug, content_key, title_key, region_key, overview_key, why_visit_key, best_sunrise_key, best_sunset_key) values
('20000000-0000-4000-8000-000000000001', 'izmir', 'content.stops.izmir', 'content.stops.izmir.title', 'content.placeholder.region', 'content.placeholder.overview', 'content.placeholder.whyVisit', 'content.placeholder.sunrise', 'content.placeholder.sunset'),
('20000000-0000-4000-8000-000000000002', 'guzelcamli', 'content.stops.guzelcamli', 'content.stops.guzelcamli.title', 'content.placeholder.region', 'content.placeholder.overview', 'content.placeholder.whyVisit', 'content.placeholder.sunrise', 'content.placeholder.sunset'),
('20000000-0000-4000-8000-000000000003', 'bafa', 'content.stops.bafaLake', 'content.stops.bafaLake.title', 'content.placeholder.region', 'content.placeholder.overview', 'content.placeholder.whyVisit', 'content.placeholder.sunrise', 'content.placeholder.sunset'),
('20000000-0000-4000-8000-000000000004', 'gumusluk', 'content.stops.gumusluk', 'content.stops.gumusluk.title', 'content.placeholder.region', 'content.placeholder.overview', 'content.placeholder.whyVisit', 'content.placeholder.sunrise', 'content.placeholder.sunset'),
('20000000-0000-4000-8000-000000000005', 'akyarlar', 'content.stops.akyarlar', 'content.stops.akyarlar.title', 'content.placeholder.region', 'content.placeholder.overview', 'content.placeholder.whyVisit', 'content.placeholder.sunrise', 'content.placeholder.sunset'),
('20000000-0000-4000-8000-000000000006', 'mazi', 'content.stops.mazi', 'content.stops.mazi.title', 'content.placeholder.region', 'content.placeholder.overview', 'content.placeholder.whyVisit', 'content.placeholder.sunrise', 'content.placeholder.sunset'),
('20000000-0000-4000-8000-000000000007', 'akbuk', 'content.stops.akbuk', 'content.stops.akbuk.title', 'content.placeholder.region', 'content.placeholder.overview', 'content.placeholder.whyVisit', 'content.placeholder.sunrise', 'content.placeholder.sunset'),
('20000000-0000-4000-8000-000000000008', 'dalyan', 'content.stops.dalyan', 'content.stops.dalyan.title', 'content.placeholder.region', 'content.placeholder.overview', 'content.placeholder.whyVisit', 'content.placeholder.sunrise', 'content.placeholder.sunset'),
('20000000-0000-4000-8000-000000000009', 'karaot', 'content.stops.karaotBeach', 'content.stops.karaotBeach.title', 'content.placeholder.region', 'content.placeholder.overview', 'content.placeholder.whyVisit', 'content.placeholder.sunrise', 'content.placeholder.sunset'),
('20000000-0000-4000-8000-000000000010', 'faralya', 'content.stops.faralya', 'content.stops.faralya.title', 'content.placeholder.region', 'content.placeholder.overview', 'content.placeholder.whyVisit', 'content.placeholder.sunrise', 'content.placeholder.sunset'),
('20000000-0000-4000-8000-000000000011', 'kas', 'content.stops.kas', 'content.stops.kas.title', 'content.placeholder.region', 'content.placeholder.overview', 'content.placeholder.whyVisit', 'content.placeholder.sunrise', 'content.placeholder.sunset'),
('20000000-0000-4000-8000-000000000012', 'cirali', 'content.stops.cirali', 'content.stops.cirali.title', 'content.placeholder.region', 'content.placeholder.overview', 'content.placeholder.whyVisit', 'content.placeholder.sunrise', 'content.placeholder.sunset'),
('20000000-0000-4000-8000-000000000013', 'lara', 'content.stops.lara', 'content.stops.lara.title', 'content.placeholder.region', 'content.placeholder.overview', 'content.placeholder.whyVisit', 'content.placeholder.sunrise', 'content.placeholder.sunset')
on conflict (id) do nothing;

insert into public.route_stops (route_id, stop_id, position, initial_status) values
('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 0, 'current'),
('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000002', 1, 'planned'),
('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000003', 2, 'planned'),
('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000004', 3, 'planned'),
('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000005', 4, 'planned'),
('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000006', 5, 'planned'),
('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000007', 6, 'planned'),
('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000008', 7, 'planned'),
('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000009', 8, 'planned'),
('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000010', 9, 'planned'),
('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000011', 10, 'planned'),
('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000012', 11, 'planned'),
('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000013', 12, 'planned')
on conflict (route_id, stop_id) do nothing;

-- The first three editorial summaries are based on official destination/protected-area
-- descriptions. Operational caravan details remain unverified and intentionally empty.
update public.stops set
  region_key = 'content.stops.izmir.region',
  overview_key = 'content.stops.izmir.overview',
  why_visit_key = 'content.stops.izmir.whyVisit',
  verification_status = 'partially_verified',
  source_note = 'https://www.visitizmir.org/tr/Destinasyon/24618',
  last_verified_at = '2026-07-22T00:00:00+03:00'
where id = '20000000-0000-4000-8000-000000000001';

update public.stops set
  region_key = 'content.stops.guzelcamli.region',
  overview_key = 'content.stops.guzelcamli.overview',
  why_visit_key = 'content.stops.guzelcamli.whyVisit',
  verification_status = 'partially_verified',
  source_note = 'https://ekotaban.tarimorman.gov.tr/alan/5156',
  last_verified_at = '2026-07-22T00:00:00+03:00'
where id = '20000000-0000-4000-8000-000000000002';

update public.stops set
  region_key = 'content.stops.bafaLake.region',
  overview_key = 'content.stops.bafaLake.overview',
  why_visit_key = 'content.stops.bafaLake.whyVisit',
  verification_status = 'partially_verified',
  source_note = 'https://www.tarimorman.gov.tr/DKMP/Menu/28/Tabiat-Parklari | https://mugla.ktb.gov.tr/TR-270761/herakleia--latmos.html',
  last_verified_at = '2026-07-22T00:00:00+03:00'
where id = '20000000-0000-4000-8000-000000000003';

-- Approximate locality centroids for route visualization only; these are not
-- overnight parking or camping coordinates.
update public.stops set latitude = 38.4192, longitude = 27.1287 where slug = 'izmir';
update public.stops set latitude = 37.7118, longitude = 27.2336 where slug = 'guzelcamli';
update public.stops set latitude = 37.5009, longitude = 27.5254 where slug = 'bafa';
update public.stops set latitude = 37.0537, longitude = 27.2338 where slug = 'gumusluk';
update public.stops set latitude = 36.9729, longitude = 27.2986 where slug = 'akyarlar';
update public.stops set latitude = 37.0957, longitude = 27.6766 where slug = 'mazi';
update public.stops set latitude = 37.0318, longitude = 28.1017 where slug = 'akbuk';
update public.stops set latitude = 36.8342, longitude = 28.6427 where slug = 'dalyan';
update public.stops set latitude = 36.6997, longitude = 29.0358 where slug = 'karaot';
update public.stops set latitude = 36.4934, longitude = 29.1272 where slug = 'faralya';
update public.stops set latitude = 36.2018, longitude = 29.6377 where slug = 'kas';
update public.stops set latitude = 36.4193, longitude = 30.4803 where slug = 'cirali';
update public.stops set latitude = 36.8515, longitude = 30.8042 where slug = 'lara';

-- Complete stop profiles for the first three stops. Scores are editorial aids,
-- not guarantees; operational details remain explicitly unverified where noted.
update public.stops set
  latitude = 38.4192, longitude = 27.1287,
  sea_score = null, silence_score = 1, internet_score = 4, safety_score = null,
  solar_suitability = 'medium', shade = 'low', crowd_level = 'high',
  ducato_accessibility = 'caution', drone_suitability = null,
  best_sunrise_key = 'content.stops.izmir.sunrise', best_sunset_key = 'content.stops.izmir.sunset',
  verification_status = 'partially_verified',
  source_note = 'Editorial basis: https://www.visitizmir.org/en/Content/135 and https://www.visitizmir.org/tr/Destinasyon/24618. Operational motorhome services require field verification. Approximate locality coordinates only.',
  last_verified_at = '2026-07-22T00:00:00+03:00'
where slug = 'izmir';

update public.stops set
  latitude = 37.7118, longitude = 27.2336,
  sea_score = 4, silence_score = 3, internet_score = 3, safety_score = null,
  solar_suitability = 'high', shade = 'high', crowd_level = 'high',
  ducato_accessibility = 'good', drone_suitability = null,
  best_sunrise_key = 'content.stops.guzelcamli.sunrise', best_sunset_key = 'content.stops.guzelcamli.sunset',
  verification_status = 'partially_verified',
  source_note = 'Editorial basis: https://ekotaban.tarimorman.gov.tr/alan/5156. Park access, facilities and overnight rules must be rechecked. Approximate locality coordinates only.',
  last_verified_at = '2026-07-22T00:00:00+03:00'
where slug = 'guzelcamli';

update public.stops set
  latitude = 37.5009, longitude = 27.5254,
  sea_score = null, silence_score = 5, internet_score = 2, safety_score = null,
  solar_suitability = 'excellent', shade = 'low', crowd_level = 'low',
  ducato_accessibility = 'caution', drone_suitability = null,
  best_sunrise_key = 'content.stops.bafaLake.sunrise', best_sunset_key = 'content.stops.bafaLake.sunset',
  verification_status = 'partially_verified',
  source_note = 'Editorial basis: https://ekotaban.tarimorman.gov.tr/alan/630 and https://mugla.ktb.gov.tr/TR-177909/herakleia.html. Motorhome access and services remain unverified. Approximate Kapıkırı locality coordinates only.',
  last_verified_at = '2026-07-22T00:00:00+03:00'
where slug = 'bafa';

update public.route_stops set recommended_nights = 1, min_nights = 1, max_nights = 2, driving_distance_km = 0, drive_time_minutes = 0
where route_id = '10000000-0000-4000-8000-000000000001' and stop_id = '20000000-0000-4000-8000-000000000001';
update public.route_stops set recommended_nights = 2, min_nights = 1, max_nights = 3, driving_distance_km = 126, drive_time_minutes = 95
where route_id = '10000000-0000-4000-8000-000000000001' and stop_id = '20000000-0000-4000-8000-000000000002';
update public.route_stops set recommended_nights = 2, min_nights = 1, max_nights = 3, driving_distance_km = 79, drive_time_minutes = 80
where route_id = '10000000-0000-4000-8000-000000000001' and stop_id = '20000000-0000-4000-8000-000000000003';

-- Unverified freecamp summaries: these records intentionally endorse no pitch.
insert into public.camping_spots
  (id, stop_id, slug, content_key, title_key, spot_type, latitude, longitude, overview_key, price_note_key, access_note_key, rating, recommended, position, verification_status, source_note, last_verified_at)
values
  ('30000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'izmir-freecamp-unverified', 'content.spots.izmirFree', 'content.spots.izmirFree.title', 'freecamp', 38.4192, 27.1287, 'content.spots.izmirFree.overview', 'content.guide.izmir.freecampPrice', 'content.spots.izmirFree.access', 0, false, 0, 'unverified', 'Locality centroid only; not an overnight coordinate.', null),
  ('30000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', 'guzelcamli-freecamp-unverified', 'content.spots.guzelcamliFree', 'content.spots.guzelcamliFree.title', 'freecamp', 37.7118, 27.2336, 'content.spots.guzelcamliFree.overview', 'content.guide.guzelcamli.freecampPrice', 'content.spots.guzelcamliFree.access', 0, false, 0, 'unverified', 'Locality centroid only; not an overnight coordinate. National-park rules require direct confirmation.', null),
  ('30000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'bafa-freecamp-unverified', 'content.spots.bafaFree', 'content.spots.bafaFree.title', 'freecamp', 37.5009, 27.5254, 'content.spots.bafaFree.overview', 'content.guide.bafaLake.freecampPrice', 'content.spots.bafaFree.access', 0, false, 0, 'unverified', 'Locality centroid only; not an overnight coordinate. Protected-area and archaeological restrictions apply.', null)
on conflict (id) do update set
  title_key = excluded.title_key, overview_key = excluded.overview_key, price_note_key = excluded.price_note_key,
  access_note_key = excluded.access_note_key, verification_status = excluded.verification_status, source_note = excluded.source_note;

-- Municipality, shopping, fuel, potable-water and dump-service status.
insert into public.facilities
  (id, stop_id, camping_spot_id, facility_type, available, is_municipal, name_key, notes_key, distance_km, metadata, verification_status, source_note, last_verified_at)
values
  ('40000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001',null,'municipality',false,true,null,'content.stops.izmir.municipality',null,'{}','unverified','No dedicated municipal motorhome service verified.',null),
  ('40000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000001',null,'market',true,false,'content.stops.izmir.marketName','content.stops.izmir.marketNotes',null,'{}','partially_verified','Konak is an established commercial centre; exact supermarket and parking must be selected at travel time.','2026-07-22T00:00:00+03:00'),
  ('40000000-0000-4000-8000-000000000003','20000000-0000-4000-8000-000000000001',null,'fuel',true,false,'content.stops.izmir.fuelName','content.stops.izmir.fuelNotes',null,'{}','unverified','No specific station endorsed.',null),
  ('40000000-0000-4000-8000-000000000004','20000000-0000-4000-8000-000000000001',null,'water',false,false,'content.stops.izmir.waterName','content.stops.izmir.waterNotes',null,'{}','unverified','No potable motorhome refill verified.',null),
  ('40000000-0000-4000-8000-000000000005','20000000-0000-4000-8000-000000000001',null,'dump',false,false,'content.stops.izmir.dumpName','content.stops.izmir.dumpNotes',null,'{}','unverified','No licensed public dump point verified.',null),
  ('40000000-0000-4000-8000-000000000006','20000000-0000-4000-8000-000000000002',null,'municipality',false,true,null,'content.stops.guzelcamli.municipality',null,'{}','unverified','Seasonal visitor facilities require direct confirmation.',null),
  ('40000000-0000-4000-8000-000000000007','20000000-0000-4000-8000-000000000002',null,'market',true,false,'content.stops.guzelcamli.marketName','content.stops.guzelcamli.marketNotes',null,'{}','unverified','Town-centre shopping expected; no business endorsed.',null),
  ('40000000-0000-4000-8000-000000000008','20000000-0000-4000-8000-000000000002',null,'fuel',false,false,'content.stops.guzelcamli.fuelName','content.stops.guzelcamli.fuelNotes',null,'{}','unverified','No specific suitable station verified.',null),
  ('40000000-0000-4000-8000-000000000009','20000000-0000-4000-8000-000000000002',null,'water',false,false,'content.stops.guzelcamli.waterName','content.stops.guzelcamli.waterNotes',null,'{}','unverified','No potable motorhome refill verified.',null),
  ('40000000-0000-4000-8000-000000000010','20000000-0000-4000-8000-000000000002',null,'dump',false,false,'content.stops.guzelcamli.dumpName','content.stops.guzelcamli.dumpNotes',null,'{}','unverified','No licensed dump station verified.',null),
  ('40000000-0000-4000-8000-000000000011','20000000-0000-4000-8000-000000000003',null,'municipality',false,true,null,'content.stops.bafaLake.municipality',null,'{}','unverified','No dedicated municipal motorhome facility verified.',null),
  ('40000000-0000-4000-8000-000000000012','20000000-0000-4000-8000-000000000003',null,'market',false,false,'content.stops.bafaLake.marketName','content.stops.bafaLake.marketNotes',null,'{}','unverified','No full supermarket near Kapıkırı verified.',null),
  ('40000000-0000-4000-8000-000000000013','20000000-0000-4000-8000-000000000003',null,'fuel',false,false,'content.stops.bafaLake.fuelName','content.stops.bafaLake.fuelNotes',null,'{}','unverified','No specific suitable station verified.',null),
  ('40000000-0000-4000-8000-000000000014','20000000-0000-4000-8000-000000000003',null,'water',false,false,'content.stops.bafaLake.waterName','content.stops.bafaLake.waterNotes',null,'{}','unverified','No potable motorhome refill verified.',null),
  ('40000000-0000-4000-8000-000000000015','20000000-0000-4000-8000-000000000003',null,'dump',false,false,'content.stops.bafaLake.dumpName','content.stops.bafaLake.dumpNotes',null,'{}','unverified','No licensed dump station verified.',null)
on conflict (id) do update set
  available = excluded.available, name_key = excluded.name_key, notes_key = excluded.notes_key,
  metadata = excluded.metadata, verification_status = excluded.verification_status, source_note = excluded.source_note,
  last_verified_at = excluded.last_verified_at;

insert into public.activities
  (id, stop_id, activity_type, title_key, description_key, position, verification_status, source_note, last_verified_at)
values
  ('50000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001','hidden_place','content.guide.izmir.hiddenTitle','content.guide.izmir.hiddenDescription',0,'partially_verified','https://www.visitizmir.org/en/Content/135','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000001','beach','content.guide.izmir.beachTitle','content.guide.izmir.beachDescription',1,'partially_verified','https://www.visitizmir.org/tr/Destinasyon/24618','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000003','20000000-0000-4000-8000-000000000001','note','content.guide.izmir.practicalTitle','content.guide.izmir.practicalDescription',2,'unverified','Operational recommendation; verify locally.',null),
  ('50000000-0000-4000-8000-000000000004','20000000-0000-4000-8000-000000000002','hidden_place','content.guide.guzelcamli.hiddenTitle','content.guide.guzelcamli.hiddenDescription',0,'verified','https://ekotaban.tarimorman.gov.tr/alan/5156','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000005','20000000-0000-4000-8000-000000000002','beach','content.guide.guzelcamli.beachTitle','content.guide.guzelcamli.beachDescription',1,'partially_verified','Official park sources name the coves; live access requires confirmation.','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000006','20000000-0000-4000-8000-000000000002','note','content.guide.guzelcamli.practicalTitle','content.guide.guzelcamli.practicalDescription',2,'partially_verified','https://ekotaban.tarimorman.gov.tr/alan/5156','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000007','20000000-0000-4000-8000-000000000003','hidden_place','content.guide.bafaLake.hiddenTitle','content.guide.bafaLake.hiddenDescription',0,'verified','https://mugla.ktb.gov.tr/TR-177909/herakleia.html','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000008','20000000-0000-4000-8000-000000000003','beach','content.guide.bafaLake.beachTitle','content.guide.bafaLake.beachDescription',1,'partially_verified','https://ekotaban.tarimorman.gov.tr/alan/630','2026-07-22T00:00:00+03:00'),
  ('50000000-0000-4000-8000-000000000009','20000000-0000-4000-8000-000000000003','note','content.guide.bafaLake.practicalTitle','content.guide.bafaLake.practicalDescription',2,'unverified','Operational recommendation; verify locally.',null)
on conflict (id) do update set title_key = excluded.title_key, description_key = excluded.description_key, verification_status = excluded.verification_status, source_note = excluded.source_note, last_verified_at = excluded.last_verified_at;

insert into public.tips
  (id, stop_id, tip_type, subject_key, body_key, lens_key, timing_key, settings_key, position, verification_status, source_note, last_verified_at)
values
  ('60000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001','luna_ultra','content.stops.izmir.luna.subject','content.stops.izmir.luna.note','content.stops.izmir.luna.lens','content.stops.izmir.luna.timing','content.stops.izmir.luna.settings',0,'partially_verified','Subject locations verified by Visit İzmir; shooting advice is editorial.','2026-07-22T00:00:00+03:00'),
  ('60000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000002','luna_ultra','content.stops.guzelcamli.luna.subject','content.stops.guzelcamli.luna.note','content.stops.guzelcamli.luna.lens','content.stops.guzelcamli.luna.timing','content.stops.guzelcamli.luna.settings',0,'partially_verified','Protected-area landscape verified by DKMP; shooting advice is editorial.','2026-07-22T00:00:00+03:00'),
  ('60000000-0000-4000-8000-000000000003','20000000-0000-4000-8000-000000000003','luna_ultra','content.stops.bafaLake.luna.subject','content.stops.bafaLake.luna.note','content.stops.bafaLake.luna.lens','content.stops.bafaLake.luna.timing','content.stops.bafaLake.luna.settings',0,'partially_verified','Landscape and Herakleia verified by official sources; shooting advice is editorial.','2026-07-22T00:00:00+03:00')
on conflict (id) do update set subject_key = excluded.subject_key, body_key = excluded.body_key, lens_key = excluded.lens_key, timing_key = excluded.timing_key, settings_key = excluded.settings_key, verification_status = excluded.verification_status, source_note = excluded.source_note, last_verified_at = excluded.last_verified_at;

insert into public.warnings
  (id, stop_id, warning_type, severity, body_key, position, verification_status, source_note, last_verified_at)
values
  ('70000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001','road','warning','content.stops.izmir.warning1',0,'unverified','Operational guidance; verify current restrictions.',null),
  ('70000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000001','parking','warning','content.stops.izmir.warning2',1,'unverified','Parking and overnight rules change.',null),
  ('70000000-0000-4000-8000-000000000003','20000000-0000-4000-8000-000000000002','protected_area','warning','content.stops.guzelcamli.warning1',0,'partially_verified','https://ekotaban.tarimorman.gov.tr/alan/5156','2026-07-22T00:00:00+03:00'),
  ('70000000-0000-4000-8000-000000000004','20000000-0000-4000-8000-000000000002','overnight','warning','content.stops.guzelcamli.warning2',1,'unverified','Overnight permission requires direct confirmation.',null),
  ('70000000-0000-4000-8000-000000000005','20000000-0000-4000-8000-000000000003','road','warning','content.stops.bafaLake.warning1',0,'unverified','Final approach not field-verified for all Ducato lengths.',null),
  ('70000000-0000-4000-8000-000000000006','20000000-0000-4000-8000-000000000003','protected_area','warning','content.stops.bafaLake.warning2',1,'partially_verified','https://ekotaban.tarimorman.gov.tr/alan/630','2026-07-22T00:00:00+03:00')
on conflict (id) do update set warning_type = excluded.warning_type, severity = excluded.severity, body_key = excluded.body_key, verification_status = excluded.verification_status, source_note = excluded.source_note, last_verified_at = excluded.last_verified_at;

-- Placeholder Storage object paths. Upload matching assets to covers/gallery.
insert into public.galleries
  (id, route_id, stop_id, camping_spot_id, bucket, storage_path, external_url, alt_key, position, is_cover)
values
  ('80000000-0000-4000-8000-000000000001',null,'20000000-0000-4000-8000-000000000001',null,'covers','stops/izmir/cover.webp',null,'content.guide.izmir.photo1Alt',0,true),
  ('80000000-0000-4000-8000-000000000002',null,'20000000-0000-4000-8000-000000000001',null,'gallery','stops/izmir/kordon-ferries.webp',null,'content.guide.izmir.photo2Alt',1,false),
  ('80000000-0000-4000-8000-000000000003',null,'20000000-0000-4000-8000-000000000001',null,'gallery','stops/izmir/konak-evening.webp',null,'content.guide.izmir.photo3Alt',2,false),
  ('80000000-0000-4000-8000-000000000004',null,'20000000-0000-4000-8000-000000000002',null,'covers','stops/guzelcamli/cover.webp',null,'content.guide.guzelcamli.photo1Alt',0,true),
  ('80000000-0000-4000-8000-000000000005',null,'20000000-0000-4000-8000-000000000002',null,'gallery','stops/guzelcamli/rocky-coast.webp',null,'content.guide.guzelcamli.photo2Alt',1,false),
  ('80000000-0000-4000-8000-000000000006',null,'20000000-0000-4000-8000-000000000002',null,'gallery','stops/guzelcamli/coastal-habitat.webp',null,'content.guide.guzelcamli.photo3Alt',2,false),
  ('80000000-0000-4000-8000-000000000007',null,'20000000-0000-4000-8000-000000000003',null,'covers','stops/bafa-lake/cover.webp',null,'content.guide.bafaLake.photo1Alt',0,true),
  ('80000000-0000-4000-8000-000000000008',null,'20000000-0000-4000-8000-000000000003',null,'gallery','stops/bafa-lake/herakleia-stonework.webp',null,'content.guide.bafaLake.photo2Alt',1,false),
  ('80000000-0000-4000-8000-000000000009',null,'20000000-0000-4000-8000-000000000003',null,'gallery','stops/bafa-lake/dawn-boulders.webp',null,'content.guide.bafaLake.photo3Alt',2,false)
on conflict (id) do update set bucket = excluded.bucket, storage_path = excluded.storage_path, alt_key = excluded.alt_key, position = excluded.position, is_cover = excluded.is_cover;
