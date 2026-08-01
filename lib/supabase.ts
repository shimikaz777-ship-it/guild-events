import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// STEP 19-20: .env.local に設定した接続情報を読み込みます。
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 2つの値が両方そろっているときだけ Supabase を有効化します。
// そろっていないうちは lib/mockData.ts のダミーデータで動きます。
export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;
