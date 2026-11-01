alter table public.chat_messages
  add column if not exists sender_type text not null default 'user';

alter table public.chat_messages
  drop constraint if exists chat_messages_sender_type_check,
  add constraint chat_messages_sender_type_check
    check (sender_type in ('user', 'owner'));

drop policy if exists "Anyone can send chat messages"
  on public.chat_messages;
drop policy if exists "Visitors can send user messages"
  on public.chat_messages;

create policy "Visitors can send user messages"
  on public.chat_messages
  for insert
  to anon
  with check (sender_type = 'user');
