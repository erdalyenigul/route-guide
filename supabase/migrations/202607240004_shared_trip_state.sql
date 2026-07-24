begin;

create table if not exists public.trip_stop_states (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references public.routes(id) on delete cascade,
  stop_id uuid not null references public.stops(id) on delete cascade,
  status text not null check (status in ('planned', 'current', 'visited', 'skipped')),
  is_favorite boolean not null default false,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (route_id, stop_id)
);

create table if not exists public.trip_checklist_states (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references public.routes(id) on delete cascade,
  item_id text not null check (char_length(item_id) between 1 and 80),
  completed boolean not null default false,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (route_id, item_id)
);

create index if not exists trip_stop_states_route_idx
  on public.trip_stop_states(route_id);
create index if not exists trip_stop_states_favorites_idx
  on public.trip_stop_states(route_id, is_favorite)
  where is_favorite;
create index if not exists trip_checklist_states_route_idx
  on public.trip_checklist_states(route_id);

drop trigger if exists trip_stop_states_set_updated_at on public.trip_stop_states;
create trigger trip_stop_states_set_updated_at
before update on public.trip_stop_states
for each row execute function public.set_updated_at();

drop trigger if exists trip_checklist_states_set_updated_at on public.trip_checklist_states;
create trigger trip_checklist_states_set_updated_at
before update on public.trip_checklist_states
for each row execute function public.set_updated_at();

insert into public.trip_stop_states (route_id, stop_id, status)
select route_id, stop_id, initial_status
from public.route_stops
on conflict (route_id, stop_id) do nothing;

insert into public.trip_checklist_states (route_id, item_id, completed)
select route_record.id, checklist.item_id, checklist.completed
from public.routes as route_record
cross join (
  values
    ('water', true),
    ('gas', false),
    ('chairs', true),
    ('camera', false)
) as checklist(item_id, completed)
on conflict (route_id, item_id) do nothing;

alter table public.trip_stop_states enable row level security;
alter table public.trip_checklist_states enable row level security;

drop policy if exists "Trip stop state is readable" on public.trip_stop_states;
create policy "Trip stop state is readable"
on public.trip_stop_states for select
to anon, authenticated
using (true);

drop policy if exists "Editors can insert trip stop state" on public.trip_stop_states;
create policy "Editors can insert trip stop state"
on public.trip_stop_states for insert
to authenticated
with check (public.is_route_guide_editor());

drop policy if exists "Editors can update trip stop state" on public.trip_stop_states;
create policy "Editors can update trip stop state"
on public.trip_stop_states for update
to authenticated
using (public.is_route_guide_editor())
with check (public.is_route_guide_editor());

drop policy if exists "Trip checklist state is readable" on public.trip_checklist_states;
create policy "Trip checklist state is readable"
on public.trip_checklist_states for select
to anon, authenticated
using (true);

drop policy if exists "Editors can insert trip checklist state" on public.trip_checklist_states;
create policy "Editors can insert trip checklist state"
on public.trip_checklist_states for insert
to authenticated
with check (public.is_route_guide_editor());

drop policy if exists "Editors can update trip checklist state" on public.trip_checklist_states;
create policy "Editors can update trip checklist state"
on public.trip_checklist_states for update
to authenticated
using (public.is_route_guide_editor())
with check (public.is_route_guide_editor());

grant select on public.trip_stop_states, public.trip_checklist_states
  to anon, authenticated;
grant insert, update on public.trip_stop_states, public.trip_checklist_states
  to authenticated;

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'trip_stop_states'
    ) then
      alter publication supabase_realtime add table public.trip_stop_states;
    end if;

    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'trip_checklist_states'
    ) then
      alter publication supabase_realtime add table public.trip_checklist_states;
    end if;
  end if;
end;
$$;

notify pgrst, 'reload schema';

commit;
