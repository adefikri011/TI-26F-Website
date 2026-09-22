-- ============================================================
-- TI26F "Our Little Hogwarts" — Supabase Schema
-- Jalankan seluruh file ini di Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. TABEL: profiles (admin, terhubung ke auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  role text not null default 'admin',
  created_at timestamptz default now()
);

-- 2. TABEL: members
create table if not exists public.members (
  id bigint generated always as identity primary key,
  name text not null,
  role text,
  quote text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 3. TABEL: schedule
create table if not exists public.schedule (
  id bigint generated always as identity primary key,
  day text not null,
  subject text not null,
  time_start text not null,
  time_end text not null,
  room text,
  lecturer text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 4. TABEL: gallery
create table if not exists public.gallery (
  id bigint generated always as identity primary key,
  caption text,
  image_url text not null,
  photo_date date,
  created_at timestamptz default now()
);

-- 5. TABEL: announcements
create table if not exists public.announcements (
  id bigint generated always as identity primary key,
  title text not null,
  content text not null,
  type text not null default 'info', -- info | urgent | event
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Public hanya boleh BACA, hanya admin (authenticated) yang TULIS
-- ============================================================

alter table public.profiles enable row level security;
alter table public.members enable row level security;
alter table public.schedule enable row level security;
alter table public.gallery enable row level security;
alter table public.announcements enable row level security;

-- profiles
create policy "Public read profiles" on public.profiles
  for select using (true);
create policy "Admin insert profiles" on public.profiles
  for insert with check (auth.uid() = id);
create policy "Admin update profiles" on public.profiles
  for update using (auth.uid() = id);

-- members
create policy "Public read members" on public.members
  for select using (true);
create policy "Admin write members" on public.members
  for all using (auth.role() = 'authenticated');

-- schedule
create policy "Public read schedule" on public.schedule
  for select using (true);
create policy "Admin write schedule" on public.schedule
  for all using (auth.role() = 'authenticated');

-- gallery
create policy "Public read gallery" on public.gallery
  for select using (true);
create policy "Admin write gallery" on public.gallery
  for all using (auth.role() = 'authenticated');

-- announcements
create policy "Public read announcements" on public.announcements
  for select using (true);
create policy "Admin write announcements" on public.announcements
  for all using (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE: buat bucket untuk foto members & gallery
-- (Jalankan juga di Dashboard → Storage → New bucket,
--  atau pakai perintah di bawah ini)
-- ============================================================

insert into storage.buckets (id, name, public)
values ('members', 'members', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

-- storage RLS
create policy "Public read members storage" on storage.objects
  for select using (bucket_id = 'members');
create policy "Admin write members storage" on storage.objects
  for all using (bucket_id = 'members' and auth.role() = 'authenticated');

create policy "Public read gallery storage" on storage.objects
  for select using (bucket_id = 'gallery');
create policy "Admin write gallery storage" on storage.objects
  for all using (bucket_id = 'gallery' and auth.role() = 'authenticated');

-- ============================================================
-- CARA BUAT AKUN ADMIN:
-- 1. Dashboard → Authentication → Users → "Add user"
-- 2. Isi email + password, centang "Auto Confirm User"
-- 3. Jalankan query ini ganti USER_ID dengan id user tadi:
--
-- insert into public.profiles (id, full_name, role)
-- values ('USER_ID', 'Nama Admin', 'admin');
-- ============================================================
