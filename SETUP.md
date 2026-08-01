# GUILD イベント管理アプリ — セットアップ手順

Claude Code × Next.js × Supabase × Vercel のハンズオンで作った、GUILD のイベント一覧・参加申込アプリです。

## いま動く状態

**Supabase を設定しなくても、ダミーデータですぐ動きます。**

```bash
npm run dev
```

→ ブラウザで http://localhost:3000 を開く

- `/` イベント一覧
- `/events/[id]` イベント詳細＋参加申込フォーム
- `/mypage` 名前で自分の申込を検索・キャンセル

> ダミーデータモードでは、申込データはブラウザのセッション中だけメモリに保持されます（リロードで消えます）。永続化するには下の Supabase 設定を行ってください。

---

## 1. Supabase を接続する（データを永続化）

1. [supabase.com](https://supabase.com) に GitHub でログイン → **New project**
   - Region: **Northeast Asia (Tokyo)**
   - Project name: `guild-events`
   - Database Password は必ず控える
2. セットアップ完了後、左メニュー **SQL Editor** → **New query** に
   [`supabase/schema.sql`](supabase/schema.sql) の中身を貼って **Run**
   （テーブル2つ・RLS・サンプルデータ3件が作られます）
3. **Project Settings → API Keys（Data API）** から次の2つをコピー
   - **Project URL**（`https://xxxx.supabase.co`）
   - **Publishable key（anon key）** ← 「公開してよい方の鍵」
   > `secret key / service_role key` は絶対にコピー・使用しないこと
4. プロジェクト直下に `.env.local` を作成（[`.env.local.example`](.env.local.example) をコピー）し、値を貼る:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=（コピーした anon key）
   ```
5. `npm run dev` を **Ctrl+C で止めて再起動**（環境変数は再起動しないと反映されません）

→ 画面上部の「ダミーデータで動作中」バナーが消えれば接続成功です。

---

## 2. GitHub に push する

Claude Code に頼むのが楽です:

> これまでの変更をコミットして、guild-events という名前で GitHub にリポジトリを作って push して。公開設定は Public で。

- `.env.local` は `.gitignore` 済みなので GitHub には上がりません（安全）

---

## 3. Vercel でデプロイする

1. [vercel.com](https://vercel.com) に GitHub でログイン
2. **Add New… → Project** → `guild-events` を **Import**
3. **Environment Variables** に `.env.local` の2行をそのまま追加（**重要**）
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy** → 1〜2分で公開URL（`https://guild-events-xxxx.vercel.app`）が発行されます

> 環境変数を忘れて Deploy すると画面にデータが出ません。あとから追加した場合は **Redeploy** が必要です。
> 以降の更新は `git push` すれば Vercel が自動で再デプロイします。

---

## 技術構成

| 項目 | 内容 |
|---|---|
| フレームワーク | Next.js 16 (App Router) / React 19 / TypeScript |
| スタイル | Tailwind CSS v4 |
| DB | Supabase (PostgreSQL) — 未設定時はダミーデータで動作 |
| デプロイ | Vercel |

### 主なファイル

```
app/
  page.tsx                    イベント一覧（/）
  events/[id]/page.tsx        イベント詳細（/events/[id]）
  events/[id]/ApplicationForm.tsx  参加申込フォーム（クライアント）
  mypage/page.tsx             マイページ（/mypage）
components/ModeBanner.tsx     ダミーデータ動作中バナー
lib/
  types.ts        テーブルの型定義
  supabase.ts     Supabase クライアント（未設定なら無効化）
  api.ts          データ取得・登録（Supabase or ダミーを自動切替）
  mockData.ts     ダミーデータ
  format.ts       日付表示ユーティリティ
supabase/schema.sql   テーブル作成 SQL（Supabase の SQL Editor 用）
```
