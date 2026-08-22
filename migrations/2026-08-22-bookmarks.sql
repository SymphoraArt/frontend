-- Bookmarks with user-defined categories (Kev, 2026-08-22).
--
-- The card's heart becomes a bookmark: picking (or creating) a category
-- files the prompt there. A category's LOGO is its first bookmark by
-- position; drag & drop reorders within a category, so position is a
-- double — a drop between two rows takes their midpoint, no renumbering.
--
-- image_url is a snapshot of the card image at bookmark time: the category
-- grid and logos render from bookmark rows alone, no joins against prompts
-- (and a later change of a prompt's showcase image does not silently
-- reshuffle every category logo).
--
-- Run against the live Supabase, then verify:
--   select * from bookmark_categories limit 1;
--   select * from bookmarks limit 1;

create table if not exists bookmark_categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 60),
  created_at timestamptz not null default now(),
  unique (user_id, name)
);

create table if not exists bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  category_id uuid not null references bookmark_categories(id) on delete cascade,
  prompt_id uuid not null references prompts(id) on delete cascade,
  image_url text,
  position double precision not null,
  created_at timestamptz not null default now(),
  unique (category_id, prompt_id)
);

create index if not exists bookmarks_cat_pos_idx on bookmarks (category_id, position);
create index if not exists bookmark_categories_user_idx on bookmark_categories (user_id, created_at);
