import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import PlausibleProvider from "next-plausible";

import "./globals.css";
import { Logo } from "@/components/logo/logo";
import Link from "next/link";


export default   function SiteChrome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <PlausibleProvider domain="thepostchaise.com">
      <html lang="en" className="scroll-smooth">
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} bg-stone min-h-screen font-sans text-sm dark:bg-stone-950 dark:text-stone-400`}
        >
          <div className="flex min-h-screen flex-col gap-4">
            <header className="container m-auto flex items-center justify-between gap-4 px-6 py-10 md:pt-20">
              <Link
                href="/"
                className="font-mono text-sm uppercase tracking-widest "
              >
                The Post Chaise
              </Link>
              <Logo />
            </header>

            {children}

            <footer className="container mx-auto flex  px-6 justify-between gap-4 py-20 text-stone-500">
              <Link href="/colophon" className="text-stone-500">
                Colophon
              </Link>{" "}
              <span>© {new Date().getFullYear()} Thomas Brasington</span>
            </footer>
          </div>
        </body>
      </html>
    </PlausibleProvider>
  );
}
