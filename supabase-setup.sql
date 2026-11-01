create table public.chat_messages (
  id bigint generated always as identity primary key,
  display_name text not null default 'ผู้ใช้'
    check (char_length(display_name) between 1 and 40),
  sender_type text not null default 'user'
    check (sender_type in ('user', 'owner')),
  content text not null
    check (char_length(trim(content)) between 1 and 500),
  created_at timestamptz not null default now()
);

alter table public.chat_messages enable row level security;

grant usage on schema public to anon;
grant select, insert on public.chat_messages to anon;
grant usage, select on sequence public.chat_messages_id_seq to anon;

create policy "Anyone can read chat messages"
  on public.chat_messages
  for select
  to anon
  using (true);

create policy "Visitors can send user messages"
  on public.chat_messages
  for insert
  to anon
  with check (sender_type = 'user');
