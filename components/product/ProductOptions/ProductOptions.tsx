/** @jsxImportSource theme-ui */

import { ColorTokens, TextStyleNames } from "@theme/tokens"
import type { ProductOption, ProductVariant } from "@commerce/types/product"
import { SelectedOptions, getProductVariant } from "../helpers"

import { Box } from "theme-ui"
import type { Product } from "@commerce/types/product"
import React from "react"
import { Swatch } from "@components/product"
import usePrice from "@commerce/product/use-price"

interface ProductOptionsProps {
  product: Product
  options: ProductOption[]
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>
}

const ProductOptions: React.FC<ProductOptionsProps> = React.memo(
  function ProductOptions({
    product,
    options,
    selectedOptions,
    setSelectedOptions
  }) {
    return (
      <div>
        {options.map(opt => {
          return (
            <div className="pb-4" key={opt.displayName}>
              <h2
                sx={{
                  variant: `text.${TextStyleNames.label_upper}`
                }}
              >
                {opt.displayName}
              </h2>
              <Box
                sx={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: ColorTokens.primary
                }}
              >
                {opt.values.map((v, i: number) => {
                  const active = selectedOptions[opt.displayName.toLowerCase()]
                  const variant = product.variants.find(variant => {
                    return variant.name.toLowerCase() === v.label.toLowerCase()
                  })

                  return (
                    <Swatch
                      price={variant.price}
                      baseAmount={product.price.retailPrice}
                      currencyCode={product.price.currencyCode}
                      key={`${opt.id}-${i}`}
                      active={v.label.toLowerCase() === active}
                      variant={opt.displayName}
                      color={v.hexColors ? v.hexColors[0] : ""}
                      label={`${v.label}`}
                      onClick={() => {
                        setSelectedOptions(selectedOptions => {
                          return {
                            ...selectedOptions,
                            [opt.displayName.toLowerCase()]:
                              v.label.toLowerCase()
                          }
                        })
                      }}
                    />
                  )
                })}
              </Box>
            </div>
          )
        })}
      </div>
    )
  }
)

export default ProductOptions
