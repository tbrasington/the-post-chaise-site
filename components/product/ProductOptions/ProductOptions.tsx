/** @jsxImportSource theme-ui */

import { Box, Flex } from "theme-ui"
import { ColorTokens, TextStyleNames } from "@theme/tokens"
import type { ProductOption, ProductVariant } from "@commerce/types/product"
import { SanityProduct, SanityProductOption } from "@sanity/types/product"
import { SelectedOptions, getProductVariant } from "../helpers"

import type { Product } from "@commerce/types/product"
import React from "react"
import Swatch from "../Swatch"
import usePrice from "@commerce/product/use-price"

interface ProductOptionsProps {
  product: SanityProduct
  options: SanityProductOption[]
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
            <Box className="pb-4" key={opt.name}>
              <h2
                sx={{
                  variant: `text.${TextStyleNames.label_upper}`
                }}
              >
                {opt.name}
              </h2>
              <Flex
                sx={{
                  flexDirection: "column",
                  "& > button + button": {
                    mt: 12
                  }
                }}
              >
                {opt.values &&
                  opt.values.map((v, i: number) => {
                    const active = selectedOptions[opt.name.toLowerCase()]
                    const variant =
                      product.variants &&
                      product.variants.find(variant => {
                        return (
                          variant.title.toLowerCase() === v.value.toLowerCase()
                        )
                      })

                    return (
                      variant && (
                        <Swatch
                          price={
                            variant && Number(variant.sourceData.priceV2.amount)
                          }
                          baseAmount={Number(variant.sourceData.priceV2.amount)}
                          currencyCode={variant.sourceData.priceV2.currencyCode}
                          key={`${opt.shopifyOptionId}-${i}`}
                          active={v.value.toLowerCase() === active}
                          variant={opt.name}
                          label={`${v.value}`}
                          onClick={() => {
                            setSelectedOptions(selectedOptions => {
                              return {
                                ...selectedOptions,
                                [opt.name.toLowerCase()]: v.value.toLowerCase()
                              }
                            })
                          }}
                        />
                      )
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
