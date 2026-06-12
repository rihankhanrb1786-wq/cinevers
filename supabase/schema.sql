create extension if not exists "uuid-ossp";

create type public.content_category as enum (
  'Movies', 'Short Films', 'Assamese Content', 'AI Movies', 'Documentaries'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  role text not null default 'viewer' check (role in ('viewer', 'admin')),
  created_at timestamptz not null default now()
);

create table public.videos (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text not null,
  category public.content_category not null,
  genres text[] not null default '{}',
  release_year integer,
  duration_seconds integer,
  maturity_rating text default 'U',
  thumbnail_url text,
  video_url text not null,
  featured boolean not null default false,
  published boolean not null default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.watchlist (
  user_id uuid references public.profiles(id) on delete cascade,
  video_id uuid references public.videos(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, video_id)
);

create table public.watch_progress (
  user_id uuid references public.profiles(id) on delete cascade,
  video_id uuid references public.videos(id) on delete cascade,
  progress_seconds integer not null default 0,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, video_id)
);

create table public.likes (
  user_id uuid references public.profiles(id) on delete cascade,
  video_id uuid references public.videos(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, video_id)
);

create table public.comments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  video_id uuid references public.videos(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 1000),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.videos enable row level security;
alter table public.watchlist enable row level security;
alter table public.watch_progress enable row level security;
alter table public.likes enable row level security;
alter table public.comments enable row level security;

create policy "Public profiles are viewable" on public.profiles for select using (true);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Published videos are public" on public.videos for select using (published or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins manage videos" on public.videos for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Users manage own watchlist" on public.watchlist for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own progress" on public.watch_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Likes are public" on public.likes for select using (true);
create policy "Users manage own likes" on public.likes for insert with check (auth.uid() = user_id);
create policy "Users delete own likes" on public.likes for delete using (auth.uid() = user_id);
create policy "Comments are public" on public.comments for select using (true);
create policy "Users create comments" on public.comments for insert with check (auth.uid() = user_id);
create policy "Users delete own comments" on public.comments for delete using (auth.uid() = user_id);

insert into storage.buckets (id, name, public) values ('videos', 'videos', true), ('thumbnails', 'thumbnails', true)
on conflict (id) do nothing;

