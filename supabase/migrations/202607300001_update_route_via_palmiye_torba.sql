begin;

insert into public.routes (slug, title_key, description_key, start_date, end_date, status, total_distance_km)
values ('izmir-bafa-first-leg', 'content.route.firstLegTitle', 'content.route.firstLegDescription', '2026-07-22', '2026-07-30', 'completed', 216)
on conflict (slug) do update set title_key=excluded.title_key, description_key=excluded.description_key,
status=excluded.status, total_distance_km=excluded.total_distance_km, updated_at=now();

insert into public.stops (slug,content_key,title_key,region_key,overview_key,why_visit_key,latitude,longitude,
sea_score,silence_score,internet_score,safety_score,solar_suitability,shade,crowd_level,ducato_accessibility,
drone_suitability,best_sunrise_key,best_sunset_key,verification_status,source_note,last_verified_at,ducato_access,
road_surface,road_width,steep_grade,hairpins,cliff_exposure,guardrails,turnaround_possible,last_mile_note_key,supply_note_key,decision_summary_key)
values
('cesme-palmiye','content.stops.cesmePalmiye','content.stops.cesmePalmiye.title','content.stops.cesmePalmiye.region',
'content.stops.cesmePalmiye.overview','content.stops.cesmePalmiye.whyVisit',38.3627304,26.3163465,4,2,4,3,
'excellent','low','high','caution','difficult','content.stops.cesmePalmiye.sunrise','content.stops.cesmePalmiye.sunset',
'partially_verified','Palmiye Beach, Üniversite Mahallesi, 4381 Sokak No:18. Address cross-checked with public map and travel listings; overnight permission requires an arrival check.','2026-07-30T00:00:00+03:00',
'caution','asphalt','urban street',false,false,false,true,true,'content.stops.cesmePalmiye.ops.lastMile','content.stops.cesmePalmiye.ops.supply','content.stops.cesmePalmiye.ops.decision'),
('torba','content.stops.torba','content.stops.torba.title','content.stops.torba.region','content.stops.torba.overview',
'content.stops.torba.whyVisit',37.0682,27.4597,4,2,4,4,'excellent','low','high','good','difficult',
'content.stops.torba.sunrise','content.stops.torba.sunset','partially_verified',
'Torba Kafe Önü Halk Plajı / Herodot Bulvarı No:27. Identity, address and facilities based on official public listings; current caravan overnight permission must be confirmed.','2026-07-30T00:00:00+03:00',
'comfortable','asphalt','normal',false,false,false,true,true,'content.stops.torba.ops.lastMile','content.stops.torba.ops.supply','content.stops.torba.ops.decision')
on conflict (slug) do update set content_key=excluded.content_key,title_key=excluded.title_key,region_key=excluded.region_key,
overview_key=excluded.overview_key,why_visit_key=excluded.why_visit_key,latitude=excluded.latitude,longitude=excluded.longitude,
sea_score=excluded.sea_score,silence_score=excluded.silence_score,internet_score=excluded.internet_score,safety_score=excluded.safety_score,
solar_suitability=excluded.solar_suitability,shade=excluded.shade,crowd_level=excluded.crowd_level,
ducato_accessibility=excluded.ducato_accessibility,drone_suitability=excluded.drone_suitability,best_sunrise_key=excluded.best_sunrise_key,
best_sunset_key=excluded.best_sunset_key,verification_status=excluded.verification_status,source_note=excluded.source_note,
last_verified_at=excluded.last_verified_at,ducato_access=excluded.ducato_access,road_surface=excluded.road_surface,
road_width=excluded.road_width,steep_grade=excluded.steep_grade,hairpins=excluded.hairpins,cliff_exposure=excluded.cliff_exposure,
guardrails=excluded.guardrails,turnaround_possible=excluded.turnaround_possible,last_mile_note_key=excluded.last_mile_note_key,
supply_note_key=excluded.supply_note_key,decision_summary_key=excluded.decision_summary_key,updated_at=now();

-- Keep the already completed Güzelçamlı and Bafa records in a historical route.
insert into public.route_stops (route_id,stop_id,position,recommended_nights,min_nights,max_nights,driving_distance_km,drive_time_minutes,initial_status)
select archive.id,stop.id,case stop.slug when 'guzelcamli' then 0 else 1 end,rs.recommended_nights,rs.min_nights,rs.max_nights,
rs.driving_distance_km,rs.drive_time_minutes,'visited'
from public.routes archive join public.routes active on active.slug='izmir-lara'
join public.route_stops rs on rs.route_id=active.id join public.stops stop on stop.id=rs.stop_id
where archive.slug='izmir-bafa-first-leg' and stop.slug in ('guzelcamli','bafa')
on conflict (route_id,stop_id) do update set position=excluded.position,recommended_nights=excluded.recommended_nights,
min_nights=excluded.min_nights,max_nights=excluded.max_nights,driving_distance_km=excluded.driving_distance_km,
drive_time_minutes=excluded.drive_time_minutes,initial_status='visited';

insert into public.trip_stop_states (route_id,stop_id,status,is_favorite,updated_by,nights_stayed,actual_distance_km)
select archive.id,state.stop_id,state.status,state.is_favorite,state.updated_by,state.nights_stayed,state.actual_distance_km
from public.routes archive join public.routes active on active.slug='izmir-lara'
join public.trip_stop_states state on state.route_id=active.id join public.stops stop on stop.id=state.stop_id
where archive.slug='izmir-bafa-first-leg' and stop.slug in ('guzelcamli','bafa')
on conflict (route_id,stop_id) do update set status=excluded.status,is_favorite=excluded.is_favorite,updated_by=excluded.updated_by,
nights_stayed=excluded.nights_stayed,actual_distance_km=excluded.actual_distance_km,updated_at=now();

delete from public.trip_stop_states s using public.routes r,public.stops p
where s.route_id=r.id and s.stop_id=p.id and r.slug='izmir-lara' and p.slug in ('guzelcamli','bafa');
delete from public.route_stops s using public.routes r,public.stops p
where s.route_id=r.id and s.stop_id=p.id and r.slug='izmir-lara' and p.slug in ('guzelcamli','bafa');

update public.route_stops rs set position=position+100 from public.routes r
where rs.route_id=r.id and r.slug='izmir-lara' and position<100;

insert into public.route_stops (route_id,stop_id,position,recommended_nights,min_nights,max_nights,driving_distance_km,drive_time_minutes,initial_status)
select r.id,s.id,v.position,1,1,1,v.distance,v.minutes,'planned'
from public.routes r cross join (values ('cesme-palmiye',1,95,80),('torba',2,320,250)) v(slug,position,distance,minutes)
join public.stops s on s.slug=v.slug where r.slug='izmir-lara'
on conflict (route_id,stop_id) do update set position=excluded.position,recommended_nights=1,min_nights=1,max_nights=1,
driving_distance_km=excluded.driving_distance_km,drive_time_minutes=excluded.drive_time_minutes,initial_status='planned';

update public.route_stops rs set position=v.position,
driving_distance_km=case when s.slug='gumusluk' then 40 else rs.driving_distance_km end,
drive_time_minutes=case when s.slug='gumusluk' then 50 else rs.drive_time_minutes end
from public.routes r,public.stops s,(values ('izmir',0),('gumusluk',3),('akyarlar',4),('mazi',5),
('akbuk',6),('dalyan',7),('karaot',8),('faralya',9),('kas',10),('cirali',11),('lara',12)) v(slug,position)
where rs.route_id=r.id and rs.stop_id=s.id and r.slug='izmir-lara' and s.slug=v.slug;

insert into public.trip_stop_states (route_id,stop_id,status)
select r.id,s.id,v.status from public.routes r cross join
(values ('izmir','current'),('cesme-palmiye','planned'),('torba','planned'),('gumusluk','planned')) v(slug,status)
join public.stops s on s.slug=v.slug where r.slug='izmir-lara'
on conflict (route_id,stop_id) do update set status=excluded.status,updated_at=now();

update public.routes set total_distance_km=1068,updated_at=now() where slug='izmir-lara';
notify pgrst,'reload schema';
commit;
