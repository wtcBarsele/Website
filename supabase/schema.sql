-- ============================================================================
-- WTC Barsele — Database schema
-- ============================================================================
-- Voer dit bestand uit in de Supabase SQL editor wanneer je klaar bent voor
-- fase 2. Eerst je Supabase project aanmaken op supabase.com, dan dit hier
-- plakken in SQL editor → Run.
--
-- Belangrijk om te begrijpen:
--   - 'auth.users' is van Supabase zelf — daar zit het wachtwoord en e-mail.
--   - 'profiles' is van ons — daar zetten we naam, foto, bio, enz.
--   - Elke profile.id verwijst naar auth.users.id (zelfde UUID).
--   - Row Level Security (RLS) bepaalt wie welke rijen mag zien/wijzigen.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1) PROFIELEN (ledendata, gekoppeld aan login)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text not null,
  first_name   text,
  last_name    text,
  photo_url    text,
  bio          text,
  approved     boolean not null default false,  -- admin moet eerst goedkeuren
  created_at   timestamptz not null default now()
);

-- Wanneer iemand zich registreert, automatisch een profielrij aanmaken.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 2) ROLLEN
-- ---------------------------------------------------------------------------
create table if not exists public.roles (
  code text primary key,
  name text not null
);

insert into public.roles (code, name) values
  ('member',         'Lid'),
  ('admin',          'Administrator'),
  ('calendar_admin', 'Beheerder kalender en ritten'),
  ('activity_admin', 'Beheerder activiteiten')
on conflict (code) do nothing;

create table if not exists public.user_roles (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role_code  text not null references public.roles(code),
  primary key (profile_id, role_code)
);

-- Helper-functies voor RLS: heeft de ingelogde gebruiker rol X?
create or replace function public.has_role(role text)
returns boolean language sql stable as $$
  select exists (
    select 1 from public.user_roles
    where profile_id = auth.uid() and role_code = role
  );
$$;

create or replace function public.is_approved_member()
returns boolean language sql stable as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and approved = true
  );
$$;

-- ---------------------------------------------------------------------------
-- 3) TEAMS / categorieën
-- ---------------------------------------------------------------------------
create table if not exists public.teams (
  code     text primary key,
  name     text not null,
  category text not null check (category in ('baan','gravel','mtb'))
);

insert into public.teams (code, name, category) values
  ('a_slow', 'A-Slow', 'baan'),
  ('a',      'A',      'baan'),
  ('a_plus', 'A+',     'baan'),
  ('gravel', 'Gravel', 'gravel'),
  ('mtb',    'MTB',    'mtb')
on conflict (code) do nothing;

create table if not exists public.team_preferences (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  team_code  text not null references public.teams(code),
  primary key (profile_id, team_code)
);

-- ---------------------------------------------------------------------------
-- 4) RITTEN (komen in de kalender)
-- ---------------------------------------------------------------------------
create table if not exists public.rides (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  start_at          timestamptz not null,
  team_code         text not null references public.teams(code),
  description       text,
  gpx_url           text,
  distance_km       numeric(6,1),
  barsele_challenge boolean not null default false,
  created_by        uuid references public.profiles(id),
  created_at        timestamptz not null default now()
);

create index if not exists rides_start_at_idx on public.rides (start_at);

create table if not exists public.ride_signups (
  ride_id      uuid not null references public.rides(id) on delete cascade,
  profile_id   uuid not null references public.profiles(id) on delete cascade,
  signed_up_at timestamptz not null default now(),
  primary key (ride_id, profile_id)
);

-- ---------------------------------------------------------------------------
-- 5) ACTIVITEITEN (weekends, uitstappen)
-- ---------------------------------------------------------------------------
create table if not exists public.activities (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  date        date not null,
  description text,
  created_at  timestamptz not null default now()
);

create table if not exists public.activity_signups (
  activity_id uuid not null references public.activities(id) on delete cascade,
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  primary key (activity_id, profile_id)
);

-- ---------------------------------------------------------------------------
-- 6) SPONSORS (alleen zichtbaar voor goedgekeurde leden)
-- ---------------------------------------------------------------------------
create table if not exists public.sponsors (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  logo_url    text,
  website     text,
  display_order int not null default 0
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================
-- Standaard kan niemand iets. We schakelen RLS aan op elke tabel, en voegen
-- daarna policies toe die precies vertellen wat wel mag.
-- ============================================================================

alter table public.profiles          enable row level security;
alter table public.user_roles        enable row level security;
alter table public.team_preferences  enable row level security;
alter table public.rides             enable row level security;
alter table public.ride_signups      enable row level security;
alter table public.activities        enable row level security;
alter table public.activity_signups  enable row level security;
alter table public.sponsors          enable row level security;

-- Profielen: goedgekeurde leden zien alle goedgekeurde leden (smoelenboek).
-- Ieder mag zijn eigen profiel lezen en aanpassen. Admin ziet alles.
create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);
create policy profiles_select_members on public.profiles
  for select using (approved = true and public.is_approved_member());
create policy profiles_select_admin on public.profiles
  for select using (public.has_role('admin'));
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id);
create policy profiles_update_admin on public.profiles
  for update using (public.has_role('admin'));

-- Rollen: alleen admin mag rollen toekennen of zien
create policy user_roles_admin on public.user_roles
  for all using (public.has_role('admin'));
create policy user_roles_select_own on public.user_roles
  for select using (auth.uid() = profile_id);

-- Team-voorkeuren: lid beheert zijn eigen voorkeuren
create policy team_pref_own on public.team_preferences
  for all using (auth.uid() = profile_id);
create policy team_pref_select_members on public.team_preferences
  for select using (public.is_approved_member());

-- Ritten: iedereen mag lezen (ook publiek). Aanpassen door kalenderbeheer + admin.
create policy rides_select_all on public.rides
  for select using (true);
create policy rides_modify_calendar on public.rides
  for all using (public.has_role('calendar_admin') or public.has_role('admin'));

-- Inschrijvingen: lid schrijft zichzelf in/uit. Kalenderbeheer mag alle wijzigen.
create policy signups_select_members on public.ride_signups
  for select using (public.is_approved_member());
create policy signups_own on public.ride_signups
  for all using (auth.uid() = profile_id);
create policy signups_admin on public.ride_signups
  for all using (public.has_role('calendar_admin') or public.has_role('admin'));

-- Activiteiten: idem als ritten, beheer door activity_admin
create policy activities_select_all on public.activities
  for select using (true);
create policy activities_modify on public.activities
  for all using (public.has_role('activity_admin') or public.has_role('admin'));

create policy activity_signups_own on public.activity_signups
  for all using (auth.uid() = profile_id);
create policy activity_signups_admin on public.activity_signups
  for all using (public.has_role('activity_admin') or public.has_role('admin'));

-- Sponsors: PUBLIEK zichtbaar (essentieel voor de sponsor zelf — die wil
-- gezien worden, ook door niet-leden). Beheer enkel door admin.
create policy sponsors_select_public on public.sponsors
  for select using (true);
create policy sponsors_admin on public.sponsors
  for all using (public.has_role('admin'));
