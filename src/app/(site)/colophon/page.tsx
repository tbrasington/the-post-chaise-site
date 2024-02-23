import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "The Post Chaise",
  description: "A guide to getting lost",
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  openGraph: {
    title: "Colophon | The Post Chaise",
    description: "A guide to getting lost",
    images: ["/opengraph.png"],
    authors: ["https://www.tbrasington.com"],
  },
};

export default function Colophon() {
  return (
    <main className="prose prose-stone dark:prose-invert prose-base container mx-auto  flex-1 space-y-7 px-6 py-11">
      <h1 className="m-0 text-sm font-medium antialiased">Colophon</h1>
      <div>
        <h2 className="m-0  text-sm  font-medium antialiased">What</h2>
        <p className="m-0 mt-2 text-sm  antialiased">
          A photographic archive by{" "}
          <Link href="https://tbrasington.com">tbrasington</Link>. Pre
          social-networks (around 2004-8) this is what I and most of used to do
          with our photos. This is a bit of a digital garden for me to test out
          other technology and design combinations away from my work web
          prescene.
        </p>
        <p className="mt-2 text-sm  antialiased">
          I am particualy interested in capturing the banality of the seaside
          and the looming precense of the countryside.
        </p>
      </div>
      <div>
        <h2 className="m-0  text-sm  font-medium antialiased">Typography</h2>
        <p className="m-0 mt-2 text-sm  antialiased">
          Set in <Link href="https://vercel.com/font/sans">Geist Sans</Link> and{" "}
          <Link href="https://vercel.com/font/mono">Geist Mono</Link> by Vercel.
          It has nice proportions for small text, and the niceities of classic
          grotesques and some of the more humanist/softer touchers in modern
          sans.
        </p>
      </div>
      <div>
        <h2 className="m-0  text-sm  font-medium antialiased">Technology</h2>
        <p className="m-0 mt-2 text-sm  antialiased">
          Written in React via <Link href="https://nextjs.org">Next.js</Link>{" "}
          with <Link href="https://sanity.io">Sanity</Link> providing the CMS.
          Styling is with <Link href="https://tailwindcss.com">Tailwind</Link>,
          which works really well for this kind of site as it lets you focus on
          the layout. Hosted on <Link href="https://vercel.com">Vercel</Link>.
          Analytics by privacy focussed{" "}
          <Link href="https://plausible.io">Plausible</Link>
        </p>
      </div>
    </main>
  );
}
