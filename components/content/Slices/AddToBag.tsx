import { Button, useUI } from "@components/ui"
import { FC, useEffect, useState } from "react"
import {
  SelectedOptions,
  getProductVariant,
  selectDefaultOptionFromProduct
} from "@components/product/helpers"

import { Box } from "theme-ui"
import { SanityProduct } from "@sanity/types/product"
import { useAddItem } from "@framework/cart"

const AddToBag: FC<{ sanityProduct: SanityProduct }> = ({ sanityProduct }) => {
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
    <Box>
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
    </Box>
  )
}

export default AddToBag
