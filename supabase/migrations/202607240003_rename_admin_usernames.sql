begin;

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
    resolved_username in ('deniz', 'erdal')
  )
  on conflict (id) do update
  set username = excluded.username,
      display_name = excluded.display_name,
      is_editor = excluded.is_editor;
  return new;
end;
$$;

update public.profiles
set username = case username
  when 'psysea' then 'deniz'
  when 'maybe22days' then 'erdal'
  else username
end,
is_editor = true
where username in ('psysea', 'maybe22days');

update public.profiles
set is_editor = username in ('deniz', 'erdal');

commit;
