begin;

insert into public.stops (
  slug, content_key, title_key, region_key, overview_key, why_visit_key,
  latitude, longitude, sea_score, silence_score, internet_score, safety_score,
  solar_suitability, shade, crowd_level, ducato_accessibility, drone_suitability,
  best_sunrise_key, best_sunset_key, verification_status, source_note, last_verified_at,
  ducato_access, road_surface, road_width, steep_grade, hairpins, cliff_exposure,
  guardrails, turnaround_possible, last_mile_note_key, supply_note_key, decision_summary_key
)
values (
  'izmir-restart', 'content.stops.izmirRestart', 'content.stops.izmirRestart.title',
  'content.stops.izmirRestart.region', 'content.stops.izmirRestart.overview',
  'content.stops.izmirRestart.whyVisit', 38.4897894, 27.1649118, 3, 1, 5, 4,
  'excellent', 'low', 'high', 'good', 'difficult',
  'content.stops.izmirRestart.sunrise', 'content.stops.izmirRestart.sunset', 'verified',
  'Bayraklı TOKİ 7. Etap home return point after the completed Bafa Lake leg.',
  '2026-07-30T00:00:00+03:00', 'comfortable', 'asphalt', 'urban main road',
  false, false, false, true, true, 'content.stops.izmirRestart.ops.lastMile',
  'content.stops.izmirRestart.ops.supply', 'content.stops.izmirRestart.ops.decision'
)
on conflict (slug) do update set
  content_key = excluded.content_key,
  title_key = excluded.title_key,
  region_key = excluded.region_key,
  overview_key = excluded.overview_key,
  why_visit_key = excluded.why_visit_key,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  verification_status = excluded.verification_status,
  source_note = excluded.source_note,
  last_verified_at = excluded.last_verified_at,
  ducato_access = excluded.ducato_access,
  road_surface = excluded.road_surface,
  road_width = excluded.road_width,
  last_mile_note_key = excluded.last_mile_note_key,
  supply_note_key = excluded.supply_note_key,
  decision_summary_key = excluded.decision_summary_key,
  updated_at = now();

update public.route_stops route_stop
set position = position + 100
from public.routes route
where route_stop.route_id = route.id
  and route.slug = 'izmir-lara'
  and position < 100;

insert into public.route_stops (
  route_id, stop_id, position, recommended_nights, min_nights, max_nights,
  driving_distance_km, drive_time_minutes, initial_status
)
select active.id, archived_stop.stop_id,
  case stop.slug when 'guzelcamli' then 1 else 2 end,
  archived_stop.recommended_nights, archived_stop.min_nights, archived_stop.max_nights,
  archived_stop.driving_distance_km, archived_stop.drive_time_minutes, 'visited'
from public.routes active
join public.routes archive on archive.slug = 'izmir-bafa-first-leg'
join public.route_stops archived_stop on archived_stop.route_id = archive.id
join public.stops stop on stop.id = archived_stop.stop_id
where active.slug = 'izmir-lara'
  and stop.slug in ('guzelcamli', 'bafa')
on conflict (route_id, stop_id) do update set
  position = excluded.position,
  recommended_nights = excluded.recommended_nights,
  min_nights = excluded.min_nights,
  max_nights = excluded.max_nights,
  driving_distance_km = excluded.driving_distance_km,
  drive_time_minutes = excluded.drive_time_minutes,
  initial_status = 'visited';

insert into public.route_stops (
  route_id, stop_id, position, recommended_nights, min_nights, max_nights,
  driving_distance_km, drive_time_minutes, initial_status
)
select route.id, stop.id, 3, 1, 1, 1, 180, 150, 'current'
from public.routes route
join public.stops stop on stop.slug = 'izmir-restart'
where route.slug = 'izmir-lara'
on conflict (route_id, stop_id) do update set
  position = excluded.position,
  driving_distance_km = excluded.driving_distance_km,
  drive_time_minutes = excluded.drive_time_minutes,
  initial_status = excluded.initial_status;

update public.route_stops route_stop
set position = positions.position
from public.routes route,
  public.stops stop,
  (values
    ('izmir', 0), ('guzelcamli', 1), ('bafa', 2), ('izmir-restart', 3),
    ('cesme-palmiye', 4), ('torba', 5), ('gumusluk', 6), ('akyarlar', 7),
    ('mazi', 8), ('akbuk', 9), ('dalyan', 10), ('karaot', 11),
    ('faralya', 12), ('kas', 13), ('cirali', 14), ('lara', 15)
  ) positions(slug, position)
where route_stop.route_id = route.id
  and route_stop.stop_id = stop.id
  and route.slug = 'izmir-lara'
  and stop.slug = positions.slug;

insert into public.trip_stop_states (
  route_id, stop_id, status, is_favorite, updated_by, nights_stayed, actual_distance_km
)
select active.id, archived_state.stop_id, archived_state.status, archived_state.is_favorite,
  archived_state.updated_by, archived_state.nights_stayed, archived_state.actual_distance_km
from public.routes active
join public.routes archive on archive.slug = 'izmir-bafa-first-leg'
join public.trip_stop_states archived_state on archived_state.route_id = archive.id
where active.slug = 'izmir-lara'
on conflict (route_id, stop_id) do update set
  status = excluded.status,
  is_favorite = excluded.is_favorite,
  updated_by = excluded.updated_by,
  nights_stayed = excluded.nights_stayed,
  actual_distance_km = excluded.actual_distance_km,
  updated_at = now();

update public.trip_stop_states state
set status = 'planned', updated_at = now()
from public.routes route
where state.route_id = route.id
  and route.slug = 'izmir-lara'
  and state.status = 'current';

insert into public.trip_stop_states (route_id, stop_id, status)
select route.id, stop.id, values.status
from public.routes route
cross join (values ('izmir', 'visited'), ('izmir-restart', 'current')) values(slug, status)
join public.stops stop on stop.slug = values.slug
where route.slug = 'izmir-lara'
on conflict (route_id, stop_id) do update set
  status = excluded.status,
  updated_at = now();

update public.routes
set total_distance_km = 1453,
    updated_at = now()
where slug = 'izmir-lara';

delete from public.routes where slug = 'izmir-bafa-first-leg';

notify pgrst, 'reload schema';
commit;
