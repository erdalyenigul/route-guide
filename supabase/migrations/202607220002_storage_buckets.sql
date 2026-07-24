insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('covers', 'covers', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('gallery', 'gallery', true, 15728640, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public caravan media is readable"
on storage.objects for select
to anon, authenticated
using (bucket_id in ('covers', 'gallery'));
