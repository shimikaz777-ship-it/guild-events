import { isSupabaseConfigured, supabase } from "./supabase";
import { mockApplications, mockEvents } from "./mockData";
import type { ApplicationRow, EventRow } from "./types";

// データアクセス層。
// Supabase が設定されていれば本物の DB を、なければダミーデータを使います。
// 画面側（page.tsx など）はこの関数を呼ぶだけで、どちらのモードでも動きます。

export async function getEvents(): Promise<EventRow[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true });
    if (error) throw error;
    return data ?? [];
  }
  return [...mockEvents].sort(
    (a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
  );
}

export async function getEvent(id: string): Promise<EventRow | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data ?? null;
  }
  return mockEvents.find((e) => e.id === id) ?? null;
}

export async function createApplication(input: {
  event_id: string;
  name: string;
  university: string;
}): Promise<ApplicationRow> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("applications")
      .insert({ ...input, status: "applied" })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
  // モックモード: メモリ内に追加
  const row: ApplicationRow = {
    id: crypto.randomUUID(),
    status: "applied",
    created_at: new Date().toISOString(),
    ...input,
  };
  mockApplications.push(row);
  return row;
}

export async function getApplicationsByName(name: string): Promise<ApplicationRow[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("name", name)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
  return mockApplications
    .filter((a) => a.name === name)
    .sort(
      (a, b) =>
        new Date(b.created_at ?? "").getTime() - new Date(a.created_at ?? "").getTime()
    );
}

export async function cancelApplication(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  const idx = mockApplications.findIndex((a) => a.id === id);
  if (idx !== -1) mockApplications.splice(idx, 1);
}
