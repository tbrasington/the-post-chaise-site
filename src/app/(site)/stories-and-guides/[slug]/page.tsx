// ./app/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from "next";

import { QueryParams, SanityDocument } from "next-sanity";
import { draftMode } from "next/headers";
import { loadQuery } from "@/sanity/lib/store";
import { client } from "@/sanity/lib/client";
import { GUIDE_LIST, GUIDE_QUERY } from "@/sanity/lib/queries/guide";
import GuidePreview from "@/components/guides/guide-preivew";
import Guide from "@/components/guides/guide";
import { SanityGuide } from "@/sanity/types/guides";
import imageUrlBuilder from "@sanity/image-url";
import { projectId, dataset } from "@/sanity/env";

export async function generateStaticParams() {
  const guides = await client.fetch<SanityDocument[]>(GUIDE_LIST);
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<QueryParams> },

  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const initial = await loadQuery<SanityGuide>(GUIDE_QUERY, await params, {
    // Because of Next.js, RSC and Dynamic Routes this currently
    // cannot be set on the loadQuery function at the "top level"
    perspective: "published",
  });
  const builder = imageUrlBuilder({ projectId, dataset });
  let seoImage = `opengraph.png`;
  if (initial?.data?.hero_image) {
    seoImage = builder
      .image(initial?.data?.hero_image)
      .width(1200)
      .height(630)
      .quality(80)
      .url();
  }
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${initial.data.title} | The Post Chaise`,
    description: initial?.data?.seo_description || "",
    openGraph: {
      images: [seoImage, ...previousImages],
    },
  };
}
export default async function GuidePage({
  params,
}: {
  params: Promise<QueryParams>;
}) {
  const { isEnabled: isDraftMode } = await draftMode();
  const props = await params;
  const initial = await loadQuery<SanityGuide>(
    GUIDE_QUERY,
    { slug: props.slug },
    {
      // Because of Next.js, RSC and Dynamic Routes this currently
      // cannot be set on the loadQuery function at the "top level"
      perspective: isDraftMode ? "previewDrafts" : "published",
    },
  );

  return isDraftMode ? (
    <GuidePreview initial={initial} params={props} />
  ) : (
    <Guide guide={initial.data} />
  );
}
