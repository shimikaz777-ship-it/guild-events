# 開発に参加する仲間向け セットアップガイド

このリポジトリ（GUILD イベント管理アプリ）を**一緒に編集する**ための手順です。
招待メール／通知を承認したら、以下を上から順に進めてください。

## 0. 必要なもの

- **GitHub アカウント**（このリポジトリに Collaborator として招待されていること）
- **Node.js（LTS版）** … https://nodejs.org
- **Git** … Mac は標準、Windows は https://git-scm.com
- （任意）**Claude Code** … コードは AI に書いてもらう前提でもOK

確認コマンド（バージョンが出れば準備OK）:

```bash
node -v
git --version
```

## 1. リポジトリを clone する

```bash
git clone https://github.com/shimikaz777-ship-it/guild-events.git
cd guild-events
npm install
```

## 2. `.env.local` を作る（★重要・これが無いとDBに繋がりません）

`.env.local`（Supabase接続情報）は**セキュリティ上わざとGitHubに含めていません**。
そのため clone しただけでは DB に繋がらず、ダミーデータ表示になります。

**リポジトリ管理者（Kazuya）から次の2行を受け取り**、`guild-events` の直下に `.env.local` という
ファイルを作って貼り付けてください:

```
NEXT_PUBLIC_SUPABASE_URL=https://（管理者から共有された値）
NEXT_PUBLIC_SUPABASE_ANON_KEY=（管理者から共有された値）
```

> この anon key は「公開してよい鍵」なので、仲間内での共有は問題ありません。
> `secret` / `service_role` キーは使いません。

## 3. ローカルで起動して確認

```bash
npm run dev
```

→ ブラウザで http://localhost:3000 を開く。イベント一覧が表示され、
画面上部の「ダミーデータで動作中」バナーが**出ていなければ** DB 接続成功です。

## 4. 編集して公開サイトに反映する流れ

```bash
# 最新を取り込む（作業前に必ず）
git pull

# コードを編集…

git add -A
git commit -m "変更内容を簡潔に"
git push
```

`git push` すると **Vercel が自動で再デプロイ**し、数分で公開URLに反映されます。
公開URLは変わりません。

## 5. お約束（事故防止）

- **`.env.local` は絶対に commit しない**（`.gitignore` 済みなので通常は上がりませんが念のため）
- 作業を始める前に `git pull` して最新にする
- 人数が増えてきたら、`main` 直 push ではなく **ブランチを切って Pull Request** で合流すると安全です:
  ```bash
  git checkout -b feature/やること
  # 編集 → commit → push
  git push -u origin feature/やること
  # GitHub 上で Pull Request を作成
  ```

## 困ったとき

| 症状 | 対処 |
|---|---|
| 画面にデータが出ない | `.env.local` の2行を再確認 → `npm run dev` を再起動 |
| `npm run dev` が動かない | `npm install` をやり直す。Node.js が入っているか確認 |
| push できない | GitHub の招待を承認したか確認。`git pull` してから再度 push |
