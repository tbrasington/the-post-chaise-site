/** @jsxImportSource theme-ui */

import type { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { Grid } from "theme-ui"
import { Container } from "@components/ui"
import { PageHeader } from "@components/common"
import { Layout } from "@components/common"
import { getClient } from "@sanity/sanity.server"
import { getNavigation } from "@sanity/api/meta"
import { getCollectionsAndProducts } from "@sanity/api/collection"
import CollectionShelf from "@components/product/CollectionShelf"
import { SanityCollection } from "@sanity/types/collections"
import { ProductCard } from "@components/product"
import { ColorTokens } from "@theme/tokens"
import { NextSeo } from "next-seo"
export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const sanityPages = await getClient(preview || false).fetch(getNavigation)
  const collections = await getClient(preview || false).fetch(
    getCollectionsAndProducts
  )

  return {
    props: {
      pages: sanityPages,
      collections
    },
    revalidate: 60
  }
}

export default function Collections({
  collections
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const pageTitle = "Collections"
  const pageDescription =
    "Selected works for sale. Organised by themes and motifs."
  return (
    <>
      <NextSeo title={pageTitle} description={pageDescription} />
      <Container clean>
        <PageHeader title={pageTitle} description={pageDescription} />

        <Container spacing={32}>
          {collections.map((collection: SanityCollection, index: number) => {
            return (
              <CollectionShelf
                key={collection._id}
                title={collection.title}
                description={collection.description}
                useRule={index > 0}
              >
                <Grid
                  columns={[1, 2, 4]}
                  gap={32}
                  sx={{
                    mt: 32
                  }}
                >
                  {collection.products.map(product => {
                    return <ProductCard key={product._id} product={product} />
                  })}
                </Grid>
              </CollectionShelf>
            )
          })}
        </Container>
      </Container>
    </>
  )
}

Collections.Layout = Layout
