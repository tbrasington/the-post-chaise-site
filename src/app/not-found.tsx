import Link from "next/link";
import Layout from "./(site)/layout";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Page not found | The Post Chaise",
  description: "",
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  openGraph: {
    title: "404 | The Post Chaise",
    description: "",
    images: ["/opengraph.png"],
    authors: ["https://www.tbrasington.com"],
  },
};

export default function NotFound() {
  return (
    <Layout>
      <main className="grid-cols-auto container mx-auto grid flex-1 snap-proximity items-center gap-8 px-6">
        <div>
          <h1 className="m-0 text-sm font-medium antialiased">
            You really are lost
          </h1>
          <p className="m-0 mt-2 text-sm  antialiased">
            Return to the <Link href="/">directory</Link>.
          </p>
        </div>
      </main>
    </Layout>
  );
}
