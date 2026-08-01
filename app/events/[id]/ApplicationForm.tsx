"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createApplication } from "@/lib/api";
import { UNIVERSITIES } from "@/lib/types";

// 参加申込フォーム（STEP 5: 画面③）。クライアントコンポーネント。
export default function ApplicationForm({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [university, setUniversity] = useState<string>(UNIVERSITIES[0]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("名前を入力してください。");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await createApplication({
        event_id: eventId,
        name: name.trim(),
        university,
      });
      // STEP 11: 「申込みました」の確認画面を出して、3秒後に一覧に戻す
      setDone(true);
      setTimeout(() => router.push("/"), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "申込に失敗しました。もう一度お試しください。"
      );
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-lg font-bold text-green-700">申込みました！</p>
        <p className="mt-1 text-sm text-green-600">
          3秒後にイベント一覧へ戻ります…
        </p>
        <p className="mt-1 text-xs text-foreground/50">
          「マイページ」で名前を入力すると申込状況を確認できます。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-semibold text-foreground/70"
        >
          お名前
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="山田 太郎"
          className="w-full rounded-lg border border-black/10 px-3 py-2 text-foreground outline-none focus:border-guild-navy focus:ring-2 focus:ring-guild-navy/20"
        />
      </div>

      <div>
        <label
          htmlFor="university"
          className="mb-1 block text-sm font-semibold text-foreground/70"
        >
          大学
        </label>
        <select
          id="university"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-foreground outline-none focus:border-guild-navy focus:ring-2 focus:ring-guild-navy/20"
        >
          {UNIVERSITIES.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-guild-navy px-4 py-2.5 font-semibold text-white transition hover:bg-guild-navy-soft disabled:opacity-50"
      >
        {submitting ? "送信中…" : "参加申込する"}
      </button>
    </form>
  );
}
