update public.route_stops as route_stop
set recommended_nights = night_plan.recommended_nights
from (
  values
    ('bafa', 1),
    ('gumusluk', 1),
    ('akyarlar', 1),
    ('mazi', 2),
    ('cirali', 2)
) as night_plan(slug, recommended_nights)
join public.stops as stop on stop.slug = night_plan.slug
where route_stop.stop_id = stop.id;
