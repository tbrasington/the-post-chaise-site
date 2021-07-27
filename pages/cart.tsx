/** @jsxImportSource theme-ui */

import { Bag, Check, Cross } from "@components/icons"
import { Button, Container, Text } from "@components/ui"
import { ColorTokens, TextStyleNames } from "@theme/tokens"

import { CartItem } from "@components/cart"
import { Flex } from "@theme-ui/components"
import type { GetStaticPropsContext } from "next"
import { Layout } from "@components/common"
import commerce from "@lib/api/commerce"
import useCart from "@framework/cart/use-cart"
import usePrice from "@framework/product/use-price"

export async function getStaticProps({
  preview,
  locale,
  locales
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  return {
    props: { pages, categories }
  }
}

export default function Cart() {
  const error = null
  const success = null
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

  return (
    <Container>
      <Flex
        sx={{
          flexDirection: ["column", null, "row"],
          justifyContent: "center"
        }}
      >
        <Flex
          sx={{
            flex: 1,
            pr: [0, 0, 72],
            pb: [72, 72, 0],
            maxWidth: ["100%", "100%", "700px"],
            flexDirection: "column"
          }}
        >
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
                We couldn’t process the purchase. Please check your card
                information and try again.
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
            <Flex
              sx={{
                flexDirection: "column"
              }}
            >
              <Text variant="page_title">My Cart</Text>
              <Text variant="paragraph">Review your Order</Text>
              <ul
                sx={{
                  m: 0,
                  mt: 24,
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
                    currencyCode={data?.currency.code!}
                  />
                ))}
              </ul>
            </Flex>
          )}
        </Flex>

        <div
          sx={{
            display: "flex",
            flexShrink: 0,
            flexDirection: "column",

            bg: ColorTokens.background,
            py: 32,
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
            <span>{total}</span>
          </div>

          <div sx={{ mt: 32 }}>
            {isEmpty ? (
              <Button href="/" Component="a" width="100%">
                Continue Shopping
              </Button>
            ) : (
              <Button href="/checkout" Component="a" width="100%">
                Proceed to Checkout
              </Button>
            )}
          </div>
        </div>
      </Flex>
    </Container>
  )
}
Cart.Layout = Layout
