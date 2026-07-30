-- Remove content records that are no longer assigned to any trip route.
-- At the time of this migration the only matching stop is Akyarlar. Related
-- stop content is removed by the existing ON DELETE CASCADE foreign keys.

begin;

delete from public.stops as stop
where not exists (
  select 1
  from public.route_stops as route_stop
  where route_stop.stop_id = stop.id
);

commit;
