-- Refine Gümüşlük as a waterfront destination after Torba.
-- The stop target is the Gümüşlük shore / Rabbit Island area. Managed camps
-- remain only as paid fallbacks; incorrect Bodrum-centre freecamp candidates
-- are removed from the Gümüşlük stop.

begin;

update public.stops
set title_key = 'content.stops.gumusluk.title',
    region_key = 'content.stops.gumusluk.region',
    overview_key = 'content.stops.gumusluk.overview',
    why_visit_key = 'content.stops.gumusluk.whyVisit',
    latitude = 37.0537,
    longitude = 27.2338,
    ducato_access = 'caution',
    road_surface = 'asphalt',
    road_width = 'narrow waterfront streets',
    steep_grade = false,
    hairpins = false,
    cliff_exposure = false,
    guardrails = true,
    turnaround_possible = false,
    last_mile_note_key = 'content.stops.gumusluk.ops.lastMile',
    supply_note_key = 'content.stops.gumusluk.ops.supply',
    decision_summary_key = 'content.stops.gumusluk.ops.decision',
    verification_status = 'partially_verified',
    source_note = 'Gümüşlük is treated as a waterfront/Rabbit Island destination after Torba. The stop coordinate is the shore area; central overnight parking is not endorsed and managed camps are only fallbacks.',
    last_verified_at = '2026-07-30T00:00:00+03:00',
    updated_at = now()
where slug = 'gumusluk';

delete from public.camping_spots
where slug in (
  'gumusluk-inland-olive',
  'bodrum-seyit-kaptan',
  'bodrum-kumbahce-sahil',
  'bodrum-20-eren-sokak'
);

update public.camping_spots as spot
set recommended = false,
    overview_key = case
      when spot.slug = 'mandi-camping' then 'content.stops.gumusluk.spots.mandi.overview'
      else spot.overview_key
    end,
    access_note_key = case
      when spot.slug = 'mandi-camping' then 'content.stops.gumusluk.spots.mandi.access'
      else spot.access_note_key
    end,
    updated_at = now()
from public.stops as stop
where spot.stop_id = stop.id
  and stop.slug = 'gumusluk';

update public.route_stops as route_stop
set driving_distance_km = 28,
    drive_time_minutes = 40
from public.routes as route, public.stops as stop
where route_stop.route_id = route.id
  and route_stop.stop_id = stop.id
  and route.slug = 'izmir-lara'
  and stop.slug = 'gumusluk';

update public.routes
set total_distance_km = 1475,
    updated_at = now()
where slug = 'izmir-lara';

notify pgrst, 'reload schema';

commit;
