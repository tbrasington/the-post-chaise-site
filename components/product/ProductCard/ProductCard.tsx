/** @jsxImportSource theme-ui */
import { Box, Flex } from "theme-ui"
import { ColorTokens, TextStyleNames } from "@theme/tokens"
import Image, { ImageProps } from "next/image"

import { FC } from "react"
import Link from "next/link"
import type { Product } from "@commerce/types/product"
import { alpha } from "@theme-ui/color"
import usePrice from "@framework/product/use-price"

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, "src" | "layout" | "placeholder" | "blurDataURL">
  variant?: "default" | "slim" | "simple"
}

const placeholderImg = "/product-img-placeholder.svg"

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = "default",
  ...props
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!
  })

  return (
    <Link href={`/product/${product.slug}`} {...props}>
      <a
        sx={{
          textDecoration: "none"
        }}
      >
        <>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              bg: alpha(ColorTokens.darken, 0.1),
              p: 32
            }}
          >
            {product?.images && (
              <Image
                alt={product.name || "Product Image"}
                src={product.images[0]?.url || placeholderImg}
                objectFit="contain"
                quality="85"
                layout="responsive"
                width={400}
                height={300}
              />
            )}
          </Box>

          {!noNameTag && (
            <Flex
              sx={{
                flexDirection: "column",
                mt: 24
              }}
            >
              <h3
                sx={{
                  variant: `text.${TextStyleNames.sub_heading}`,
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
            </Flex>
          )}
        </>
      </a>
    </Link>
  )
}

export default ProductCard
