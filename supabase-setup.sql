-- Visitor Gallery: run this once in Supabase → SQL Editor
create table if not exists public.cards (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 30),
  note text check (char_length(note) <= 80),
  drawing text not null check (char_length(drawing) < 200000),
  color text not null default '#1f7a47',
  edit_token uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now()
);
alter table public.cards enable row level security;
-- anyone can read cards (but never the edit_token)
create policy "public read" on public.cards for select using (true);
revoke select on public.cards from anon;
grant select (id, name, note, drawing, color, created_at) on public.cards to anon;

-- create a card; returns id + a secret edit token kept in the visitor's browser
create or replace function public.create_card(p_name text, p_note text, p_drawing text, p_color text)
returns table (id uuid, edit_token uuid) language sql security definer set search_path = public as $$
  insert into cards (name, note, drawing, color) values (p_name, p_note, p_drawing, p_color)
  returning cards.id, cards.edit_token;
$$;
-- edit your own card (only works with the matching token)
create or replace function public.update_card(p_id uuid, p_token uuid, p_name text, p_note text, p_drawing text, p_color text)
returns void language sql security definer set search_path = public as $$
  update cards set name = p_name, note = p_note, drawing = p_drawing, color = p_color
  where id = p_id and edit_token = p_token;
$$;
grant execute on function public.create_card(text, text, text, text) to anon;
grant execute on function public.update_card(uuid, uuid, text, text, text, text) to anon;
