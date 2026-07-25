alter table public.trip_stop_states
  add column if not exists actual_distance_km integer;

alter table public.trip_stop_states
  drop constraint if exists trip_stop_states_actual_distance_km_check;

alter table public.trip_stop_states
  add constraint trip_stop_states_actual_distance_km_check
  check (actual_distance_km is null or actual_distance_km between 0 and 5000);

comment on column public.trip_stop_states.actual_distance_km is
  'Actual kilometres driven from the previous route stop when this leg was completed.';

notify pgrst, 'reload schema';
