import Link from "next/link";
import { getEvents } from "@/lib/api";
import { formatEventDate, isPast } from "@/lib/format";
import { isSupabaseConfigured } from "@/lib/supabase";
import ModeBanner from "@/components/ModeBanner";

// イベント一覧ページ（STEP 5: 画面①）
export default async function HomePage() {
  const events = await getEvents();

  return (
    <div>
      <ModeBanner configured={isSupabaseConfigured} />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-guild-navy">イベント一覧</h1>
        <p className="mt-1 text-sm text-foreground/60">
          気になるイベントをクリックして、参加を申し込めます。
        </p>
      </div>

      {events.length === 0 ? (
        <p className="rounded-lg border border-dashed border-black/10 bg-white p-8 text-center text-foreground/50">
          イベントがまだありません。
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {events.map((event) => {
            const past = isPast(event.event_date);
            return (
              <li key={event.id}>
                <Link
                  href={`/events/${event.id}`}
                  className={`block h-full rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                    past ? "opacity-60" : ""
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="inline-block rounded-full bg-guild-gold/15 px-2.5 py-0.5 text-xs font-medium text-guild-gold">
                      {formatEventDate(event.event_date)}
                    </span>
                    {past && (
                      <span className="text-xs text-foreground/40">終了</span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-guild-navy">
                    {event.title}
                  </h2>
                  {event.location && (
                    <p className="mt-1 text-sm text-foreground/60">
                      📍 {event.location}
                    </p>
                  )}
                  {event.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-foreground/70">
                      {event.description}
                    </p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
