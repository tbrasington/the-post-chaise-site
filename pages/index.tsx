/** @jsxImportSource theme-ui */

import { ColorTokens, TextStyleNames } from "@theme/tokens"
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next"

import { Container } from "@components/ui"
import { Grid } from "theme-ui"
import { Layout } from "@components/common"
import { ProductCard } from "@components/product"
import { SanityProduct } from "@sanity/types/product"
import commerce from "@lib/api/commerce"
import { getClient } from "@sanity/sanity.server"
import { getProducts } from "@sanity/api/product"

export async function getStaticProps({
  preview,
  locale,
  locales
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any)
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const products = await getClient(preview || false).fetch(getProducts)

  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      pages
    },
    revalidate: 60
  }
}

export default function Home({
  products
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Container sx={{ py: 64 }}>
        <h2
          sx={{
            variant: `text.${TextStyleNames.sub_heading}`,
            m: 0,
            p: 0,
            color: ColorTokens.text
          }}
        >
          Latest prints
        </h2>
        <Grid
          columns={[1, 2, 4]}
          gap={32}
          sx={{
            mt: 32
          }}
        >
          {products.map((product: SanityProduct, i: number) => (
            <ProductCard key={product._id} product={product} priority={i} />
          ))}
        </Grid>
      </Container>
    </>
  )
}

Home.Layout = Layout
