# 開発参加ガイド（仲間向け・詳しい手順）

このアプリ（GUILD イベント管理アプリ）を**一緒に編集**するための、
`clone`（コードのダウンロード）から公開サイトへの反映までの詳しい手順です。
プログラミングが初めてでも進められるように書いています。上から順にどうぞ。

---

## 事前準備（初回だけ・1回やればOK）

### A. GitHub の招待を承認する
1. 招待の通知が来ます（メール、または https://github.com/notifications ）
2. **「Accept invitation」** を押す
   → これをしないと、あとで `git push`（変更のアップロード）ができません

### B. 必要なソフトを入れる
| ソフト | 入手先 | メモ |
|---|---|---|
| **Node.js（LTS版）** | https://nodejs.org | 「LTS」と書かれた方。インストールは全部「次へ／続ける」でOK |
| **Git** | Windows: https://git-scm.com ／ Mac: 標準搭載（無ければ `xcode-select --install`） | |

### C. ターミナルを開く
- **Windows**: スタートメニューで「**PowerShell**」と検索して起動
- **Mac**: 「**ターミナル.app**」を起動

### D. 入っているか確認
ターミナルで1行ずつ実行。バージョン番号が出れば準備完了:
```bash
node -v
npm -v
git --version
```

---

## 手順1: コードをダウンロードする（clone）

好きな場所（例: デスクトップ）に置きます。

**Windows（PowerShell）:**
```powershell
cd $HOME\Desktop
git clone https://github.com/shimikaz777-ship-it/guild-events.git
cd guild-events
```

**Mac（ターミナル）:**
```bash
cd ~/Desktop
git clone https://github.com/shimikaz777-ship-it/guild-events.git
cd guild-events
```

> このリポジトリは公開（Public）なので、**clone だけなら認証は不要**です。
> `guild-events` というフォルダができて、その中に移動できていればOK。

---

## 手順2: 必要な部品をインストール

`guild-events` フォルダの中で（手順1で `cd` 済み）:
```bash
npm install
```
2〜3分かかります。エラーが出ずにプロンプトが戻ってくれば成功。

---

## 手順3: `.env.local` を作る（★最重要・これが無いとDBに繋がりません）

`.env.local`（Supabase接続情報）は**わざとGitHubに含めていません**。
そのため clone しただけでは DB に繋がらず、ダミーデータ表示になります。

まず、**管理者（Kazuya）から次の2行を受け取ってください**（Discord等で共有されます）:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi........（長い文字列）
```

### 作り方（Windows / PowerShell）
テンプレをコピーしてメモ帳で開く:
```powershell
Copy-Item .env.local.example .env.local
notepad .env.local
```
→ 中の `xxxx` の行を、受け取った2行で**丸ごと置き換えて保存**。
（Windows 10/11 のメモ帳は UTF-8 で保存されるのでそのままでOK）

### 作り方（Mac / ターミナル）
```bash
cp .env.local.example .env.local
open -e .env.local     # テキストエディットで開く（またはVS Code等）
```
→ 受け取った2行に置き換えて保存。

### つまずきポイント（ここだけ注意）
- `=` の**前後にスペースを入れない**（`URL = https...` ❌ → `URL=https...` ✅）
- 値を**クォートで囲まない**（`"eyJ..."` ❌ → `eyJ...` ✅）
- URLの末尾に `/` や `/rest/v1/` を**付けない**（`https://xxxxx.supabase.co` で終わる）

---

## 手順4: ローカルで起動して確認

```bash
npm run dev
```
→ ブラウザで **http://localhost:3000** を開く。

- イベント一覧が表示され、上部の**黄色い「ダミーデータで動作中」バナーが出ていなければ**DB接続成功 🎉
- 止めるときは、そのターミナルで **Ctrl + C**

---

## 手順5: 編集して公開サイトに反映する

### 作業を始める前に必ず最新を取り込む
```bash
git pull
```

### コードを編集したら…
```bash
git add -A
git commit -m "変更内容を簡潔に（例: 一覧のデザインを調整）"
git push
```

### 初回の push では GitHub 認証が求められます
- **Windows**: ブラウザが自動で開き、GitHubにログイン→許可すると以降は自動
- **Mac**: 同様にブラウザ認証、または事前に `gh auth login`（GitHub CLI）でログイン

`git push` が成功すると、**Vercel が自動で再デプロイ**し、
数分で公開URL（`https://....vercel.app`）に全員の変更が反映されます。**URLは変わりません。**

---

## 事故防止のお約束

- **`.env.local` は絶対に commit しない**（`.gitignore` 済みなので通常上がりませんが念のため）
- **作業前に必ず `git pull`**（他の人の変更を取り込んでから編集する）
- 人数が増えたら `main` 直 push ではなく **ブランチ + Pull Request** が安全:
  ```bash
  git checkout -b feature/やること名
  # 編集 → git add -A → git commit -m "..."
  git push -u origin feature/やること名
  # → GitHub 上で Pull Request を作成してレビュー後に合流
  ```

---

## 困ったとき

| 症状 | 対処 |
|---|---|
| `git` / `node` が「見つからない」 | 事前準備Bを再確認。インストール後はターミナルを開き直す |
| 画面にデータが出ない／バナーが消えない | `.env.local` の2行を再確認 → `Ctrl+C` で止めて `npm run dev` を再起動 |
| `npm run dev` が動かない | `npm install` をやり直す |
| `git push` できない | GitHubの招待を承認したか確認。`git pull` してから再度 push |
| コンフリクト（conflict）が出た | 慌てず管理者に相談。基本は `git pull` を先にする習慣で防げます |
