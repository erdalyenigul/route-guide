-- Applies the user-supplied İzmir–Lara operational research dated 2026-07-26.
-- Scope: content/data only. Coordinates for community candidates inherit the
-- existing stop coordinate and are explicitly marked approximate.

begin;

with data(slug, content_name, ducato_access, road_surface, road_width, steep_grade, hairpins, cliff_exposure, turnaround_possible, verification_status, source_note) as (
  values
    ('guzelcamli','guzelcamli','comfortable','asphalt','normal',false,false,false,true,'verified','User-supplied research: national-park capacity/access reporting and Davutlar public caravan-area listing. https://www.iha.com.tr/aydin-haberleri/milli-parka-gunluk-arac-giris-kapasitesi-belirlendi-82568631 | https://bikaravan.com/en/camp-grounds/AYDIN/kusadasi-davutlar-belediye-karavan-alani-85'),
    ('bafa','bafaLake','caution','asphalt','narrow',false,false,false,false,'partially_verified','User-supplied research: protected-shore camping restriction and community candidates. https://selenespansiyon.com/kamping/'),
    ('gumusluk','gumusluk','caution','asphalt','narrow',false,false,false,false,'partially_verified','User-supplied research: Mandi operator and community records. https://mandicamping.com/'),
    ('akyarlar','akyarlar','caution','mixed','narrow',false,false,false,true,'partially_verified','User-supplied research: Fenerburnu community candidate and Cüce operator. https://www.kolaykal.com/en/yer/bodrum-sahili-ucretsiz-otopark-ve-kamp-alani | https://cucecampingbodrum.com/'),
    ('mazi','mazi','caution','mixed',null,null,null,null,null,'unverified','User-supplied research found no strong Mazı-specific vehicle freecamp or final-road geometry; retain an explicit daytime-exploration decision.'),
    ('akbuk','akbuk','caution','mixed','narrow',null,null,null,null,'partially_verified','User-supplied research: protected-area enforcement and older campsite service listings. https://mugla.csb.gov.tr/haberler/akbuk-koyu-denetimi-286814'),
    ('dalyan','dalyan','comfortable','asphalt','normal',false,false,false,true,'partially_verified','User-supplied research: main town approach is usable; compact centre and İztuzu protected overnight restriction are separate decisions.'),
    ('karaot','karaotBeach','comfortable','mixed','normal',false,false,false,true,'partially_verified','User-supplied research: municipal beach facilities plus multiple current community reports. https://www.fethiye.bel.tr/3527/karaot-halk-plaji-sezona-hazir'),
    ('faralya','faralya','caution','asphalt','narrow',true,true,true,false,'partially_verified','User-supplied research preserves separate Faralya upper-road, viewpoint and Kabak beach-descent decisions.'),
    ('kas','kas','caution','asphalt','narrow',false,true,true,false,'verified','User-supplied research: official campground list and campsite operators. https://kas.gov.tr/kamp-alanlari | https://kascamping.net/ | https://kasolympos.com/'),
    ('cirali','cirali','caution','asphalt','narrow',true,true,false,false,'verified','User-supplied research: campsite operators and protected-beach context. https://olympos222camping.com/ | https://www.enginpansiyon.com/cirali-camping.aspx'),
    ('lara','lara','comfortable','asphalt','normal',false,false,false,true,'partially_verified','User-supplied June 2026 municipal project and news sources conflict on opening timing; verify operation before arrival. https://yesilkent.antalya.bel.tr/Projeler/ProjeDetay/6 | https://www.dha.com.tr/yerel-haberler/antalya/buyuksehirden-laraya-yeni-karavan-parki-2884905')
)
update public.stops s set
  ducato_access=d.ducato_access,
  ducato_accessibility=case d.ducato_access when 'comfortable' then 'good' when 'caution' then 'caution' when 'leave_above' then 'difficult' else 'difficult' end,
  road_surface=d.road_surface, road_width=d.road_width, steep_grade=d.steep_grade,
  hairpins=d.hairpins, cliff_exposure=d.cliff_exposure,
  turnaround_possible=d.turnaround_possible,
  last_mile_note_key='content.stops.'||d.content_name||'.ops.lastMile',
  supply_note_key='content.stops.'||d.content_name||'.ops.supply',
  decision_summary_key='content.stops.'||d.content_name||'.ops.decision',
  verification_status=d.verification_status, source_note=d.source_note,
  last_verified_at='2026-07-26T00:00:00+03:00', updated_at=now()
from data d where s.slug=d.slug;

-- Existing managed alternatives remain paid/municipal and receive services only
-- at the camping_spot level, never as free stop-wide facilities.
with managed(slug, ducato_access, overnight_status, water, toilet, shower, waste, source_note) as (
  values
    ('hayal-bahcesi-caravan','comfortable','allowed',true,true,true,false,'Existing verified Güzelçamlı managed base; national-park parking remains daytime only.'),
    ('selenes-garden-camping','caution','allowed',true,true,true,false,'Operator confirms garden camping, shared kitchen, charging, two showers and two WC. https://selenespansiyon.com/kamping/'),
    ('mandi-camping','caution','allowed',true,true,true,true,'Operator services: fresh water, grey water, electricity and two cassette terminals. https://mandicamping.com/'),
    ('cuce-camping-akyarlar','comfortable','allowed',true,true,true,true,'Operator services: pitch water/electricity/wastewater, showers, WC and security. https://cucecampingbodrum.com/'),
    ('pasali-camping-caravan','caution','allowed',true,true,true,true,'Managed Akbük alternative retained; current operation must be confirmed due seasonal/older service evidence.'),
    ('sarigerme-municipal-caravan','comfortable','allowed',true,true,true,false,'Controlled municipal alternative retained for the Dalyan stage; İztuzu remains daytime-only.'),
    ('onur-camping-caravan','comfortable','allowed',true,true,true,false,'Managed alternative retained separately from the Karaot public-beach candidate.'),
    ('aydede-camping-oludeniz','comfortable','allowed',true,true,true,false,'Managed lower Ovacık base for travellers leaving the Ducato below Faralya.'),
    ('bag-camp-kabak','caution','allowed',true,true,true,true,'Upper Kabak managed pitch; never implies Ducato access to Kabak beach.'),
    ('kas-camping','comfortable','allowed',true,true,true,true,'Kaş Camping lists water, grey-water and cassette disposal, shower and WC. https://kascamping.net/'),
    ('olympos-222-camping-van','caution','allowed',true,true,true,false,'Operator confirms clean water and 220 V at caravan pitches. https://olympos222camping.com/')
)
update public.camping_spots c set
  ducato_access=m.ducato_access, overnight_status=m.overnight_status,
  water_available=m.water, toilet_available=m.toilet, shower_available=m.shower,
  waste_available=m.waste, verification_status=case when c.slug in ('pasali-camping-caravan','sarigerme-municipal-caravan') then 'partially_verified' else c.verification_status end,
  source_note=m.source_note, last_verified_at='2026-07-26T00:00:00+03:00', updated_at=now()
from managed m where c.slug=m.slug;

-- Preserve prohibited Bafa shore placeholders and stop them being interpreted
-- as a legal freecamp.
update public.camping_spots set overnight_status='prohibited', ducato_access='do_not_enter', recommended=false,
  verification_status='verified', source_note='Protected Bafa shore/Herakleia is not a legal freecamp. https://selenespansiyon.com/kamping/',
  last_verified_at='2026-07-26T00:00:00+03:00', updated_at=now()
where slug='bafa-freecamp-unverified';

-- Deterministic community/public candidates. Existing stop coordinates are used
-- only as approximate locality coordinates; exact entrance navigation is not claimed.
with candidates(id, stop_slug, slug, content_key, spot_type, overnight_status, ducato_access, beachfront, sea_view, ground_surface, level_ground, water, toilet, shower, waste, recommended, position, verification_status, source_note) as (
  values
    ('77000000-0000-4000-8000-000000000000'::uuid,'guzelcamli','davutlar-public-caravan-area','content.stops.guzelcamli.spots.davutlar','municipality','allowed','comfortable',false,false,'managed',true,true,true,true,false,false,20,'partially_verified','Community listing describes a public municipal caravan area with market, WC, shower and parking. Approximate settlement coordinate; follow current signs. https://bikaravan.com/en/camp-grounds/AYDIN/kusadasi-davutlar-belediye-karavan-alani-85'),
    ('77000000-0000-4000-8000-000000000001'::uuid,'akyarlar','fenerburnu-arrival-check','content.stops.akyarlar.spots.fenerburnu','freecamp','restricted','caution',true,true,'mixed',false,false,false,false,false,false,20,'partially_verified','Community candidate only; current signs and legality must be checked on arrival. Approximate stop coordinate, not a verified entrance. https://www.kolaykal.com/en/yer/bodrum-sahili-ucretsiz-otopark-ve-kamp-alani'),
    ('77000000-0000-4000-8000-000000000002'::uuid,'karaot','karaot-public-beach-candidate','content.stops.karaotBeach.spots.karaotFree','freecamp','tolerated','comfortable',true,false,'mixed',true,true,true,true,true,true,20,'partially_verified','Strong community evidence plus municipal beach services; current overnight signs override the record. Approximate existing Karaot stop coordinate. https://www.fethiye.bel.tr/3527/karaot-halk-plaji-sezona-hazir'),
    ('77000000-0000-4000-8000-000000000003'::uuid,'lara','volkan-konak-caravan-park','content.stops.lara.spots.volkanKonak','municipality','restricted','comfortable',true,false,'managed',true,true,true,true,true,true,20,'partially_verified','Official June 2026 project lists about 120 pitches and services, while same-week news said opening was imminent. Verify operation. Approximate Lara locality coordinate. https://yesilkent.antalya.bel.tr/Projeler/ProjeDetay/6')
)
insert into public.camping_spots(id,stop_id,slug,content_key,title_key,spot_type,latitude,longitude,overview_key,price_note_key,access_note_key,rating,recommended,position,verification_status,source_note,last_verified_at,ducato_access,overnight_status,beachfront,sea_view,ground_surface,level_ground,water_available,toilet_available,shower_available,waste_available,mobile_signal,crowd_level,night_quiet,safety_note_key)
select c.id,s.id,c.slug,c.content_key,c.content_key||'.title',c.spot_type,s.latitude,s.longitude,c.content_key||'.overview',c.content_key||'.price',c.content_key||'.access',0,c.recommended,c.position,c.verification_status,c.source_note,'2026-07-26T00:00:00+03:00',c.ducato_access,c.overnight_status,c.beachfront,c.sea_view,c.ground_surface,c.level_ground,c.water,c.toilet,c.shower,c.waste,'unknown','unknown',null,c.content_key||'.safety'
from candidates c join public.stops s on s.slug=c.stop_slug
on conflict(slug) do update set stop_id=excluded.stop_id,content_key=excluded.content_key,title_key=excluded.title_key,spot_type=excluded.spot_type,overview_key=excluded.overview_key,price_note_key=excluded.price_note_key,access_note_key=excluded.access_note_key,recommended=excluded.recommended,position=excluded.position,verification_status=excluded.verification_status,source_note=excluded.source_note,last_verified_at=excluded.last_verified_at,ducato_access=excluded.ducato_access,overnight_status=excluded.overnight_status,beachfront=excluded.beachfront,sea_view=excluded.sea_view,ground_surface=excluded.ground_surface,level_ground=excluded.level_ground,water_available=excluded.water_available,toilet_available=excluded.toilet_available,shower_available=excluded.shower_available,waste_available=excluded.waste_available,safety_note_key=excluded.safety_note_key,updated_at=now();

-- Spot-scoped facilities prevent a campsite service from being presented as
-- freely available throughout the destination.
with service(spot_slug, facility_type, available, source_note) as (
  values
    ('davutlar-public-caravan-area','water',true,'Community-listed public-area service'),('davutlar-public-caravan-area','wc',true,'Community-listed public-area service'),('davutlar-public-caravan-area','shower',true,'Community-listed public-area service'),('davutlar-public-caravan-area','market',true,'Available in settlement'),
    ('mandi-camping','water',true,'Mandi guest service'),('mandi-camping','electricity',true,'Mandi guest service'),('mandi-camping','waste_disposal',true,'Mandi grey-water/cassette service'),
    ('cuce-camping-akyarlar','water',true,'Cüce guest service'),('cuce-camping-akyarlar','electricity',true,'Cüce guest service'),('cuce-camping-akyarlar','waste_disposal',true,'Cüce guest service'),('cuce-camping-akyarlar','wc',true,'Cüce guest service'),('cuce-camping-akyarlar','shower',true,'Cüce guest service'),
    ('karaot-public-beach-candidate','water',true,'Community-reported beach water; potability unconfirmed'),('karaot-public-beach-candidate','wc',true,'Municipal/community beach facility'),('karaot-public-beach-candidate','shower',true,'Municipal/community beach facility'),('karaot-public-beach-candidate','waste_bins',true,'Community-reported municipal bins'),
    ('kas-camping','water',true,'Kaş Camping guest service'),('kas-camping','waste_disposal',true,'Kaş Camping grey-water/cassette service'),('kas-camping','wc',true,'Kaş Camping guest service'),('kas-camping','shower',true,'Kaş Camping guest service'),
    ('olympos-222-camping-van','water',true,'222 Camping guest service'),('olympos-222-camping-van','electricity',true,'222 Camping 220 V guest service'),
    ('volkan-konak-caravan-park','water',true,'Municipal project; verify opening'),('volkan-konak-caravan-park','waste_disposal',true,'Municipal project; verify opening'),('volkan-konak-caravan-park','wc',true,'Municipal project; verify opening'),('volkan-konak-caravan-park','shower',true,'Municipal project; verify opening'),('volkan-konak-caravan-park','market',true,'Municipal project; verify opening')
), rows as (
  select (substr(md5('research-service:'||sv.spot_slug||':'||sv.facility_type),1,8)||'-'||substr(md5('research-service:'||sv.spot_slug||':'||sv.facility_type),9,4)||'-4'||substr(md5('research-service:'||sv.spot_slug||':'||sv.facility_type),14,3)||'-8'||substr(md5('research-service:'||sv.spot_slug||':'||sv.facility_type),18,3)||'-'||substr(md5('research-service:'||sv.spot_slug||':'||sv.facility_type),21,12))::uuid id,c.stop_id,c.id camping_spot_id,sv.*
  from service sv join public.camping_spots c on c.slug=sv.spot_slug
)
insert into public.facilities(id,stop_id,camping_spot_id,facility_type,available,is_municipal,name_key,notes_key,metadata,verification_status,source_note,last_verified_at)
select id,stop_id,camping_spot_id,facility_type,available,false,'content.facilities.'||case when facility_type='water' then 'freshWater' when facility_type='waste_disposal' then 'wasteDisposal' else facility_type end,null,'{"scope":"camping_spot_guests"}'::jsonb,case when spot_slug in ('karaot-public-beach-candidate','volkan-konak-caravan-park') then 'partially_verified' else 'verified' end,source_note,'2026-07-26T00:00:00+03:00' from rows
on conflict(id) do update set stop_id=excluded.stop_id,camping_spot_id=excluded.camping_spot_id,available=excluded.available,metadata=excluded.metadata,verification_status=excluded.verification_status,source_note=excluded.source_note,last_verified_at=excluded.last_verified_at;

-- Replace generic warning rows in place by deterministic stop + position lookup.
with warning_data(slug,position,warning_type,severity,body_key,verification_status,source_note) as (
  values
    ('guzelcamli',0,'protected_area','danger','content.stops.guzelcamli.warning1','verified','National park is daytime-only and capacity controlled.'),('guzelcamli',1,'access','warning','content.stops.guzelcamli.warning2','partially_verified','Hours and fire restrictions can change.'),
    ('bafa',0,'road','warning','content.stops.bafaLake.warning1','partially_verified','Kapıkırı final village geometry.'),('bafa',1,'protected_area','danger','content.stops.bafaLake.warning2','verified','Protected shore/Herakleia camping prohibited.'),
    ('gumusluk',0,'road','warning','content.stops.gumusluk.warning1','partially_verified','Narrow centre and summer parking.'),('gumusluk',1,'overnight','warning','content.stops.gumusluk.warning2','unverified','No correctly located legal freecamp verified.'),
    ('akyarlar',0,'weather','warning','content.stops.akyarlar.warning1','partially_verified','Wind and mixed sloping Fenerburnu ground.'),('akyarlar',1,'overnight','warning','content.stops.akyarlar.warning2','partially_verified','Community record requires arrival verification.'),
    ('mazi',0,'road','danger','content.stops.mazi.warning1','unverified','Final cove geometry unresolved.'),('mazi',1,'fire','danger','content.stops.mazi.warning2','partially_verified','Forest restrictions/emergency access.'),
    ('akbuk',0,'protected_area','danger','content.stops.akbuk.warning1','verified','Protected-area occupation/environment enforcement.'),('akbuk',1,'access','warning','content.stops.akbuk.warning2','partially_verified','Season and final road require confirmation.'),
    ('dalyan',0,'protected_area','danger','content.stops.dalyan.warning1','partially_verified','İztuzu is not overnight motorhome parking.'),('dalyan',1,'access','warning','content.stops.dalyan.warning2','partially_verified','Keep vehicle out of reeds/wetland/beach.'),
    ('karaot',0,'protected_area','danger','content.stops.karaotBeach.warning1','partially_verified','Keep to established parking outside habitat.'),('karaot',1,'overnight','warning','content.stops.karaotBeach.warning2','partially_verified','Current signs override historic reports.'),
    ('faralya',0,'road','danger','content.stops.faralya.warning1','partially_verified','Narrow exposed Faralya road.'),('faralya',1,'road','danger','content.stops.faralya.warning2','verified','Kabak beach descent is do-not-enter for Ducato.'),
    ('kas',0,'road','warning','content.stops.kas.warning1','verified','Old town narrow/summer parking pressure.'),('kas',1,'overnight','warning','content.stops.kas.warning2','partially_verified','Roadside beaches are not overnight areas.'),
    ('cirali',0,'protected_area','danger','content.stops.cirali.warning1','verified','Turtle nesting and beach-night rules.'),('cirali',1,'road','warning','content.stops.cirali.warning2','partially_verified','Tight garden entrances.'),
    ('lara',0,'operation','warning','content.stops.lara.warning1','partially_verified','June 2026 opening-status conflict.'),('lara',1,'overnight','warning','content.stops.lara.warning2','partially_verified','Urban beach parking is not the official park.')
)
update public.warnings w set warning_type=d.warning_type,severity=d.severity,body_key=d.body_key,verification_status=d.verification_status,source_note=d.source_note,last_verified_at='2026-07-26T00:00:00+03:00'
from warning_data d join public.stops s on s.slug=d.slug where w.stop_id=s.id and w.position=d.position;

commit;
