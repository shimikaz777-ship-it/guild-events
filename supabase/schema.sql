-- =========================================================
-- GUILD イベント管理アプリ  Supabase セットアップ SQL
-- Supabase Dashboard の「SQL Editor」→「New query」に貼って Run
-- （STEP 15〜17 に対応）
-- =========================================================

-- ① events テーブル / ② applications テーブル（STEP 15）
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  event_date timestamptz not null,
  capacity int,
  created_at timestamptz default now()
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  name text not null,
  university text not null,
  status text default 'applied',
  created_at timestamptz default now()
);

-- セキュリティ設定 RLS（STEP 16）：勉強会用に全開放
alter table events enable row level security;
alter table applications enable row level security;

drop policy if exists "read_events" on events;
create policy "read_events" on events
  for select using (true);

drop policy if exists "all_applications" on applications;
create policy "all_applications" on applications
  for all using (true) with check (true);

-- サンプルデータ 3件（STEP 17）
insert into events (title, description, location, event_date, capacity) values
  ('GUILD勉強会 #1', 'Claude Code で業務アプリ開発に挑戦', '東京 有楽町キャンパス', '2026-08-01 14:00+09', 30),
  ('もくもく会',     '各自が作りたいものを開発する自由回',   '渋谷 道玄坂キャンパス', '2026-08-08 13:00+09', 20),
  ('LT会',          '5分LT×8本。テーマ自由',             'オンライン',          '2026-08-15 19:00+09', 50);
