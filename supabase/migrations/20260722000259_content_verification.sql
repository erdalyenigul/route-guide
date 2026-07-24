-- Verification metadata keeps operational travel claims visibly provisional.
-- Generate/apply through the normal Supabase migration workflow; do not run from the app.

alter table public.stops
  add column verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'partially_verified', 'verified')),
  add column source_note text,
  add column last_verified_at timestamptz;

alter table public.camping_spots
  add column verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'partially_verified', 'verified')),
  add column source_note text,
  add column last_verified_at timestamptz;

alter table public.facilities
  add column verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'partially_verified', 'verified')),
  add column source_note text,
  add column last_verified_at timestamptz;

alter table public.activities
  add column verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'partially_verified', 'verified')),
  add column source_note text,
  add column last_verified_at timestamptz;

alter table public.tips
  add column verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'partially_verified', 'verified')),
  add column source_note text,
  add column last_verified_at timestamptz;

alter table public.warnings
  add column verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'partially_verified', 'verified')),
  add column source_note text,
  add column last_verified_at timestamptz;

create index stops_verification_status_idx on public.stops(verification_status);
