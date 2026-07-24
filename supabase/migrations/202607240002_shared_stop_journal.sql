-- Shared private editorial workspace for the two Route Guide users.
-- Both authenticated accounts manage the same experience text and the same
-- per-stop pool of at most ten photos. Public visitors can only read content
-- explicitly marked as published.

begin;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique check (username ~ '^[a-z0-9._-]{3,32}$'),
  display_name text not null check (char_length(display_name) between 1 and 80),
  is_editor boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists is_editor boolean not null default false;

create table if not exists public.stop_experiences (
  id uuid primary key default gen_random_uuid(),
  stop_id uuid not null unique references public.stops(id) on delete cascade,
  body text not null default '' check (char_length(body) <= 10000),
  locale text not null default 'tr' check (locale in ('en', 'tr')),
  is_published boolean not null default true,
  updated_by uuid references auth.users(id) on delete set null,
  author_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.stop_experiences
  add column if not exists author_name text;

alter table public.galleries
  add column if not exists caption text check (caption is null or char_length(caption) <= 500),
  add column if not exists uploaded_by uuid references auth.users(id) on delete set null,
  add column if not exists source_type text not null default 'guide'
    check (source_type in ('guide', 'placeholder', 'trip')),
  add column if not exists updated_at timestamptz not null default now();

create index if not exists stop_experiences_stop_idx
  on public.stop_experiences(stop_id);

create unique index if not exists profiles_username_lower_idx
  on public.profiles(lower(username));

create index if not exists galleries_stop_created_idx
  on public.galleries(stop_id, created_at)
  where stop_id is not null;

create unique index if not exists galleries_one_cover_per_stop_idx
  on public.galleries(stop_id)
  where stop_id is not null and is_cover;

drop trigger if exists stop_experiences_set_updated_at on public.stop_experiences;
create trigger stop_experiences_set_updated_at
before update on public.stop_experiences
for each row execute function public.set_updated_at();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.create_route_guide_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  resolved_username text;
  resolved_name text;
begin
  resolved_username := lower(coalesce(
    nullif(new.raw_user_meta_data ->> 'username', ''),
    split_part(coalesce(new.email, ''), '@', 1)
  ));
  resolved_username := regexp_replace(resolved_username, '[^a-z0-9._-]', '-', 'g');
  if char_length(resolved_username) < 3 then
    resolved_username := 'user-' || left(new.id::text, 8);
  end if;

  resolved_name := coalesce(
    nullif(new.raw_user_meta_data ->> 'display_name', ''),
    nullif(new.raw_user_meta_data ->> 'username', ''),
    resolved_username
  );

  insert into public.profiles (id, username, display_name, is_editor)
  values (
    new.id,
    resolved_username,
    resolved_name,
    resolved_username in ('psysea', 'maybe22days')
  )
  on conflict (id) do update
  set username = excluded.username,
      display_name = excluded.display_name,
      is_editor = excluded.is_editor;
  return new;
end;
$$;

drop trigger if exists route_guide_profile_after_auth_user on auth.users;
create trigger route_guide_profile_after_auth_user
after insert or update of raw_user_meta_data on auth.users
for each row execute function public.create_route_guide_profile();

insert into public.profiles (id, username, display_name)
select
  user_record.id,
  case
    when char_length(regexp_replace(lower(coalesce(nullif(user_record.raw_user_meta_data ->> 'username', ''), split_part(coalesce(user_record.email, ''), '@', 1))), '[^a-z0-9._-]', '-', 'g')) >= 3
      then regexp_replace(lower(coalesce(nullif(user_record.raw_user_meta_data ->> 'username', ''), split_part(user_record.email, '@', 1))), '[^a-z0-9._-]', '-', 'g')
    else 'user-' || left(user_record.id::text, 8)
  end,
  coalesce(
    nullif(user_record.raw_user_meta_data ->> 'display_name', ''),
    nullif(user_record.raw_user_meta_data ->> 'username', ''),
    split_part(user_record.email, '@', 1),
    'Route Guide User'
  )
from auth.users as user_record
on conflict (id) do nothing;

update public.profiles
set is_editor = true
where username in ('psysea', 'maybe22days');

create or replace function public.is_route_guide_editor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and is_editor
  );
$$;

drop trigger if exists galleries_set_updated_at on public.galleries;
create trigger galleries_set_updated_at
before update on public.galleries
for each row execute function public.set_updated_at();

create or replace function public.enforce_shared_stop_photo_limit()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  existing_count integer;
begin
  if new.stop_id is null or new.source_type <> 'trip' then
    return new;
  end if;

  -- Serialise concurrent uploads to the same shared stop pool.
  perform pg_advisory_xact_lock(hashtextextended(new.stop_id::text, 0));

  select count(*)
  into existing_count
  from public.galleries
  where stop_id = new.stop_id
    and source_type = 'trip'
    and (tg_op = 'INSERT' or id <> new.id);

  if existing_count >= 10 then
    raise exception 'A stop can contain at most 10 photos'
      using errcode = 'check_violation';
  end if;

  return new;
end;
$$;

drop trigger if exists galleries_shared_stop_photo_limit on public.galleries;
create trigger galleries_shared_stop_photo_limit
before insert or update of stop_id, source_type on public.galleries
for each row execute function public.enforce_shared_stop_photo_limit();

alter table public.stop_experiences enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "Editors can read profiles" on public.profiles;
create policy "Editors can read profiles"
on public.profiles for select
to authenticated
using (id = (select auth.uid()) or public.is_route_guide_editor());

drop policy if exists "Editors can update own profile" on public.profiles;
create policy "Editors can update own profile"
on public.profiles for update
to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()) and is_editor = public.is_route_guide_editor());

drop policy if exists "Published stop experiences are readable" on public.stop_experiences;
create policy "Published stop experiences are readable"
on public.stop_experiences for select
to anon
using (is_published);

drop policy if exists "Editors can read all stop experiences" on public.stop_experiences;
create policy "Editors can read all stop experiences"
on public.stop_experiences for select
to authenticated
using (public.is_route_guide_editor());

drop policy if exists "Editors can insert stop experiences" on public.stop_experiences;
create policy "Editors can insert stop experiences"
on public.stop_experiences for insert
to authenticated
with check (public.is_route_guide_editor() and updated_by = (select auth.uid()));

drop policy if exists "Editors can update stop experiences" on public.stop_experiences;
create policy "Editors can update stop experiences"
on public.stop_experiences for update
to authenticated
using (public.is_route_guide_editor())
with check (public.is_route_guide_editor() and updated_by = (select auth.uid()));

drop policy if exists "Editors can delete stop experiences" on public.stop_experiences;
create policy "Editors can delete stop experiences"
on public.stop_experiences for delete
to authenticated
using (public.is_route_guide_editor());

drop policy if exists "Editors can insert shared gallery photos" on public.galleries;
create policy "Editors can insert shared gallery photos"
on public.galleries for insert
to authenticated
with check (public.is_route_guide_editor() and uploaded_by = (select auth.uid()));

drop policy if exists "Editors can update shared gallery photos" on public.galleries;
create policy "Editors can update shared gallery photos"
on public.galleries for update
to authenticated
using (public.is_route_guide_editor())
with check (public.is_route_guide_editor());

drop policy if exists "Editors can delete shared gallery photos" on public.galleries;
create policy "Editors can delete shared gallery photos"
on public.galleries for delete
to authenticated
using (public.is_route_guide_editor());

drop policy if exists "Editors can upload shared caravan media" on storage.objects;
create policy "Editors can upload shared caravan media"
on storage.objects for insert
to authenticated
with check (
  bucket_id in ('covers', 'gallery')
  and public.is_route_guide_editor()
  and owner_id = (select auth.uid()::text)
);

drop policy if exists "Editors can update shared caravan media" on storage.objects;
create policy "Editors can update shared caravan media"
on storage.objects for update
to authenticated
using (bucket_id in ('covers', 'gallery') and public.is_route_guide_editor())
with check (bucket_id in ('covers', 'gallery') and public.is_route_guide_editor());

drop policy if exists "Editors can delete shared caravan media" on storage.objects;
create policy "Editors can delete shared caravan media"
on storage.objects for delete
to authenticated
using (bucket_id in ('covers', 'gallery') and public.is_route_guide_editor());

grant select on public.stop_experiences to anon;
grant select, insert, update, delete on public.stop_experiences to authenticated;
grant select, update on public.profiles to authenticated;
grant insert, update, delete on public.galleries to authenticated;
grant execute on function public.is_route_guide_editor() to authenticated;

notify pgrst, 'reload schema';

commit;
