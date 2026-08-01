-- The 6 Garage CMS: section JSON documents
-- Supabase SQL Editor 또는 CLI로 실행하세요.

create table if not exists public.site_sections (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

comment on table public.site_sections is 'Landing CMS sections (hero, about, …) as JSON';
comment on column public.site_sections.key is 'Section key: site|header|hero|about|services|gallery|youtube|directions|footer';
comment on column public.site_sections.data is 'Section payload matching lib/cms/types.ts';

create index if not exists site_sections_updated_at_idx
  on public.site_sections (updated_at desc);

alter table public.site_sections enable row level security;

-- 랜딩/공개 읽기 (anon·authenticated)
drop policy if exists "Public read site_sections" on public.site_sections;
create policy "Public read site_sections"
  on public.site_sections
  for select
  to anon, authenticated
  using (true);

-- 쓰기는 service_role 만 (RLS 우회). 앱 Server Action에서 service role 사용.
