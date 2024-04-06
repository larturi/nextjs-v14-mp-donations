import type {Metadata} from "next";

import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "nextjs-mp-donations",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased"
      >
        <header className="text-xl font-bold leading-[4rem]">
          <div className="mt-10 flex justify-center">
            <Link className="lg:text-3xl" href="/">
              Nextjs MP Donations
            </Link>
          </div>
        </header>
        <main className="py-8">{children}</main>
        <footer className="text-center leading-[4rem] opacity-70">
          © {new Date().getFullYear()} nextjs-mp-donations
        </footer>
      </body>
    </html>
  );
}
