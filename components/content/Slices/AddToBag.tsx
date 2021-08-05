/** @jsxImportSource theme-ui */

import { Box, Flex } from "theme-ui"
import { Button, useUI } from "@components/ui"
import { ColorTokens, TextStyleNames } from "@theme/tokens"
import { FC, useEffect, useState } from "react"
import {
  SelectedOptions,
  getProductVariant,
  selectDefaultOptionFromProduct
} from "@components/product/helpers"

import Link from "next/link"
import { SanityProduct } from "@sanity/types/product"
import { useAddItem } from "@framework/cart"

const AddToBag: FC<{ sanityProduct: SanityProduct; colorOverride?: string }> =
  ({ sanityProduct, colorOverride }) => {
    const addItem = useAddItem()
    const { openSidebar } = useUI()
    const [loading, setLoading] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

    useEffect(() => {
      selectDefaultOptionFromProduct(sanityProduct, setSelectedOptions)
    }, [sanityProduct])

    const variant = getProductVariant(sanityProduct, selectedOptions)
    const addToCart = async () => {
      setLoading(true)
      try {
        await addItem({
          productId: String(sanityProduct.shopifyId),
          variantId: String(
            variant
              ? variant.shopifyVariantID
              : sanityProduct.variants[0].shopifyVariantID
          )
        })
        openSidebar()
        setLoading(false)
      } catch (err) {
        setLoading(false)

        throw new Error(err)
      }
    }

    return (
      <Flex
        sx={{
          width: "auto",
          alignItems: "center"
        }}
      >
        <Link passHref href={`/product/${sanityProduct.handle}`}>
          <a
            sx={{
              variant: `text.${TextStyleNames.label_upper}`,

              color: ColorTokens.darken,
              textUnderlineOffset: 2,
              textDecorationColor: ColorTokens.primary,
              ":hover": {
                color: ColorTokens.text,
                textDecorationColor: ColorTokens.accent
              }
            }}
          >
            Full details
          </a>
        </Link>

        <Box sx={{ ml: 16 }}>
          {process.env.COMMERCE_CART_ENABLED && (
            <Button
              aria-label="Add to bag"
              type="button"
              onClick={addToCart}
              loading={loading}
              width="100%"
              variant="mini"
              disabled={variant?.sourceData.availableForSale === false}
              bgOverride={colorOverride}
            >
              {variant?.sourceData.availableForSale === false
                ? "Not Available"
                : "Add To bag"}
            </Button>
          )}
        </Box>
      </Flex>
    )
  }

export default AddToBag
