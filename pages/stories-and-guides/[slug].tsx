import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from "next"
import { getGuide, getGuides } from "@sanityLib/api/guide"
import { Layout } from "@components/common"

import { GuideView } from "@components/content"
import { getClient } from "@sanityLib/sanity.server"
import { useRouter } from "next/router"
import { getNavigation } from "@sanityLib/api/meta"
import { remappedAllMediaProps, SanityGuide } from "@sanityLib/types/guides"

export async function getStaticProps({
  params,
  preview
}: GetStaticPropsContext<{ slug: string }>) {
  const sanityPages = await getClient(preview || false).fetch(getNavigation)

  const guideContent: SanityGuide = await getClient(preview || false).fetch(
    getGuide,
    {
      slug: params!.slug
    }
  )

  if (!guideContent) {
    throw new Error(`Guide with slug '${params!.slug}' not found`)
  }

  const allMedia = guideContent.page_content.filter(
    block => block._type === "Media" || block._type === "mediaGrid"
  )

  const remapAllMedia = allMedia
    .flatMap(x => {
      if (x._type === "Media") return x
      else if (x._type === "mediaGrid") {
        return x.gallery?.flatMap(gallery => {
          return {
            ...gallery,
            ...gallery.mediaAsset
          }
        })
      }
    })
    .filter(item => item !== undefined)
  return {
    props: {
      guideContent,
      allMedia: remapAllMedia || [],
      pages: sanityPages,
      preview: preview || false,
      slug: params?.slug
    },
    revalidate: 360
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  // old shopify/next/commerce const { products } = await commerce.getAllProductPaths()
  const data = await getClient(false).fetch(getGuides)
  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          data.forEach((guide: any) => {
            arr.push(`/${locale}/stories-and-guides/${guide.slug}`)
          })
          return arr
        }, [])
      : data.map((guide: any) => `/stories-and-guides/${guide.slug}`),
    fallback: "blocking"
  }
}

export default function Slug({
  guideContent,
  allMedia,
  slug,
  preview
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <GuideView
      content={guideContent}
      allMedia={allMedia && (allMedia as remappedAllMediaProps[])}
      preview={preview}
      slug={slug}
    />
  )
}
Slug.Layout = Layout
