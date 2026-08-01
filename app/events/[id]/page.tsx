import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvent } from "@/lib/api";
import { formatEventDate, isPast } from "@/lib/format";
import ApplicationForm from "./ApplicationForm";

// イベント詳細ページ（STEP 5: 画面②） /events/[id]
// Next.js 16 では params は Promise なので await して取り出す
export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  const past = isPast(event.event_date);

  return (
    <div>
      <Link
        href="/"
        className="text-sm text-foreground/50 transition hover:text-guild-navy"
      >
        ← イベント一覧に戻る
      </Link>

      <article className="mt-4 rounded-xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <span className="inline-block rounded-full bg-guild-gold/15 px-3 py-1 text-sm font-medium text-guild-gold">
          {formatEventDate(event.event_date)}
          {past && "（終了）"}
        </span>
        <h1 className="mt-3 text-2xl font-bold text-guild-navy sm:text-3xl">
          {event.title}
        </h1>

        <dl className="mt-5 space-y-2 text-sm">
          {event.location && (
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 font-semibold text-foreground/50">場所</dt>
              <dd className="text-foreground/80">{event.location}</dd>
            </div>
          )}
          <div className="flex gap-2">
            <dt className="w-16 shrink-0 font-semibold text-foreground/50">日時</dt>
            <dd className="text-foreground/80">
              {formatEventDate(event.event_date)}
            </dd>
          </div>
          {event.capacity != null && (
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 font-semibold text-foreground/50">定員</dt>
              <dd className="text-foreground/80">{event.capacity} 名</dd>
            </div>
          )}
        </dl>

        {event.description && (
          <p className="mt-5 whitespace-pre-wrap leading-relaxed text-foreground/80">
            {event.description}
          </p>
        )}
      </article>

      <section className="mt-6 rounded-xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold text-guild-navy">参加申込</h2>
        {past ? (
          <p className="mt-2 text-sm text-foreground/50">
            このイベントは終了しました。
          </p>
        ) : (
          <ApplicationForm eventId={event.id} />
        )}
      </section>
    </div>
  );
}
