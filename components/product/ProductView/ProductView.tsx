/** @jsxImportSource theme-ui */
import { ColorTokens, TextStyleNames } from "@theme/tokens"
import { Container, Text } from "@components/ui"
import { ProductCard, ProductSlider } from "@components/product"
import React, { FC } from "react"

import { Flex } from "theme-ui"
import Image from "next/image"
import { NextSeo } from "next-seo"
import type { Product } from "@commerce/types/product"
import ProductSidebar from "../ProductSidebar"
import { WishlistButton } from "@components/wishlist"
import cn from "classnames"
import s from "./ProductView.module.css"
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

  console.log({ product })

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
          {`${price} ${product.price?.currencyCode}`}
        </div>
      </Container>

      <Flex
        sx={{
          mt: 48,
          bg: ColorTokens.muted,
          width : '100%',
          height : '60vh'
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
              alignItems : "center",
              alignContent : "center",
              justifyContent : "center"
            }}
          >
            <Image
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
        ))}</ProductSlider>
      </Flex>

      <Container>
        

        <ProductSidebar product={product}  />

        <section className="py-12 px-6 mb-10">
          <Text variant="sub_heading">Related Products</Text>
          <div >
            {relatedProducts.map(p => (
              <div
                key={p.path}
                className="animated fadeIn bg-accent-0 border border-accent-2"
              >
                <ProductCard
                  noNameTag
                  product={p}
                  key={p.path}
                  variant="simple"
                  className="animated fadeIn"
                  imgProps={{
                    width: 300,
                    height: 300
                  }}
                />
              </div>
            ))}
          </div>
        </section>
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
