/** @jsxImportSource theme-ui */

import { ColorTokens, TextStyleNames } from "@theme/tokens"
import React, { ButtonHTMLAttributes } from "react"

import { ArrowRight } from "@components/icons"
import { Box } from "@theme-ui/components"
import usePrice from "@commerce/product/use-price"

interface SwatchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  children?: any
  className?: string
  variant?: "size" | "color" | string
  color?: string
  label?: string | null
  price?: number
  baseAmount?: number
  currencyCode?: string
}

const Swatch: React.FC<SwatchProps> = React.memo(function Swatch({
  active,
  className,
  label,
  color = "",
  variant = "size",
  price,
  baseAmount,
  currencyCode,
  ...props
}) {
  variant = variant?.toLowerCase()

  if (label) {
    label = label?.toLowerCase()
  }

  const variantPrice = usePrice({
    amount: price || 0,
    baseAmount: baseAmount,
    currencyCode: currencyCode!
  })

  return (
    <button
      aria-label="Variant Swatch"
      {...(label && color && { title: label })}
      sx={{
        bg: color ? color : "transparent",
        p: 0,
        m: 0,
        border: "none",
        variant: `text.${TextStyleNames.label_upper}`,
        textAlign: "left",
        alignItems: "center",
        display: "inline-flex"
      }}
      {...props}
    >
      <Box
        as="span"
        aria-hidden={true}
        sx={{
          width: 24,
          height: 24,
          borderRadius: 100,
          bg: active ? ColorTokens.primary : ColorTokens.background,
          borderColor: active ? ColorTokens.primary : ColorTokens.darken,
          borderStyle: "solid",
          borderWidth: "2px",
          mr: 12,
          display: "inline-flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0
        }}
      >
        <ArrowRight
          sx={{
            width: 16,
            height: 16,
            visibility: active ? "visible" : "hidden",
            color: ColorTokens.background
          }}
        />
      </Box>
      <span sx={{ mt: 2 }}>{`${label} (${variantPrice.price})`}</span>
    </button>
  )
})

export default Swatch
