import { Dispatch, SetStateAction } from "react"

import { SanityProduct } from "@sanity/types/product"

export type SelectedOptions = Record<string, string | null>

export function getProductVariant(
  product: SanityProduct,
  opts: SelectedOptions
) {
  const variant =
    product.variants &&
    product.variants.find(
      variant =>
        variant.title.toLowerCase() === Object.values(opts)[0]?.toLowerCase()
    )

  return variant
}

export function selectDefaultOptionFromProduct(
  product: SanityProduct,
  updater: Dispatch<SetStateAction<SelectedOptions>>
) {
  // Selects the default option
  product.variants &&
    product.variants[0].sourceData.selectedOptions?.forEach(v => {
      updater(choices => ({
        ...choices,
        [v.name.toLowerCase()]: v.value.toLowerCase()
      }))
    })
}
