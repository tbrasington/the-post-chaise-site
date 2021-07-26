/** @jsxImportSource theme-ui */
import { ColorTokens, TextStyleNames } from "@theme/tokens"
import { Container, Text } from "@components/ui"
import { Flex, Grid } from "theme-ui"
import { ProductCard, ProductImage, ProductSlider } from "@components/product"
import React, { FC } from "react"

import { NextSeo } from "next-seo"
import type { Product } from "@commerce/types/product"
import ProductSidebar from "../ProductSidebar"
import { SanityProduct } from "@sanity/types/product"
import usePrice from "@framework/product/use-price"

interface ProductViewProps {
  product: Product
  sanityProduct: SanityProduct
  relatedProducts: Product[]
}

const ProductView: FC<ProductViewProps> = ({
  product,
  sanityProduct,
  relatedProducts
}) => {
  const { price } = usePrice({
    amount: sanityProduct.minVariantPrice,
    baseAmount: sanityProduct.minVariantPrice,
    currencyCode: "GBP"
  })
  console.log({ sanityProduct })
  return (
    <>
      <Container>
        <h3
          sx={{
            variant: `text.${TextStyleNames.page_title}`,
            m: 0,
            p: 0,
            color: ColorTokens.text
          }}
        >
          <span>{sanityProduct.title}</span>
        </h3>

        <div
          sx={{
            mt: 4,
            variant: `text.${TextStyleNames.label_standard}`,
            color: ColorTokens.darken
          }}
        >
          {`From ${price}`}
        </div>
      </Container>

      <Flex
        sx={{
          mt: 48,
          bg: ColorTokens.muted,
          width: "100%",
          height: "60vh",
          minHeight: "1000px"
        }}
      >
        {sanityProduct.gallery && (
          <ProductSlider>
            {sanityProduct.gallery.map((sanityImage, i) => (
              <ProductImage
                sanityImage={sanityImage}
                priority={i}
                key={sanityImage._key}
              />
            ))}
          </ProductSlider>
        )}
      </Flex>

      <Container>
        <ProductSidebar product={product} sanityProduct={sanityProduct} />
      </Container>
      <Container sx={{ mt: 96, py: 64, bg: ColorTokens.muted }} el="section">
        <h2
          sx={{
            variant: `text.${TextStyleNames.sub_heading}`,
            m: 0,
            p: 0,
            color: ColorTokens.text
          }}
        >
          Recommended prints prints
        </h2>
        <Grid columns={[1, 2, 3]} sx={{ mt: 32 }} gap={32}>
          {relatedProducts
            .filter(p => p.id !== product.id)
            .map(p => (
              <div
                key={p.path}
                className="animated fadeIn bg-accent-0 border border-accent-2"
              >
                <ProductCard
                  product={p}
                  key={p.path}
                  variant="simple"
                  imgProps={{
                    width: 300,
                    height: 150
                  }}
                />
              </div>
            ))}
        </Grid>
      </Container>

      <NextSeo
        title={sanityProduct.title}
        description={product.description}
        openGraph={{
          type: "website",
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: 800,
              height: 600,
              alt: product.name
            }
          ]
        }}
      />
    </>
  )
}

export default ProductView
