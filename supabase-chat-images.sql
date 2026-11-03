insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'chat-images',
  'chat-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

grant usage on schema storage to anon;
grant insert on table storage.objects to anon;

drop policy if exists "Anyone can upload chat images"
  on storage.objects;

create policy "Anyone can upload chat images"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'chat-images');
