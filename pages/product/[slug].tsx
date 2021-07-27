import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from "next"
import {
  getProduct,
  getProductRecomendations,
  getProducts
} from "@sanity/api/product"

import { Layout } from "@components/common"
import { ProductView } from "@components/product"
import commerce from "@lib/api/commerce"
import { getClient } from "@sanity/sanity.server"
import { useRouter } from "next/router"

export async function getStaticProps({
  params,
  locale,
  locales,
  preview
}: GetStaticPropsContext<{ slug: string }>) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })

  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  const relatedProducts = await getClient(preview || false).fetch(
    getProductRecomendations,
    {
      slug: params!.slug
    }
  )
  const sanityProduct = await getClient(preview || false).fetch(getProduct, {
    slug: params!.slug
  })

  if (!sanityProduct) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      pages,
      relatedProducts,
      categories,
      sanityProduct
    },
    revalidate: 200
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  // old shopify/next/commerce const { products } = await commerce.getAllProductPaths()
  const data = await getClient(false).fetch(getProducts)
  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          data.forEach((product: any) => {
            arr.push(`/${locale}/product/${product.handle}`)
          })
          return arr
        }, [])
      : data.map((product: any) => `/product/${product.handle}`),
    fallback: "blocking"
  }
}

export default function Slug({
  sanityProduct,
  relatedProducts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <ProductView
      sanityProduct={sanityProduct}
      relatedProducts={relatedProducts}
    />
  )
}

Slug.Layout = Layout
