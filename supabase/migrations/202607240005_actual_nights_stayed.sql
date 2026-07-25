begin;

alter table public.trip_stop_states
  add column if not exists nights_stayed integer;

alter table public.trip_stop_states
  drop constraint if exists trip_stop_states_nights_stayed_check;

alter table public.trip_stop_states
  add constraint trip_stop_states_nights_stayed_check
  check (nights_stayed is null or nights_stayed between 0 and 365);

comment on column public.trip_stop_states.nights_stayed is
  'Actual number of nights stayed at the stop. NULL means not recorded.';

notify pgrst, 'reload schema';

commit;
