/** @jsxImportSource theme-ui */

import type { GetStaticPropsContext, InferGetStaticPropsType } from "next"

import { Container, Text } from "@components/ui"
import { Layout } from "@components/common"
import { getClient } from "@sanity/sanity.server"
import { getNavigation } from "@sanity/api/meta"
import { getCollectionsAndProducts } from "@sanity/api/collection"
import CollectionShelf from "@components/product/CollectionShelf"
import { SanityCollection } from "@sanity/types/collections"
import { ProductCard } from "@components/product"
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
  return (
    <>
      <Container sx={{ py: 64 }}>
        <Text variant="page_title">Collections</Text>
        <Text variant="statement">Selected works for sale.</Text>
        {collections.map((collection: SanityCollection, index: number) => {
          return (
            <CollectionShelf
              key={collection._id}
              title={collection.title}
              description={collection.description}
            >
              {collection.products.map(product => {
                return <ProductCard key={product._id} product={product} />
              })}
            </CollectionShelf>
          )
        })}
      </Container>
    </>
  )
}

Collections.Layout = Layout
