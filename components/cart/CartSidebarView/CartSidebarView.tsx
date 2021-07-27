/** @jsxImportSource theme-ui */
import { Button, Text } from "@components/ui"
import { ColorTokens, TextStyleNames } from "@theme/tokens"

import CartItem from "../CartItem"
import { FC } from "react"
import { Flex } from "theme-ui"
import Link from "next/link"
import SidebarLayout from "@components/common/SidebarLayout"
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

  //  className={cn({
  //       [s.empty]: error || success || isLoading || isEmpty
  //     })}
  return (
    <SidebarLayout handleClose={handleClose}>
      {isLoading || isEmpty ? (
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            flex: 1,
            minHeight: "100%",
            flexDirection: "column",
            px: 32
          }}
        >
          <Text variant="page_title">Your cart is empty</Text>
        </Flex>
      ) : error ? (
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            flex: 1,
            minHeight: "100%",
            flexDirection: "column",
            px: 32
          }}
        >
          <Text variant="page_title">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </Text>
        </Flex>
      ) : success ? (
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            flex: 1,
            minHeight: "100%",
            flexDirection: "column",
            px: 32
          }}
        >
          <Text variant="page_title">Thank you for your order</Text>
        </Flex>
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
                <span>FREE</span>
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
