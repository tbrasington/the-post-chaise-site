import { Button, Text, useUI } from "@components/ui"
import React, { FC, useEffect, useState } from "react"
import {
  SelectedOptions,
  getProductVariant,
  selectDefaultOptionFromProduct
} from "../helpers"

import { Flex } from "theme-ui"
import { ProductOptions } from "@components/product"
import { SanityProduct } from "@sanity/types/product"
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
          variant ? variant.id : sanityProduct.variants[0].shopifyVariantID
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
        <Flex sx={{ flex: [1, 1, 0.4], mr: [0, 0, 48] }}>
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

        <Flex sx={{ flex: 1 }}>
          <Text variant="paragraph" html={"add the text in"} />
        </Flex>
      </Flex>
    </>
  )
}

export default ProductSidebar
