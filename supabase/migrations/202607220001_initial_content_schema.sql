create extension if not exists pgcrypto;

create table public.routes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_key text not null,
  description_key text not null,
  start_date date not null,
  end_date date not null,
  status text not null check (status in ('planning', 'active', 'completed')),
  total_distance_km integer not null default 0 check (total_distance_km >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.stops (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  content_key text not null unique,
  title_key text not null,
  region_key text not null,
  overview_key text not null,
  why_visit_key text not null,
  latitude double precision check (latitude between -90 and 90),
  longitude double precision check (longitude between -180 and 180),
  sea_score smallint check (sea_score between 1 and 5),
  silence_score smallint check (silence_score between 1 and 5),
  internet_score smallint check (internet_score between 1 and 5),
  safety_score smallint check (safety_score between 1 and 5),
  solar_suitability text check (solar_suitability in ('none', 'low', 'medium', 'high', 'excellent')),
  shade text check (shade in ('none', 'low', 'medium', 'high', 'excellent')),
  crowd_level text check (crowd_level in ('none', 'low', 'medium', 'high', 'excellent')),
  ducato_accessibility text check (ducato_accessibility in ('difficult', 'caution', 'good', 'excellent')),
  drone_suitability text check (drone_suitability in ('difficult', 'caution', 'good', 'excellent')),
  best_sunrise_key text not null,
  best_sunset_key text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.route_stops (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references public.routes(id) on delete cascade,
  stop_id uuid not null references public.stops(id) on delete cascade,
  position integer not null check (position >= 0),
  recommended_nights smallint not null default 1 check (recommended_nights > 0),
  min_nights smallint not null default 1 check (min_nights > 0),
  max_nights smallint not null default 1 check (max_nights >= min_nights),
  driving_distance_km integer check (driving_distance_km >= 0),
  drive_time_minutes integer check (drive_time_minutes >= 0),
  initial_status text not null default 'planned' check (initial_status in ('planned', 'current', 'visited', 'skipped')),
  created_at timestamptz not null default now(),
  unique (route_id, position),
  unique (route_id, stop_id)
);

create table public.camping_spots (
  id uuid primary key default gen_random_uuid(),
  stop_id uuid not null references public.stops(id) on delete cascade,
  slug text not null unique,
  content_key text not null unique,
  title_key text not null,
  spot_type text not null check (spot_type in ('freecamp', 'municipality', 'paid')),
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  overview_key text not null,
  price_note_key text not null,
  access_note_key text not null,
  rating numeric(2,1) not null default 0 check (rating between 0 and 5),
  recommended boolean not null default false,
  position integer not null default 0 check (position >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (stop_id, position)
);

create table public.galleries (
  id uuid primary key default gen_random_uuid(),
  route_id uuid references public.routes(id) on delete cascade,
  stop_id uuid references public.stops(id) on delete cascade,
  camping_spot_id uuid references public.camping_spots(id) on delete cascade,
  bucket text not null check (bucket in ('covers', 'gallery')),
  storage_path text,
  external_url text,
  alt_key text not null,
  position integer not null default 0 check (position >= 0),
  is_cover boolean not null default false,
  created_at timestamptz not null default now(),
  check (num_nonnulls(route_id, stop_id, camping_spot_id) = 1),
  check (storage_path is not null or external_url is not null)
);

create table public.facilities (
  id uuid primary key default gen_random_uuid(),
  stop_id uuid not null references public.stops(id) on delete cascade,
  camping_spot_id uuid references public.camping_spots(id) on delete cascade,
  facility_type text not null check (facility_type in ('municipality', 'market', 'fuel', 'water', 'dump', 'electricity', 'wc', 'shower', 'waste_disposal', 'restaurant', 'waste_bins', 'shade', 'supermarket')),
  available boolean not null default true,
  is_municipal boolean not null default false,
  name_key text,
  notes_key text,
  distance_km numeric(6,1),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  stop_id uuid not null references public.stops(id) on delete cascade,
  activity_type text not null,
  title_key text not null,
  description_key text not null,
  position integer not null default 0 check (position >= 0),
  created_at timestamptz not null default now()
);

create table public.tips (
  id uuid primary key default gen_random_uuid(),
  stop_id uuid not null references public.stops(id) on delete cascade,
  tip_type text not null,
  subject_key text not null,
  body_key text not null,
  lens_key text,
  timing_key text,
  settings_key text,
  position integer not null default 0 check (position >= 0),
  created_at timestamptz not null default now()
);

create table public.warnings (
  id uuid primary key default gen_random_uuid(),
  stop_id uuid not null references public.stops(id) on delete cascade,
  warning_type text not null default 'road',
  severity text not null default 'warning' check (severity in ('info', 'warning', 'danger')),
  body_key text not null,
  position integer not null default 0 check (position >= 0),
  created_at timestamptz not null default now()
);

create index routes_status_idx on public.routes(status);
create index route_stops_route_position_idx on public.route_stops(route_id, position);
create index route_stops_stop_idx on public.route_stops(stop_id);
create index camping_spots_stop_position_idx on public.camping_spots(stop_id, position);
create index galleries_route_position_idx on public.galleries(route_id, position) where route_id is not null;
create index galleries_stop_position_idx on public.galleries(stop_id, position) where stop_id is not null;
create index galleries_spot_position_idx on public.galleries(camping_spot_id, position) where camping_spot_id is not null;
create index facilities_stop_type_idx on public.facilities(stop_id, facility_type);
create index facilities_spot_type_idx on public.facilities(camping_spot_id, facility_type) where camping_spot_id is not null;
create index activities_stop_position_idx on public.activities(stop_id, position);
create index tips_stop_position_idx on public.tips(stop_id, position);
create index warnings_stop_position_idx on public.warnings(stop_id, position);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger routes_set_updated_at before update on public.routes for each row execute function public.set_updated_at();
create trigger stops_set_updated_at before update on public.stops for each row execute function public.set_updated_at();
create trigger camping_spots_set_updated_at before update on public.camping_spots for each row execute function public.set_updated_at();

alter table public.routes enable row level security;
alter table public.stops enable row level security;
alter table public.route_stops enable row level security;
alter table public.camping_spots enable row level security;
alter table public.galleries enable row level security;
alter table public.facilities enable row level security;
alter table public.activities enable row level security;
alter table public.tips enable row level security;
alter table public.warnings enable row level security;

create policy "Public routes are readable" on public.routes for select to anon, authenticated using (true);
create policy "Public stops are readable" on public.stops for select to anon, authenticated using (true);
create policy "Public route stops are readable" on public.route_stops for select to anon, authenticated using (true);
create policy "Public camping spots are readable" on public.camping_spots for select to anon, authenticated using (true);
create policy "Public galleries are readable" on public.galleries for select to anon, authenticated using (true);
create policy "Public facilities are readable" on public.facilities for select to anon, authenticated using (true);
create policy "Public activities are readable" on public.activities for select to anon, authenticated using (true);
create policy "Public tips are readable" on public.tips for select to anon, authenticated using (true);
create policy "Public warnings are readable" on public.warnings for select to anon, authenticated using (true);

grant usage on schema public to anon, authenticated;
grant select on public.routes, public.route_stops, public.stops, public.camping_spots, public.galleries, public.facilities, public.activities, public.tips, public.warnings to anon, authenticated;
