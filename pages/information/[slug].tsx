import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from "next"

import { PageView } from "@components/content"
import { Layout } from "@components/common"
import { getClient } from "@sanity/sanity.server"
import { useRouter } from "next/router"
import { getNavigation } from "@sanity/api/meta"
import { getPage, getPageList } from "@sanity/api/pages"

export async function getStaticProps({
  params,
  preview
}: GetStaticPropsContext<{ slug: string }>) {
  const sanityPages = await getClient(preview || false).fetch(getNavigation)

  const pageContent = await getClient(preview || false).fetch(getPage, {
    slug: params!.slug
  })

  if (!pageContent) {
    throw new Error(`Guide with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      pageContent,
      pages: sanityPages
    },
    revalidate: 200
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  // old shopify/next/commerce const { products } = await commerce.getAllProductPaths()
  const data = await getClient(false).fetch(getPageList)
  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          data.forEach((guide: any) => {
            arr.push(`/${locale}/information/${guide.slug}`)
          })
          return arr
        }, [])
      : data.map((guide: any) => `/information/${guide.slug}`),
    fallback: "blocking"
  }
}

export default function Slug({
  pageContent
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <PageView content={pageContent} />
  )
}

Slug.Layout = Layout
