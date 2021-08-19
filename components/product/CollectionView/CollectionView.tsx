import React, { FC } from "react"
import { Grid } from "@theme-ui/components"
import { SanityCollection } from "@sanity/types/collections"
import { PageHeader } from "@components/common"
import { NextSeo } from "next-seo"
import { ProductCard } from "@components/product"
import { Container } from "@components/ui"

interface Props {
  content: SanityCollection
}

const CollectionView: FC<Props> = ({ content }) => {
  const { title, description, products } = content
  return (
    <>
      <NextSeo title={title} description={description} />

      <PageHeader title={title} description={description} />
      <Container>
        <Grid
          columns={[1, 2, 4]}
          gap={32}
          sx={{
            mt: 32,
            mb: 128
          }}
        >
          {products.map(product => {
            return <ProductCard key={product._id} product={product} />
          })}
        </Grid>
      </Container>
    </>
  )
}
export default CollectionView
