import { Box, Flex } from "theme-ui"
/** @jsxImportSource theme-ui */
import { Button, Text, useUI } from "@components/ui"
import { ColorTokens, TextStyleNames } from "@theme/tokens"
import { FC, useEffect, useState } from "react"
import {
  SelectedOptions,
  getProductVariant,
  selectDefaultOptionFromProduct
} from "../helpers"

import { PortableText } from "@sanity/sanity"
import { ProductOptions } from "@components/product"
import { SanityProduct } from "@sanity/types/product"
import { theme } from "@theme/index"
import { useAddItem } from "@framework/cart"

interface ProductSidebarProps {
  sanityProduct: SanityProduct
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ sanityProduct }) => {
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
    }
  }

  return (
    <>
      {sanityProduct.options && (
        <Flex
          sx={{
            mt: 56
          }}
        >
          <ProductOptions
            product={sanityProduct}
            options={sanityProduct.options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        </Flex>
      )}

      <Flex
        sx={{
          mt: 64,
          flexDirection: ["column", null, "row"]
        }}
      >
        <Flex sx={{ flex: [1, 1, 0.4], mr: [0, 0, 128], mb: [48, 48, 0] }}>
          {process.env.COMMERCE_CART_ENABLED && (
            <Button
              aria-label="Add to bag"
              type="button"
              onClick={addToCart}
              loading={loading}
              width="100%"
              disabled={variant?.sourceData.availableForSale === false}
            >
              {variant?.sourceData.availableForSale === false
                ? "Not Available"
                : "Add To bag"}
            </Button>
          )}
        </Flex>

        <Flex sx={{ flex: 1, "& > div + div": { mt: 96 } }}>
          {sanityProduct &&
            sanityProduct.paperMaterials &&
            sanityProduct.paperMaterials.map(material => (
              <Flex
                key={material._id}
                sx={{ color: ColorTokens.text, flexDirection: "column" }}
              >
                <Text variant="label_upper">{`Paper details`}</Text>
                <Box
                  sx={{
                    ...theme.styles,
                    variant: `text.${TextStyleNames.paragraph}`,
                    "& h1, h2, h3, h4 ,h5, h6": {
                      mt: 8,
                      color: ColorTokens.text
                    },
                    "& p, li, ul, ol, span": {
                      maxWidth: "64ch",
                      color: ColorTokens.text,
                      variant: `text.${TextStyleNames.paragraph}`
                    }
                  }}
                >
                  <PortableText
                    blocks={material.body}
                    sx={{
                      "> * + * ": { mt: 4 }
                    }}
                  />
                </Box>
              </Flex>
            ))}
        </Flex>
      </Flex>
    </>
  )
}

export default ProductSidebar
