import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from "next"

import { CollectionView } from "@components/product"
import { Layout } from "@components/common"
import { getClient } from "@sanity/sanity.server"
import { useRouter } from "next/router"
import { getNavigation } from "@sanity/api/meta"
import { getCollections, getCollection } from "@sanity/api/collection"

export async function getStaticProps({
  params,
  preview
}: GetStaticPropsContext<{ slug: string }>) {
  const sanityPages = await getClient(preview || false).fetch(getNavigation)

  const collectionContent = await getClient(preview || false).fetch(
    getCollection,
    {
      slug: params!.slug
    }
  )

  if (!collectionContent) {
    throw new Error(`Guide with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      collectionContent,
      pages: sanityPages
    },
    revalidate: 200
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  // old shopify/next/commerce const { products } = await commerce.getAllProductPaths()
  const data = await getClient(false).fetch(getCollections)
  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          data.forEach((collection: any) => {
            arr.push(`/${locale}/collections/${collection.slug}`)
          })
          return arr
        }, [])
      : data.map((collection: any) => `/collections/${collection.slug}`),
    fallback: "blocking"
  }
}

export default function Slug({
  collectionContent
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <CollectionView content={collectionContent} />
  )
}

Slug.Layout = Layout
