"use client";

import { useState } from "react";
import Link from "next/link";
import {
  cancelApplication,
  getApplicationsByName,
  getEvents,
} from "@/lib/api";
import { formatEventDate } from "@/lib/format";
import type { ApplicationRow, EventRow } from "@/lib/types";

type Joined = ApplicationRow & { event: EventRow | null };

// マイページ（STEP 5: 画面④）。名前で自分の申込を検索してキャンセルできる。
export default function MyPage() {
  const [nameInput, setNameInput] = useState("");
  const [searchedName, setSearchedName] = useState<string | null>(null);
  const [rows, setRows] = useState<Joined[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function search(name: string) {
    setLoading(true);
    setError(null);
    try {
      const [apps, events] = await Promise.all([
        getApplicationsByName(name),
        getEvents(),
      ]);
      const eventMap = new Map(events.map((e) => [e.id, e]));
      setRows(
        apps.map((a) => ({ ...a, event: eventMap.get(a.event_id) ?? null }))
      );
      setSearchedName(name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "検索に失敗しました。");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!nameInput.trim()) return;
    await search(nameInput.trim());
  }

  async function handleCancel(id: string) {
    if (!confirm("この申込をキャンセルしますか？")) return;
    try {
      await cancelApplication(id);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "キャンセルに失敗しました。");
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-guild-navy">マイページ</h1>
        <p className="mt-1 text-sm text-foreground/60">
          申込時に入力したお名前で、自分の申込状況を確認・キャンセルできます。
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="申込時のお名前"
          className="flex-1 rounded-lg border border-black/10 bg-white px-3 py-2 outline-none focus:border-guild-navy focus:ring-2 focus:ring-guild-navy/20"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-guild-navy px-5 py-2 font-semibold text-white transition hover:bg-guild-navy-soft disabled:opacity-50"
        >
          {loading ? "検索中…" : "検索"}
        </button>
      </form>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {searchedName !== null && !loading && (
        <>
          {rows.length === 0 ? (
            <p className="rounded-lg border border-dashed border-black/10 bg-white p-8 text-center text-foreground/50">
              「{searchedName}」さんの申込は見つかりませんでした。
            </p>
          ) : (
            <ul className="space-y-3">
              {rows.map((row) => (
                <li
                  key={row.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-black/5 bg-white p-4 shadow-sm"
                >
                  <div className="min-w-0">
                    {row.event ? (
                      <Link
                        href={`/events/${row.event_id}`}
                        className="font-bold text-guild-navy hover:underline"
                      >
                        {row.event.title}
                      </Link>
                    ) : (
                      <span className="font-bold text-guild-navy">
                        (削除されたイベント)
                      </span>
                    )}
                    <p className="mt-0.5 text-xs text-foreground/60">
                      {row.event ? formatEventDate(row.event.event_date) : "—"}
                      {" ｜ "}
                      {row.university}
                      {" ｜ "}
                      <span className="text-guild-gold">{row.status}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleCancel(row.id)}
                    className="shrink-0 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    キャンセル
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
