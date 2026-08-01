// DB のテーブルに対応する型定義（STEP 6 / STEP 13 の設計に対応）

export type EventRow = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  event_date: string; // ISO 文字列 (timestamptz)
  capacity: number | null;
  created_at?: string;
};

export type ApplicationRow = {
  id: string;
  event_id: string;
  name: string;
  university: string; // 東大 / 京大 / その他
  status: string; // 'applied' など
  created_at?: string;
};

// 申込フォームの大学の選択肢
export const UNIVERSITIES = ["東大", "京大", "その他"] as const;
