begin;

update public.stops
set latitude = 38.4897894,
    longitude = 27.1649118,
    source_note = 'Bayraklı TOKİ 7. Etap home base and route starting point.',
    last_verified_at = '2026-07-30T00:00:00+03:00',
    updated_at = now()
where slug = 'izmir';

update public.route_stops route_stop
set recommended_nights = 4,
    min_nights = 4,
    max_nights = 4
from public.routes route,
     public.stops stop
where route_stop.route_id = route.id
  and route_stop.stop_id = stop.id
  and route.slug = 'izmir-lara'
  and stop.slug = 'izmir-restart';

insert into public.trip_stop_states (
  route_id,
  stop_id,
  status,
  nights_stayed
)
select route.id, stop.id, 'current', 4
from public.routes route
cross join public.stops stop
where route.slug = 'izmir-lara'
  and stop.slug = 'izmir-restart'
on conflict (route_id, stop_id) do update set
  nights_stayed = 4,
  updated_at = now();

commit;
