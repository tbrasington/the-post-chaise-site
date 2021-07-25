/** @jsxImportSource theme-ui */

import { Box, Flex } from "theme-ui"
import { ColorTokens, TextStyleNames } from "@theme/tokens"
import type { ProductOption, ProductVariant } from "@commerce/types/product"
import { SelectedOptions, getProductVariant } from "../helpers"

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
      <Box>
        {options.map(opt => {
          return (
            <Box className="pb-4" key={opt.displayName}>
              <h2
                sx={{
                  variant: `text.${TextStyleNames.label_upper}`
                }}
              >
                {opt.displayName}
              </h2>
              <Flex
                sx={{
                  flexDirection: "column",
                  "& > button + button": {
                    mt: 12
                  }
                }}
              >
                {opt.values.map((v, i: number) => {
                  const active = selectedOptions[opt.displayName.toLowerCase()]
                  const variant = product.variants.find(variant => {
                    return variant.name.toLowerCase() === v.label.toLowerCase()
                  })

                  return (
                    <Swatch
                      price={variant && variant.price}
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
              </Flex>
            </Box>
          )
        })}
      </Box>
    )
  }
)

export default ProductOptions
