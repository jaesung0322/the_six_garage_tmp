-- Recovery phone on admin_users (digits only, e.g. 01012345678)

alter table public.admin_users
  add column if not exists phone text;

comment on column public.admin_users.phone is
  'Digits-only mobile for password recovery (e.g. 01012345678). Prefer a private number.';

create unique index if not exists admin_users_phone_uidx
  on public.admin_users (phone)
  where phone is not null;
