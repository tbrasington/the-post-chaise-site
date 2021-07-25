/** @jsxImportSource theme-ui */

import React, { ButtonHTMLAttributes } from "react"

import { TextStyleNames } from "@theme/tokens"
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
      style={color ? { backgroundColor: color } : {}}
      sx={{
        bg: color ? color : "transparent",
        p: 16,
        m: 0,
        border: "none",
        variant: `text.${TextStyleNames.label_upper}`
      }}
      {...props}
    >
      {!color ? `${label} (${variantPrice.price})` : null}
    </button>
  )
})

export default Swatch
