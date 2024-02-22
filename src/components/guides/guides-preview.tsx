// ./components/PostPreview.tsx

'use client'

import { GUIDE_INDEX_LIST } from '@/sanity/lib/queries/guide'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { SanityGuide } from '@/sanity/types/guides'

import Guides from '@/components/guides/guides'

export default function GuidesPreview({
  initial,
}: {
  initial: QueryResponseInitial<SanityGuide[]>
}) {
  const { data } = useQuery<SanityGuide[] | null>(
    GUIDE_INDEX_LIST,
    {},
    { initial },
  )

  return data ? (
    <Guides guides={data} />
  ) : (
    <div className="bg-red-100">No posts found</div>
  )
}
