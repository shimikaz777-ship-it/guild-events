import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GUILD イベント",
  description: "GUILD のイベント一覧・参加申込サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="bg-guild-navy text-white">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-guild-gold text-xl font-bold tracking-wide">
                GUILD
              </span>
              <span className="text-sm text-white/70">イベント</span>
            </Link>
            <nav className="flex items-center gap-5 text-sm">
              <Link href="/" className="text-white/80 transition hover:text-white">
                イベント一覧
              </Link>
              <Link
                href="/mypage"
                className="text-white/80 transition hover:text-white"
              >
                マイページ
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-8">{children}</main>
        <footer className="border-t border-black/5 py-6 text-center text-xs text-foreground/50">
          GUILD勉強会 ハンズオン ｜ Claude Code × Supabase × Vercel
        </footer>
      </body>
    </html>
  );
}
