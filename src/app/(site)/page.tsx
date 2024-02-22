// ./app/page.tsx

import Guides from "@/components/guides/guides";
import { loadQuery } from "@/sanity/lib/store";
import { GUIDE_INDEX_LIST } from "@/sanity/lib/queries/guide";
import { SanityGuide } from "@/sanity/types/guides";
import { draftMode } from "next/headers";
import GuidesPreview from "@/components/guides/guides-preview";

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
