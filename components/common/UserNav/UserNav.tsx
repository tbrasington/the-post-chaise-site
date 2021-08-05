/**  @jsxImportSource theme-ui */

import { ColorTokens, TextStyleNames } from "@theme/tokens"

import { FC } from "react"
import type { LineItem } from "@commerce/types/cart"
import useCart from "@framework/cart/use-cart"
import { useUI } from "@components/ui/context"

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: FC = () => {
  const { data } = useCart()
  const { toggleSidebar } = useUI()
  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0

  return (
    <nav
      sx={{
        cursor: "button"
      }}
    >
      <ul
        sx={{
          listStyle: "none",
          m: 0,
          p: 0
        }}
      >
        {process.env.COMMERCE_CART_ENABLED && (
          <li
            onClick={toggleSidebar}
            sx={{
              cursor: "button",
              bg: ColorTokens.secondary,
              width: itemsCount > 0 ? 24 : 12,
              height: itemsCount > 0 ? 24 : 12,
              borderRadius: 100,
              color: ColorTokens.background,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              ":hover": {
                bg: ColorTokens.accent
              }
            }}
          >
            {itemsCount > 0 && (
              <span
                sx={{
                  cursor: "button",
                  variant: `text.${TextStyleNames.label_upper}`,

                  textAlign: "center"
                }}
              >
                {itemsCount}
              </span>
            )}
          </li>
        )}
      </ul>
    </nav>
  )
}

export default UserNav
