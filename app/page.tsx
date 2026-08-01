import Link from "next/link";
import { getEvents } from "@/lib/api";
import { formatEventDate, isPast } from "@/lib/format";
import { isSupabaseConfigured } from "@/lib/supabase";
import ModeBanner from "@/components/ModeBanner";

// イベント一覧ページ（/）
export default async function EventListPage() {
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

      <ul className="space-y-3">
        {events.map((event) => {
          const past = isPast(event.event_date);
          return (
            <li key={event.id}>
              <Link
                href={`/events/${event.id}`}
                className="block rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:border-guild-navy/20 hover:shadow-md"
              >
                <span className="inline-block rounded-full bg-guild-gold/15 px-3 py-1 text-sm font-medium text-guild-gold">
                  {formatEventDate(event.event_date)}
                  {past && "（終了）"}
                </span>
                <h2 className="mt-2 text-xl font-bold text-guild-navy">
                  {event.title}
                </h2>
                {event.location && (
                  <p className="mt-1 text-sm text-foreground/60">
                    📍 {event.location}
                  </p>
                )}
                {event.description && (
                  <p className="mt-2 text-sm text-foreground/80">
                    {event.description}
                  </p>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
