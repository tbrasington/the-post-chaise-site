import type { HookFetcherFn, SWRHook } from "../utils/types"
import { Provider, useCommerce } from ".."
import { useHook, useSWRHook } from "../utils/use-hook"

import Cookies from "js-cookie"
import type { GetCartHook } from "../types/cart"

export type UseCart<
  H extends SWRHook<GetCartHook<any>> = SWRHook<GetCartHook>
> = ReturnType<H["useHook"]>

export const fetcher: HookFetcherFn<GetCartHook> = async ({
  options,
  input: { cartId },
  fetch
}) => {
  return cartId ? await fetch(options) : null
}

const fn = (provider: Provider) => provider.cart?.useCart!

const useCart: UseCart = input => {
  const hook = useHook(fn)
  const { cartCookie } = useCommerce()
  const fetcherFn = hook.fetcher ?? fetcher
  const wrapper: typeof fetcher = context => {
    context.input.cartId = Cookies.get(cartCookie)
    return fetcherFn(context)
  }
  return useSWRHook({ ...hook, fetcher: wrapper })(input)
}

export default useCart
