// Supabase が未設定のとき、「ダミーデータで動作中」であることを知らせるバナー。
// .env.local を設定すると自動的に消えます（STEP 19-20）。
export default function ModeBanner({ configured }: { configured: boolean }) {
  if (configured) return null;
  return (
    <div className="mb-6 rounded-lg border border-guild-gold/40 bg-guild-gold/10 px-4 py-3 text-sm text-guild-navy">
      <span className="font-semibold">ダミーデータで動作中です。</span>{" "}
      Supabase を接続するとデータが永続化されます（
      <code className="rounded bg-black/5 px-1">.env.local</code> に接続情報を設定 →{" "}
      <code className="rounded bg-black/5 px-1">npm run dev</code> を再起動）。
      設定手順は <code className="rounded bg-black/5 px-1">SETUP.md</code> を参照。
    </div>
  );
}
