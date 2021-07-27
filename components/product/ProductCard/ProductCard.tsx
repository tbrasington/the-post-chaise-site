/** @jsxImportSource theme-ui */
import { Box, Flex } from "theme-ui"
import { ColorTokens, TextStyleNames } from "@theme/tokens"

import { FC } from "react"
import { ImageProps } from "next/image"
import Link from "next/link"
import { ProductImage } from "@components/product"
import { SanityProduct } from "@sanity/types/product"
import { alpha } from "@theme-ui/color"
import usePrice from "@framework/product/use-price"

interface Props {
  className?: string
  product: SanityProduct
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, "src" | "layout" | "placeholder" | "blurDataURL">
  priority?: number
}

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  priority,
  ...props
}) => {
  const { price } = usePrice({
    amount: product.minVariantPrice,
    baseAmount: product.minVariantPrice,
    currencyCode: "GBP"
  })

  return (
    <Link href={`/product/${product.handle}`} {...props}>
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
              height: "300px",
              bg:
                (product.gallery &&
                  alpha(product.gallery[0].palette.muted.background, 0.3)) ||
                alpha(ColorTokens.darken, 0.1),
              transition: "background 0.2s ease",
              cursor: "pointer",
              p: 32,
              ":hover": {
                bg:
                  (product.gallery &&
                    alpha(product.gallery[0].palette.muted.background, 0.8)) ||
                  alpha(ColorTokens.darken, 0.4)
              }
            }}
          >
            {product.gallery && (
              <ProductImage
                sanityImage={product.gallery[0]}
                sizes="(max-height: 150px) 50vw, 150px"
                priority={priority}
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
                <span>{product.title}</span>
              </h3>
              <div
                sx={{
                  mt: 4,
                  variant: `text.${TextStyleNames.label_standard}`,
                  color: ColorTokens.darken
                }}
              >
                {`${price}`}
              </div>
            </Flex>
          )}
        </>
      </a>
    </Link>
  )
}

export default ProductCard
