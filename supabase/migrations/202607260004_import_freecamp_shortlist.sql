-- Imports the user-supplied freecamp shortlist dated 2026-07-26.
-- Community records are candidates, not guarantees of legal overnight use.
-- Restricted/inaccessible records and records without coordinates are omitted.

begin;

with shortlist(
  id, nearest_stop_slug, slug, title_suffix, latitude, longitude, class_key,
  overnight_status, ducato_access, capacity, beachfront, sea_view,
  ground_surface, level_ground, water, toilet, shower, waste, mobile_signal,
  crowd_level, recommended, position, report_date, source_url, evidence_note
) as (
  values
    ('78000000-0000-4000-8000-000000000001'::uuid,'bafa','didim-altinkum-yali','didimYali',37.3569,27.2832,'good','restricted','comfortable',2,true,true,null,null,false,false,false,false,'good','high',false,101,'2025-10-25','https://park4night.com/en/place/647863','Small capacity near swimming; seasonal crowd risk.'),
    ('78000000-0000-4000-8000-000000000002'::uuid,'bafa','didim-altinkum-19-sokak','didim19',37.3577,27.2820,'good','restricted','comfortable',10,true,false,null,null,false,false,false,false,'good','high',false,102,'2025-10-25','https://park4night.com/en/place/647866','Free day/night parking near Altınkum beach.'),
    ('78000000-0000-4000-8000-000000000003'::uuid,'bafa','didim-aytepe-caddesi','didimAytepe',37.3475,27.2684,'backup','restricted','caution',null,false,false,null,false,false,true,true,false,'unknown','unknown',false,103,'2026-01-14','https://park4night.com/en/place/647867','WC and shower reported, but the current report says it is too sloped for overnight comfort.'),

    ('78000000-0000-4000-8000-000000000004'::uuid,'gumusluk','bodrum-seyit-kaptan','bodrumSeyit',37.0297,27.4413,'strong','tolerated','comfortable',30,true,true,'gravel',true,false,false,false,true,'good','medium',true,104,'2026-04-01','https://park4night.com/en/place/666272','Quiet off-season night, easy parking, promenade and services nearby; strongest Bodrum/Datça ferry base candidate.'),
    ('78000000-0000-4000-8000-000000000005'::uuid,'gumusluk','bodrum-kumbahce-sahil','bodrumKumbahce',37.0298,27.4389,'backup','restricted','caution',2,true,true,'mixed',false,false,false,false,false,'unknown','high',false,105,'2026-04-01','https://park4night.com/en/place/664305','Not fully level; soft/stabilised ground and pooling risk after heavy rain.'),
    ('78000000-0000-4000-8000-000000000006'::uuid,'gumusluk','bodrum-20-eren-sokak','bodrumEren',37.0232,27.3494,'good','restricted','comfortable',4,false,false,null,true,false,false,false,true,'good','medium',false,106,null,'https://park4night.com/en/place/404458','Access explicitly described as easy for long/high motorhomes, but no current user review.'),

    ('78000000-0000-4000-8000-000000000007'::uuid,'akbuk','akyaka-kultak-yolu','akyakaKultak',37.0480,28.2839,'backup','restricted','caution',1,false,false,null,null,false,false,false,false,'unknown','unknown',false,107,'2025-10-06','https://park4night.com/en/place/644514','One-motorhome capacity; arrival check required.'),
    ('78000000-0000-4000-8000-000000000008'::uuid,'dalyan','koycegiz-lakeside','koycegizLake',36.9568,28.6862,'strong','tolerated','comfortable',5,false,true,null,true,true,false,false,false,'good','medium',true,108,'2026-04-11','https://park4night.com/en/place/668618','Direct lakeside candidate with drinking water, mobile data and nearby market/restaurants.'),
    ('78000000-0000-4000-8000-000000000009'::uuid,'dalyan','koycegiz-ataturk-bulvari','koycegizCenter',36.9654,28.6880,'strong','tolerated','comfortable',null,false,false,'paved',true,true,false,false,false,'good','medium',true,109,'2026-03-01','https://park4night.com/en/place/490532','Large free central parking near municipal patrols, shops and restaurants; local motorhomes reported.'),
    ('78000000-0000-4000-8000-000000000010'::uuid,'dalyan','koycegiz-nature-spot','koycegizNature',36.8672,28.6194,'backup','restricted','caution',10,false,false,null,null,false,false,false,false,'good','low',false,110,'2023-01-01','https://park4night.com/en/place/477737','Quiet winter nature candidate but evidence is old.'),

    ('78000000-0000-4000-8000-000000000011'::uuid,'karaot','fethiye-muammer-aksoy','fethiyeMuammer',36.6335,29.1216,'strong','tolerated','comfortable',5,false,false,'paved',true,false,false,false,false,'unknown','low',true,111,'2026-04-28','https://park4night.com/en/place/569708','Authorised free parking described as calm and suitable for 6–7 m vehicles.'),
    ('78000000-0000-4000-8000-000000000012'::uuid,'karaot','fethiye-atapark','fethiyeAtapark',36.6200,29.0912,'strong','tolerated','comfortable',20,false,false,'paved',true,true,false,false,false,'good','medium',true,112,'2026-05-16','https://park4night.com/en/place/370813','Current high-capacity candidate with drinking water, Wi-Fi and mobile data.'),
    ('78000000-0000-4000-8000-000000000013'::uuid,'karaot','fethiye-518-sokak','fethiyeMarina',36.6249,29.1188,'good','restricted','comfortable',null,false,false,'paved',true,true,true,false,false,'good','high',false,113,'2026-01-01','https://park4night.com/en/place/16916','Central marina candidate with WC and drinking water; market-day parking restrictions can trap large vehicles.'),
    ('78000000-0000-4000-8000-000000000014'::uuid,'karaot','fethiye-kumsal-sokak','fethiyeKumsal',36.6798,29.0901,'backup','restricted','comfortable',20,true,false,'paved',true,false,false,false,false,'unknown','high',false,114,'2026-04-18','https://park4night.com/en/place/570213','Large-vehicle access is easy, but evening crowds, loud music and traffic noise are reported.'),

    ('78000000-0000-4000-8000-000000000015'::uuid,'kas','kalkan-iskele-sokak','kalkanPier',36.2628,29.4085,'strong','tolerated','comfortable',10,true,true,null,true,false,false,false,false,'unknown','medium',true,115,'2026-07-02','https://www.park4night.com/en/place/288279','Two-night 2026 report; sea view and swimming, useful Kalkan/Kaputaş base, no services.'),
    ('78000000-0000-4000-8000-000000000016'::uuid,'kas','kas-hastane-antik-tiyatro','kasTheatre',36.1993,29.6330,'strong','tolerated','comfortable',10,false,false,'roadside',true,true,false,false,false,'good','medium',true,116,'2026-05-16','https://www.park4night.com/en/place/103635','Current calm overnight reports, public water beside campsite entrance and walkable centre.'),
    ('78000000-0000-4000-8000-000000000017'::uuid,'kas','kas-buyuk-cakil','kasBuyukCakil',36.1932,29.6491,'good','restricted','caution',null,true,true,null,null,true,false,false,false,'unknown','unknown',false,117,'2023-01-01','https://park4night.com/en/place/407595','Reported suitable even for large vehicles and has hose-access drinking water; approach is narrow and evidence is old.'),
    ('78000000-0000-4000-8000-000000000018'::uuid,'kas','kas-demokrasi-view','kasDemokrasi',36.1899,29.6019,'good','restricted','caution',1,false,true,'roadside',true,false,false,false,false,'unknown','medium',false,118,'2026-05-01','https://park4night.com/en/place/560245','Single roadside space with sea/Meis view and calm 2026 reports; may be unsuitable in season.'),

    ('78000000-0000-4000-8000-000000000019'::uuid,'cirali','demre-myra-karabucak','demreMyra',36.2569,29.9859,'strong','tolerated','comfortable',null,false,false,'paved',true,true,true,false,false,'good','medium',true,119,'2026-06-08','https://park4night.com/en/place/70041','Multiple 2026 reports confirm free, safe/calm overnight, water, WC, Wi-Fi and walkable Myra.'),
    ('78000000-0000-4000-8000-000000000020'::uuid,'cirali','demre-noel-baba','demreNoel',36.2435,29.9851,'strong','tolerated','comfortable',22,false,false,'gravel',true,false,false,false,false,'unknown','medium',true,120,'2026-05-12','https://park4night.com/en/place/606595','Large flat central gravel parking with easy 2026 access.'),
    ('78000000-0000-4000-8000-000000000021'::uuid,'cirali','demre-akdeniz-bulvari','demreAkdeniz',36.2381,30.0194,'good','restricted','comfortable',6,true,false,'paved',true,false,false,false,false,'unknown','medium',false,121,'2026-05-22','https://park4night.com/en/place/516407','Fallback used after police rejected a different beach location; do not assume all Demre coast parking is tolerated.'),
    ('78000000-0000-4000-8000-000000000022'::uuid,'cirali','finike-demre-road','finikeRoad',36.2795,30.1408,'good','restricted','comfortable',20,true,true,null,true,false,true,false,false,'unknown','medium',false,122,null,'https://park4night.com/en/place/474039','Free beach/swimming candidate; WC may close outside season.'),
    ('78000000-0000-4000-8000-000000000023'::uuid,'cirali','cirali-beach-check','ciraliBeach',36.4212,30.4832,'good','restricted','caution',2,true,false,null,true,false,false,false,true,'unknown','high',false,123,'2025-08-13','https://park4night.com/en/place/625449','A few metres from the beach; nesting-protection signs and overnight rules must be checked on arrival.'),

    ('78000000-0000-4000-8000-000000000024'::uuid,'lara','lara-261-caddesi','lara261',36.8507,30.7782,'strong','tolerated','comfortable',null,true,true,'paved',true,false,false,false,false,'unknown','high',true,124,'2026-04-21','https://park4night.com/en/place/313967','2026 reports include a 6.9 m camper and adequate large-vehicle space; city noise and crowding remain drawbacks.')
)
insert into public.camping_spots(
  id,stop_id,slug,content_key,title_key,spot_type,latitude,longitude,
  overview_key,price_note_key,access_note_key,rating,recommended,position,
  verification_status,source_note,last_verified_at,ducato_access,
  overnight_status,beachfront,sea_view,ground_surface,level_ground,
  capacity_vehicles,shade_available,water_available,toilet_available,
  shower_available,waste_available,mobile_signal,crowd_level,night_quiet,
  safety_note_key
)
select
  x.id,s.id,x.slug,'content.freecampNetwork.spots.'||x.title_suffix,
  'content.freecampNetwork.spots.'||x.title_suffix,'freecamp',x.latitude,x.longitude,
  'content.freecampNetwork.common.'||x.class_key,
  'content.freecampNetwork.common.free','content.freecampNetwork.common.arrival',0,
  x.recommended,x.position,
  case when x.class_key in ('strong','good') then 'partially_verified' else 'unverified' end,
  'Community shortlist class '||upper(substr(x.class_key,1,1))||'; last report '||coalesce(x.report_date,'not supplied')||'. '||x.evidence_note||' Source: '||x.source_url,
  case when x.report_date is null then null else x.report_date::date::timestamptz end,
  x.ducato_access,x.overnight_status,x.beachfront,x.sea_view,x.ground_surface,
  x.level_ground,x.capacity,null,x.water,x.toilet,x.shower,x.waste,
  x.mobile_signal,x.crowd_level,null,'content.freecampNetwork.common.safety'
from shortlist x join public.stops s on s.slug=x.nearest_stop_slug
on conflict(slug) do update set
  stop_id=excluded.stop_id,title_key=excluded.title_key,spot_type=excluded.spot_type,
  latitude=excluded.latitude,longitude=excluded.longitude,overview_key=excluded.overview_key,
  price_note_key=excluded.price_note_key,access_note_key=excluded.access_note_key,
  recommended=excluded.recommended,position=excluded.position,
  verification_status=excluded.verification_status,source_note=excluded.source_note,
  last_verified_at=excluded.last_verified_at,ducato_access=excluded.ducato_access,
  overnight_status=excluded.overnight_status,beachfront=excluded.beachfront,
  sea_view=excluded.sea_view,ground_surface=excluded.ground_surface,
  level_ground=excluded.level_ground,capacity_vehicles=excluded.capacity_vehicles,
  shade_available=excluded.shade_available,water_available=excluded.water_available,
  toilet_available=excluded.toilet_available,shower_available=excluded.shower_available,
  waste_available=excluded.waste_available,mobile_signal=excluded.mobile_signal,
  crowd_level=excluded.crowd_level,safety_note_key=excluded.safety_note_key,updated_at=now();

-- Explicitly prevent superseded/restricted records from ever becoming active
-- recommendations if a matching slug was introduced manually in the future.
update public.camping_spots set recommended=false,overnight_status='prohibited',updated_at=now()
where slug in ('didim-fevzipasa','kas-roadworks-coast','kemer-prohibited-coast','lara-112-caddesi');

commit;
