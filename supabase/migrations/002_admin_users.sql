-- Admin users for /six_garage_mgt login
-- Writes/reads via service_role only (no public policies).

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.admin_users is 'CMS admin accounts; password_hash is scrypt (salt:hash hex)';
comment on column public.admin_users.username is 'Login username (case-sensitive trim on app side)';

create index if not exists admin_users_username_idx
  on public.admin_users (username);

alter table public.admin_users enable row level security;

-- anon/authenticated: no policies → deny all. service_role bypasses RLS.
drop policy if exists "No public access admin_users" on public.admin_users;
