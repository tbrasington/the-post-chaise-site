/** @jsxImportSource theme-ui */
import { Bag, Check, Cross } from "@components/icons"
import { Button, Text } from "@components/ui"
import { ColorTokens, TextStyleNames } from "@theme/tokens"

import CartItem from "../CartItem"
import { FC } from "react"
import { Flex } from "theme-ui"
import Link from "next/link"
import SidebarLayout from "@components/common/SidebarLayout"
import cn from "classnames"
import s from "./CartSidebarView.module.css"
import useCart from "@framework/cart/use-cart"
import usePrice from "@framework/product/use-price"
import { useUI } from "@components/ui/context"

const CartSidebarView: FC = () => {
  const { closeSidebar, setSidebarView } = useUI()
  const { data, isLoading, isEmpty } = useCart()

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code
    }
  )
  const handleClose = () => closeSidebar()
  const goToCheckout = () => setSidebarView("CHECKOUT_VIEW")

  const error = null
  const success = null

  return (
    <SidebarLayout
      className={cn({
        [s.empty]: error || success || isLoading || isEmpty
      })}
      handleClose={handleClose}
    >
      {isLoading || isEmpty ? (
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            flex: 1,
            minHeight: "100%",
            flexDirection: "column"
          }}
        >
          <Text variant="page_title">Your cart is empty</Text>
        </Flex>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            Thank you for your order.
          </h2>
        </div>
      ) : (
        <>
          <div
            sx={{
              flex: 1,
              px: 32,
              height: "auto"
            }}
          >
            <Link href="/cart" passHref={true}>
              <h2
                onClick={handleClose}
                sx={{ variant: `text.${TextStyleNames.sub_heading}` }}
              >
                My bag
              </h2>
            </Link>
            <ul
              sx={{
                m: 0,
                p: 0,
                listStyle: "none",
                "& > li + li": {
                  mt: 32
                }
              }}
            >
              {data!.lineItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data!.currency.code}
                />
              ))}
            </ul>
          </div>

          <div
            className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm"
            sx={{
              display: "flex",
              flexShrink: 0,
              flexDirection: "column",
              position: "sticky",
              bottom: 0,
              right: 0,
              bg: ColorTokens.background,
              py: 32,
              px: 32,
              borderTopStyle: "solid",
              borderTopWidth: "1px",
              borderTopColor: ColorTokens.primary,
              variant: `text.${TextStyleNames.label_standard}`
            }}
          >
            <ul
              sx={{
                listStyle: "none",
                p: 0,
                m: 0,
                color: ColorTokens.darken,
                "& > li + li": {
                  mt: 8
                }
              }}
            >
              <li
                sx={{
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li>
              <li
                sx={{
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </li>
              <li
                sx={{
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <span>Shipping</span>
                <span className="font-bold tracking-wide">FREE</span>
              </li>
            </ul>
            <div
              sx={{
                mt: 24,
                display: "flex",
                justifyContent: "space-between",
                color: ColorTokens.text
              }}
            >
              <span>Total</span>
              <span sx={{}}>{total}</span>
            </div>
            <div
              sx={{
                mt: 32
              }}
            >
              {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED ? (
                <Button Component="a" width="100%" onClick={goToCheckout}>
                  Proceed to Checkout ({total})
                </Button>
              ) : (
                <Button href="/checkout" Component="a" width="100%">
                  Proceed to Checkout
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </SidebarLayout>
  )
}

export default CartSidebarView
