import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from "next"
import { getGuide, getGuides } from "@sanity/api/guide"

import { GuideView } from "@components/content"
import { Layout } from "@components/common"
import { getClient } from "@sanity/sanity.server"
import { useRouter } from "next/router"
import { getNavigation } from "@sanity/api/meta"

export async function getStaticProps({
  params,
  preview
}: GetStaticPropsContext<{ slug: string }>) {
  const sanityPages = await getClient(preview || false).fetch(getNavigation)

  const guideContent = await getClient(preview || false).fetch(getGuide, {
    slug: params!.slug
  })

  if (!guideContent) {
    throw new Error(`Guide with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      guideContent,
      pages: sanityPages
    },
    revalidate: 200
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
  guideContent
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <GuideView content={guideContent} />
  )
}

Slug.Layout = Layout
