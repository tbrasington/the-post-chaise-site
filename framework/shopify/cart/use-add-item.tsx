import { Mutation, MutationCheckoutLineItemsAddArgs } from "../schema"
import {
  checkoutLineItemAddMutation,
  checkoutToCart,
  getCheckoutId
} from "../utils"
import useAddItem, { UseAddItem } from "@commerce/cart/use-add-item"

import type { AddItemHook } from "../types/cart"
import { CommerceError } from "@commerce/utils/errors"
import type { MutationHook } from "@commerce/utils/types"
import { useCallback } from "react"
import useCart from "./use-cart"

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    query: checkoutLineItemAddMutation
  },
  async fetcher({ input: item, options, fetch }) {
    if (
      item.quantity &&
      (!Number.isInteger(item.quantity) || item.quantity! < 1)
    ) {
      throw new CommerceError({
        message: "The item quantity has to be a valid integer greater than 0"
      })
    }

    const { checkoutLineItemsAdd } = await fetch<
      Mutation,
      MutationCheckoutLineItemsAddArgs
    >({
      ...options,
      variables: {
        checkoutId: getCheckoutId(),
        lineItems: [
          {
            variantId: item.variantId,
            quantity: item.quantity ?? 1
          }
        ]
      }
    })

    return checkoutToCart(checkoutLineItemsAdd)
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCart()

      return useCallback(
        async function addItem(input) {
          const data = await fetch({ input })
          await mutate(data, false)
          return data
        },
        [fetch, mutate]
      )
    }
}
