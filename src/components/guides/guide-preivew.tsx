// ./components/PostPreview.tsx

"use client";

import { QueryResponseInitial, useQuery } from "@sanity/react-loader";
import { QueryParams, SanityDocument } from "next-sanity";
import type { SanityGuide } from "@/sanity/types/guides";

import Guide from "@/components/guides/guide";
import { GUIDE_QUERY } from "@/sanity/lib/queries/guide";

export default function GuidePreview({
  initial,
  params,
}: {
  initial: QueryResponseInitial<SanityGuide>;
  params: QueryParams;
}) {
  const { data } = useQuery<SanityGuide | null>(GUIDE_QUERY, params, {
    initial,
  });
  if (!data) return null;
  return <Guide guide={data} />;
}
