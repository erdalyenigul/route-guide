begin;

alter table public.stop_experiences
  drop constraint if exists stop_experiences_stop_id_key;

drop index if exists public.stop_experiences_stop_id_key;

create unique index if not exists stop_experiences_stop_locale_key
  on public.stop_experiences(stop_id, locale);

comment on index public.stop_experiences_stop_locale_key is
  'Keeps one independently editable experience per stop and language.';

commit;
