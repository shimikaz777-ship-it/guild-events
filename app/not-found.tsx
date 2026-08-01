import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-5xl font-bold text-guild-navy">404</p>
      <p className="mt-3 text-foreground/60">ページが見つかりませんでした。</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-guild-navy px-5 py-2 font-semibold text-white transition hover:bg-guild-navy-soft"
      >
        イベント一覧へ
      </Link>
    </div>
  );
}
