-- Researched operational content for a 15 m³ Fiat Ducato motorcaravan.
-- Scope is deliberately limited to Güzelçamlı, Bafa Lake and Faralya.
-- Research completed 2026-07-26; source URLs are retained on every critical record.

begin;

update public.stops as s
set
  overview_key = data.content_key || '.overview',
  why_visit_key = data.content_key || '.whyVisit',
  internet_score = data.internet_score,
  safety_score = data.safety_score,
  ducato_accessibility = data.legacy_access,
  ducato_access = data.ducato_access,
  road_surface = data.road_surface,
  road_width = data.road_width,
  steep_grade = data.steep_grade,
  hairpins = data.hairpins,
  cliff_exposure = data.cliff_exposure,
  guardrails = data.guardrails,
  turnaround_possible = data.turnaround_possible,
  last_mile_note_key = data.content_key || '.ops.lastMile',
  supply_note_key = data.content_key || '.ops.supply',
  decision_summary_key = data.content_key || '.ops.decision',
  verification_status = data.verification_status,
  source_note = data.source_note,
  last_verified_at = '2026-07-26T00:00:00+03:00',
  updated_at = now()
from (
  values
    (
      'guzelcamli', 'content.stops.guzelcamli', 4::smallint, 4::smallint,
      'good', 'comfortable', 'asphalt', 'normal', false, false, false,
      null::boolean, true, 'verified',
      'Cross-checked 2026-07-26: official national-park/DKMP material and Interior Ministry visitor rules; current Hayal Bahçesi operator page; official Shell Davutlar Exit listing; current Güzelçamlı supermarket listing. Sources: https://ekotaban.tarimorman.gov.tr/alan/5156 | https://www.icisleri.gov.tr/dilek-yarimadasinda-atli-jandarma-devriyesi | https://kusadasihayalbahcesi.com/ | https://find.shell.com/tr/fuel/11842669-davutlar-cikisi/tr_TR'
    ),
    (
      'bafa', 'content.stops.bafaLake', 3::smallint, 3::smallint,
      'caution', 'caution', 'asphalt', 'narrow', false, false, false,
      null::boolean, false, 'partially_verified',
      'Cross-checked 2026-07-26: Selenes operator camping rules; Milas Governor Herakleia record; official Bafa nature-park listing; current travel and connectivity reports. Selenes explicitly states that camping on the protected lakeshore and within Herakleia is prohibited. Sources: https://selenespansiyon.com/kamping/ | https://www.milas.gov.tr/heraklia-antik-kenti-bafa-golu | https://ekotaban.tarimorman.gov.tr/alan/630 | https://www.etstur.com/letsgo/bafa-golu-gezi-rehberi/'
    ),
    (
      'faralya', 'content.stops.faralya', 3::smallint, 2::smallint,
      'caution', 'caution', 'asphalt', 'narrow', true, true, true,
      null::boolean, false, 'partially_verified',
      'Cross-checked 2026-07-26: official Lycian Way and Fethiye/Butterfly Valley material; current 2026 motorcaravan road assessment; April 2026 rockfall report; current Bağ Camp operator/listing and camper reviews. Sources: https://likyayolu.ktb.gov.tr/TR-236152/pafta-2-faralya---alincak.html | https://www.fethiye.gov.tr/kelebekler-vadisi | https://www.kelebeklervadisi.com.tr/hakkinda/ | https://camperello.com/en/blog/is-it-possible-to-access-butterfly-valley-or-kabak-bay-by-caravan | https://www.dha.com.tr/gundem/fethiyede-yamactan-dusen-kaya-parcalari-yolu-kapatti-2852530 | https://park4night.com/fr/place/161610'
    )
) as data(
  slug, content_key, internet_score, safety_score, legacy_access,
  ducato_access, road_surface, road_width, steep_grade, hairpins,
  cliff_exposure, guardrails, turnaround_possible, verification_status,
  source_note
)
where s.slug = data.slug;

-- Existing freecamp placeholders are retained, but explicitly classified as
-- prohibited so they cannot be interpreted as usable overnight locations.
update public.camping_spots
set
  overnight_status = 'prohibited',
  ducato_access = 'do_not_enter',
  verification_status = 'verified',
  last_verified_at = '2026-07-26T00:00:00+03:00',
  source_note = case slug
    when 'guzelcamli-freecamp-unverified' then 'No legal freecamp coordinate is endorsed. Dilek Peninsula is a daytime protected-area visit; overnight camping is prohibited. Sources: https://www.icisleri.gov.tr/dilek-yarimadasinda-atli-jandarma-devriyesi | https://ekotaban.tarimorman.gov.tr/alan/5156'
    when 'bafa-freecamp-unverified' then 'The Selenes operator states that camping on the protected lakeshore and within Herakleia is prohibited. This locality-centroid placeholder is not an overnight destination. Source: https://selenespansiyon.com/kamping/'
  end,
  updated_at = now()
where slug in ('guzelcamli-freecamp-unverified', 'bafa-freecamp-unverified');

update public.camping_spots
set
  ducato_access = 'comfortable',
  overnight_status = 'allowed',
  beachfront = false,
  sea_view = false,
  distance_to_sea_m = 50,
  ground_surface = 'managed campsite',
  level_ground = true,
  shade_available = true,
  water_available = true,
  toilet_available = true,
  shower_available = true,
  waste_available = true,
  mobile_signal = 'good',
  crowd_level = 'medium',
  night_quiet = false,
  safety_note_key = 'content.stops.guzelcamli.spots.hayalBahcesi.safety',
  verification_status = 'verified',
  source_note = 'Operator confirms caravan pitches, water, electricity, hot showers and shared kitchen at Milli Park Cd. No:34, approximately 50 m from the beach and 700 m from the park entrance. Source: https://kusadasihayalbahcesi.com/',
  last_verified_at = '2026-07-26T00:00:00+03:00',
  updated_at = now()
where slug = 'hayal-bahcesi-caravan';

update public.camping_spots
set
  ducato_access = 'caution',
  overnight_status = 'allowed',
  beachfront = false,
  sea_view = true,
  ground_surface = 'garden',
  water_available = true,
  toilet_available = true,
  shower_available = true,
  mobile_signal = 'medium',
  crowd_level = 'low',
  night_quiet = true,
  safety_note_key = 'content.stops.bafaLake.spots.selenes.safety',
  recommended = true,
  verification_status = 'partially_verified',
  source_note = 'Operator confirms hosted garden camping and states that wild camping on the protected shore and within Herakleia is prohibited. Guest facilities include toilets/showers; exact Ducato pitch geometry and potable-water status require direct booking confirmation. Source: https://selenespansiyon.com/kamping/',
  last_verified_at = '2026-07-26T00:00:00+03:00',
  updated_at = now()
where slug = 'selenes-garden-camping';

update public.camping_spots
set recommended = false, updated_at = now()
where stop_id = (select id from public.stops where slug = 'faralya');

insert into public.camping_spots (
  id, stop_id, slug, content_key, title_key, spot_type, latitude, longitude,
  overview_key, price_note_key, access_note_key, rating, recommended, position,
  verification_status, source_note, last_verified_at, ducato_access,
  overnight_status, beachfront, sea_view, ground_surface, level_ground,
  capacity_vehicles, shade_available, water_available, toilet_available,
  shower_available, waste_available, mobile_signal, crowd_level, night_quiet,
  safety_note_key
)
select
  '76000000-0000-4000-8000-000000000001'::uuid, s.id,
  'bag-camp-kabak', 'content.stops.faralya.spots.bagCamp',
  'content.stops.faralya.spots.bagCamp.title', 'paid',
  36.465648, 29.1185047,
  'content.stops.faralya.spots.bagCamp.overview',
  'content.stops.faralya.spots.bagCamp.price',
  'content.stops.faralya.spots.bagCamp.access', 4.8, true, 11,
  'partially_verified',
  'Current operator/listing and 2026 camper reports confirm campervan spaces, six-place capacity, water, hot showers, toilets, electricity, Wi-Fi, panoramic sea view and a tight final entrance turn. Sources: https://www.campalow.com/en/campsite/bag-camp-kabak | https://park4night.com/fr/place/161610 | https://dogadakiler.com/Kamp-Alanlari/mugla-Kamp-Alanlari/bag-camp-kabak/',
  '2026-07-26T00:00:00+03:00', 'caution', 'allowed', false, true,
  'managed garden', true, 6, true, true, true, true, true, 'medium', 'low', true,
  'content.stops.faralya.spots.bagCamp.safety'
from public.stops as s where s.slug = 'faralya'
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
  last_verified_at = excluded.last_verified_at,
  ducato_access = excluded.ducato_access,
  overnight_status = excluded.overnight_status,
  beachfront = excluded.beachfront,
  sea_view = excluded.sea_view,
  ground_surface = excluded.ground_surface,
  level_ground = excluded.level_ground,
  capacity_vehicles = excluded.capacity_vehicles,
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

-- Replace vague facility placeholders with useful last-supply decisions.
with facility_data(slug, facility_type, available, name_key, notes_key, metadata, verification_status, source_note) as (
  values
    ('guzelcamli','market',true,'content.stops.guzelcamli.marketName','content.stops.guzelcamli.marketNotes','{"scope":"town"}'::jsonb,'verified','Current Şok branch listing and municipal market record; https://enyakinnerde.com/sok-market/detay/aydin-guzelcamli-siteler-magazasi | https://kusadasi.bel.tr/userfiles/01_03_2026_Tarih_ve_3_Nolu_Meclis_Karar%C4%B1_06032026_105429.pdf'),
    ('guzelcamli','fuel',true,'content.stops.guzelcamli.fuelName','content.stops.guzelcamli.fuelNotes','{"scope":"before_park","open_24h":true}'::jsonb,'verified','Official Shell Davutlar Exit listing; https://find.shell.com/tr/fuel/11842669-davutlar-cikisi/tr_TR'),
    ('guzelcamli','water',true,'content.stops.guzelcamli.waterName','content.stops.guzelcamli.waterNotes','{"scope":"campsite_guests","potable":"confirm"}'::jsonb,'verified','Hayal Bahçesi operator lists water for caravan guests; https://kusadasihayalbahcesi.com/'),
    ('guzelcamli','wc',true,'content.facilities.wc','content.guide.guzelcamli.wcNotes','{"scope":"campsite_and_park_hours"}'::jsonb,'verified','Hayal Bahçesi and designated national-park visitor facilities; https://kusadasihayalbahcesi.com/ | https://www.icisleri.gov.tr/dilek-yarimadasinda-atli-jandarma-devriyesi'),
    ('guzelcamli','shower',true,'content.facilities.shower','content.guide.guzelcamli.showerNotes','{"scope":"campsite_guests"}'::jsonb,'verified','Hayal Bahçesi operator lists hot showers; https://kusadasihayalbahcesi.com/'),
    ('guzelcamli','electricity',true,'content.facilities.electricity','content.guide.guzelcamli.electricityNotes','{"scope":"campsite_guests"}'::jsonb,'verified','Hayal Bahçesi operator lists electricity; https://kusadasihayalbahcesi.com/'),
    ('bafa','market',true,'content.stops.bafaLake.marketName','content.stops.bafaLake.marketNotes','{"scope":"D525_before_turn"}'::jsonb,'partially_verified','Kapıkırı is a small village with guesthouses; main provisioning is directed to the Söke–Milas corridor. Sources: https://www.milas.gov.tr/heraklia-antik-kenti-bafa-golu | https://selenespansiyon.com/kamping/'),
    ('bafa','fuel',true,'content.stops.bafaLake.fuelName','content.stops.bafaLake.fuelNotes','{"scope":"D525_before_turn"}'::jsonb,'verified','Official Shell Koru–Milas station listing confirms 24-hour diesel, shop and WC on the larger corridor; https://find.shell.com/tr/fuel/13137483-koru-milas/tr_TR'),
    ('bafa','water',true,'content.stops.bafaLake.waterName','content.stops.bafaLake.waterNotes','{"scope":"confirmed_host","potable":"confirm"}'::jsonb,'partially_verified','Hosted water can be requested at Selenes; potable status for motorhome filling is not published. https://selenespansiyon.com/kamping/'),
    ('bafa','wc',true,'content.facilities.wc','content.guide.bafaLake.wcNotes','{"scope":"hosted_camping"}'::jsonb,'partially_verified','Selenes operates guest and camping accommodation with sanitary facilities; https://selenespansiyon.com/kamping/'),
    ('bafa','shower',true,'content.facilities.shower','content.guide.bafaLake.showerNotes','{"scope":"hosted_camping"}'::jsonb,'partially_verified','Selenes guest accommodation documents shower facilities and hosts campers; https://selenespansiyon.com/kamping/'),
    ('faralya','market',true,'content.stops.faralya.marketName','content.stops.faralya.marketNotes','{"scope":"Fethiye_or_Ovacik_before_climb"}'::jsonb,'partially_verified','Current motorcaravan route assessment recommends provisioning in Fethiye or large markets before Ölüdeniz; https://camperello.com/en/blog/is-it-possible-to-access-butterfly-valley-or-kabak-bay-by-caravan'),
    ('faralya','fuel',true,'content.stops.faralya.fuelName','content.stops.faralya.fuelNotes','{"scope":"Ovacik_before_climb"}'::jsonb,'partially_verified','Fuel is available in the Fethiye/Ovacık urban approach; no station is documented on the cliff road.'),
    ('faralya','water',true,'content.stops.faralya.waterName','content.stops.faralya.waterNotes','{"scope":"booked_campsite","potable":"confirm"}'::jsonb,'verified','Bağ Camp lists water for guests; https://dogadakiler.com/Kamp-Alanlari/mugla-Kamp-Alanlari/bag-camp-kabak/'),
    ('faralya','wc',true,'content.facilities.wc','content.stops.faralya.municipality','{"scope":"booked_campsite"}'::jsonb,'verified','Bağ Camp lists toilets; https://park4night.com/fr/place/161610'),
    ('faralya','shower',true,'content.facilities.shower','content.stops.faralya.municipality','{"scope":"booked_campsite"}'::jsonb,'verified','Current camper reports confirm hot showers at Bağ Camp; https://park4night.com/fr/place/161610'),
    ('faralya','electricity',true,'content.facilities.electricity','content.stops.faralya.municipality','{"scope":"booked_campsite"}'::jsonb,'verified','Bağ Camp lists electricity; https://www.campalow.com/en/campsite/bag-camp-kabak')
)
update public.facilities as f
set
  available = d.available,
  name_key = d.name_key,
  notes_key = d.notes_key,
  metadata = d.metadata,
  verification_status = d.verification_status,
  source_note = d.source_note,
  last_verified_at = '2026-07-26T00:00:00+03:00'
from facility_data as d
join public.stops as s on s.slug = d.slug
where f.stop_id = s.id and f.facility_type = d.facility_type;

with missing_facilities(id, slug, facility_type, name_key, notes_key, source_note) as (
  values
    ('76000000-0000-4000-8100-000000000001'::uuid,'faralya','wc','content.facilities.wc','content.stops.faralya.municipality','Bağ Camp lists toilets; https://park4night.com/fr/place/161610'),
    ('76000000-0000-4000-8100-000000000002'::uuid,'faralya','shower','content.facilities.shower','content.stops.faralya.municipality','Bağ Camp camper reports confirm hot showers; https://park4night.com/fr/place/161610'),
    ('76000000-0000-4000-8100-000000000003'::uuid,'faralya','electricity','content.facilities.electricity','content.stops.faralya.municipality','Bağ Camp lists electricity; https://www.campalow.com/en/campsite/bag-camp-kabak')
)
insert into public.facilities (
  id, stop_id, facility_type, available, is_municipal, name_key, notes_key,
  metadata, verification_status, source_note, last_verified_at
)
select m.id, s.id, m.facility_type, true, false, m.name_key, m.notes_key,
  '{"scope":"booked_campsite"}'::jsonb, 'verified', m.source_note,
  '2026-07-26T00:00:00+03:00'
from missing_facilities as m
join public.stops as s on s.slug = m.slug
where not exists (
  select 1 from public.facilities f
  where f.stop_id = s.id and f.facility_type = m.facility_type
)
on conflict (id) do update set
  available = excluded.available,
  name_key = excluded.name_key,
  notes_key = excluded.notes_key,
  metadata = excluded.metadata,
  verification_status = excluded.verification_status,
  source_note = excluded.source_note,
  last_verified_at = excluded.last_verified_at;

-- Location-specific risks replace generic warnings without changing row identity.
with warning_data(slug, position, warning_type, severity, body_key, verification_status, source_note) as (
  values
    ('guzelcamli',0,'protected_area','danger','content.stops.guzelcamli.warning1','verified','Official visitor rules and park record; https://www.icisleri.gov.tr/dilek-yarimadasinda-atli-jandarma-devriyesi | https://ekotaban.tarimorman.gov.tr/alan/5156'),
    ('guzelcamli',1,'access','warning','content.stops.guzelcamli.warning2','partially_verified','Capacity control and seasonal access-hour reports cross-checked with national-park visitor rules.'),
    ('bafa',0,'road','warning','content.stops.bafaLake.warning1','partially_verified','Kapıkırı road and village geometry cross-checked with mapping, operator directions and current visitor guides.'),
    ('bafa',1,'protected_area','danger','content.stops.bafaLake.warning2','verified','Selenes explicitly states lakeshore/Herakleia camping prohibition; https://selenespansiyon.com/kamping/'),
    ('faralya',0,'road','danger','content.stops.faralya.warning1','partially_verified','Current motorcaravan assessment and April 2026 rockfall closure; https://camperello.com/en/blog/is-it-possible-to-access-butterfly-valley-or-kabak-bay-by-caravan | https://www.dha.com.tr/gundem/fethiyede-yamactan-dusen-kaya-parcalari-yolu-kapatti-2852530'),
    ('faralya',1,'road','danger','content.stops.faralya.warning2','verified','Official valley operator states there is no road in Butterfly Valley; Kabak descent cross-checked with current caravan sources. https://www.kelebeklervadisi.com.tr/hakkinda/ | https://camperello.com/en/blog/is-it-possible-to-access-butterfly-valley-or-kabak-bay-by-caravan')
)
update public.warnings as w
set warning_type = d.warning_type,
    severity = d.severity,
    body_key = d.body_key,
    verification_status = d.verification_status,
    source_note = d.source_note,
    last_verified_at = '2026-07-26T00:00:00+03:00'
from warning_data as d
join public.stops as s on s.slug = d.slug
where w.stop_id = s.id and w.position = d.position;

-- Refresh existing activities and add Faralya's missing decision-useful entries.
with activity_data(id, slug, activity_type, title_key, description_key, position, verification_status, source_note) as (
  values
    ('50000000-0000-4000-8000-000000000004'::uuid,'guzelcamli','hidden_place','content.guide.guzelcamli.hiddenTitle','content.guide.guzelcamli.hiddenDescription',0,'verified','Official protected-area record; https://ekotaban.tarimorman.gov.tr/alan/5156'),
    ('50000000-0000-4000-8000-000000000005'::uuid,'guzelcamli','beach','content.guide.guzelcamli.beachTitle','content.guide.guzelcamli.beachDescription',1,'verified','Official visitor rules require designated roads and cove car parks; https://www.icisleri.gov.tr/dilek-yarimadasinda-atli-jandarma-devriyesi'),
    ('50000000-0000-4000-8000-000000000006'::uuid,'guzelcamli','note','content.guide.guzelcamli.practicalTitle','content.guide.guzelcamli.practicalDescription',2,'verified','Operational plan derived from official visitor rules and verified campsite services.'),
    ('50000000-0000-4000-8000-000000000007'::uuid,'bafa','hidden_place','content.guide.bafaLake.hiddenTitle','content.guide.bafaLake.hiddenDescription',0,'verified','Official Herakleia record; https://www.milas.gov.tr/heraklia-antik-kenti-bafa-golu'),
    ('50000000-0000-4000-8000-000000000008'::uuid,'bafa','beach','content.guide.bafaLake.beachTitle','content.guide.bafaLake.beachDescription',1,'verified','Official nature-park record and operator camping restriction; https://ekotaban.tarimorman.gov.tr/alan/630 | https://selenespansiyon.com/kamping/'),
    ('50000000-0000-4000-8000-000000000009'::uuid,'bafa','note','content.guide.bafaLake.practicalTitle','content.guide.bafaLake.practicalDescription',2,'partially_verified','Conservative Ducato supply plan based on village scale, protected status and hosted camping.'),
    ('76000000-0000-4000-8200-000000000001'::uuid,'faralya','hidden_place','content.guide.faralya.hiddenTitle','content.guide.faralya.hiddenDescription',0,'verified','Official valley information confirms there is no road on the valley floor; https://www.kelebeklervadisi.com.tr/hakkinda/'),
    ('76000000-0000-4000-8200-000000000002'::uuid,'faralya','beach','content.guide.faralya.beachTitle','content.guide.faralya.beachDescription',1,'partially_verified','Current motorcaravan road assessment advises against the Kabak beach descent; https://camperello.com/en/blog/is-it-possible-to-access-butterfly-valley-or-kabak-bay-by-caravan'),
    ('76000000-0000-4000-8200-000000000003'::uuid,'faralya','hiking','content.guide.faralya.hikingTitle','content.guide.faralya.hikingDescription',2,'verified','Official Lycian Way Faralya–Alınca stage; https://likyayolu.ktb.gov.tr/TR-236152/pafta-2-faralya---alincak.html'),
    ('76000000-0000-4000-8200-000000000004'::uuid,'faralya','viewpoint','content.guide.faralya.viewpointTitle','content.guide.faralya.viewpointDescription',3,'partially_verified','Operational safety guidance based on the documented narrow cliff road and current rockfall history.'),
    ('76000000-0000-4000-8200-000000000005'::uuid,'faralya','note','content.guide.faralya.practicalTitle','content.guide.faralya.practicalDescription',4,'partially_verified','Conservative Ducato plan based on verified upper camps and unsuitable bay descents.')
)
insert into public.activities (
  id, stop_id, activity_type, title_key, description_key, position,
  verification_status, source_note, last_verified_at
)
select d.id, s.id, d.activity_type, d.title_key, d.description_key, d.position,
  d.verification_status, d.source_note, '2026-07-26T00:00:00+03:00'
from activity_data as d
join public.stops as s on s.slug = d.slug
on conflict (id) do update set
  stop_id = excluded.stop_id,
  activity_type = excluded.activity_type,
  title_key = excluded.title_key,
  description_key = excluded.description_key,
  position = excluded.position,
  verification_status = excluded.verification_status,
  source_note = excluded.source_note,
  last_verified_at = excluded.last_verified_at;

commit;
