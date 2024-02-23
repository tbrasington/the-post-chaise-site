// ./app/page.tsx

import Guides from "@/components/guides/guides";
import { loadQuery } from "@/sanity/lib/store";
import { GUIDE_INDEX_LIST } from "@/sanity/lib/queries/guide";
import { SanityGuide } from "@/sanity/types/guides";
import { draftMode } from "next/headers";
import GuidesPreview from "@/components/guides/guides-preview";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "The Post Chaise",
  description: "A guide to getting lost",
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  openGraph: {
    title: "The Post Chaise",
    description: "A guide to getting lost",
    images: ["/opengraph.png"],
    authors: ["https://www.tbrasington.com"],
  },
};
export default async function Page() {
  const initial = await loadQuery<SanityGuide[]>(
    GUIDE_INDEX_LIST,
    {},
    {
      perspective: draftMode().isEnabled ? "previewDrafts" : "published",
    },
  );

  return draftMode().isEnabled ? (
    <GuidesPreview initial={initial} />
  ) : (
    <Guides guides={initial.data} />
  );
}
