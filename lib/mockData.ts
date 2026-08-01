import type { ApplicationRow, EventRow } from "./types";

// ダミーデータ（STEP 9）。
// .env.local に Supabase の接続情報が無いときは、こちらのデータでアプリが動きます。
// Supabase を設定すると自動で本物の DB に切り替わります（lib/api.ts 参照）。

export const mockEvents: EventRow[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    title: "GUILD勉強会 #1",
    description: "Claude Code で業務アプリ開発に挑戦。ノーコードからWebアプリ公開まで。",
    location: "東京 有楽町キャンパス",
    event_date: "2026-08-01T14:00:00+09:00",
    capacity: 30,
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    title: "もくもく会",
    description: "各自が作りたいものを開発する自由回。もくもく作業して、詰まったら相談。",
    location: "渋谷 道玄坂キャンパス",
    event_date: "2026-08-08T13:00:00+09:00",
    capacity: 20,
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    title: "LT会",
    description: "5分LT×8本。テーマ自由。登壇でもリスナー参加でもOK。",
    location: "オンライン",
    event_date: "2026-08-15T19:00:00+09:00",
    capacity: 50,
  },
];

// モックモード用のメモリ内ストア（ブラウザのセッション中だけ保持されます）。
// リロードすると初期状態に戻ります。永続化したい場合は Supabase を設定してください。
export const mockApplications: ApplicationRow[] = [];
