/** @jsxImportSource theme-ui */
import { ColorTokens, TextStyleNames } from "@theme/tokens"
import { Container, Text } from "@components/ui"
import { Flex, Grid } from "theme-ui"
import { ProductCard, ProductSlider } from "@components/product"

import { FC } from "react"
import Image from "next/image"
import { NextSeo } from "next-seo"
import type { Product } from "@commerce/types/product"
import ProductSidebar from "../ProductSidebar"
import usePrice from "@framework/product/use-price"

interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!
  })

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
          <span>{product.name}</span>
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
          height: "60vh"
        }}
      >
        <ProductSlider>
          {product.images.map((image, i) => (
            <Flex
              key={image.url}
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                "& > div": {
                  height: "100%"
                }
              }}
            >
              <Image
                className="slider-image"
                src={image.url!}
                alt={image.alt || "Product Image"}
                layout="intrinsic"
                objectFit="contain"
                objectPosition="center"
                priority={i === 0}
                quality="85"
                width={image.width}
                height={image.height}
              />
            </Flex>
          ))}
        </ProductSlider>
      </Flex>

      <Container>
        <ProductSidebar product={product} />
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
        title={product.name}
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
