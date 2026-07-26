-- Operational decision support for a large Fiat Ducato campervan.
-- All new fields are nullable: unknown information must never be presented as fact.

begin;

alter table public.stops
  add column if not exists ducato_access text
    check (ducato_access in ('comfortable', 'caution', 'leave_above', 'do_not_enter')),
  add column if not exists road_surface text,
  add column if not exists road_width text,
  add column if not exists steep_grade boolean,
  add column if not exists hairpins boolean,
  add column if not exists cliff_exposure boolean,
  add column if not exists guardrails boolean,
  add column if not exists turnaround_possible boolean,
  add column if not exists last_mile_note_key text,
  add column if not exists supply_note_key text,
  add column if not exists decision_summary_key text;

alter table public.camping_spots
  add column if not exists ducato_access text
    check (ducato_access in ('comfortable', 'caution', 'leave_above', 'do_not_enter')),
  add column if not exists overnight_status text
    check (overnight_status in ('allowed', 'tolerated', 'restricted', 'prohibited', 'unknown')),
  add column if not exists beachfront boolean,
  add column if not exists sea_view boolean,
  add column if not exists distance_to_sea_m integer check (distance_to_sea_m >= 0),
  add column if not exists ground_surface text,
  add column if not exists level_ground boolean,
  add column if not exists capacity_vehicles smallint check (capacity_vehicles > 0),
  add column if not exists shade_available boolean,
  add column if not exists water_available boolean,
  add column if not exists toilet_available boolean,
  add column if not exists shower_available boolean,
  add column if not exists waste_available boolean,
  add column if not exists mobile_signal text
    check (mobile_signal in ('none', 'weak', 'medium', 'good', 'unknown')),
  add column if not exists crowd_level text
    check (crowd_level in ('none', 'low', 'medium', 'high', 'unknown')),
  add column if not exists night_quiet boolean,
  add column if not exists safety_note_key text;

create index if not exists camping_spots_stop_type_recommended_idx
  on public.camping_spots(stop_id, spot_type, recommended, position);

commit;
