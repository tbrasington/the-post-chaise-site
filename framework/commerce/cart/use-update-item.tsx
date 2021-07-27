import type { HookFetcherFn, MutationHook } from "../utils/types"
import { useHook, useMutationHook } from "../utils/use-hook"

import type { Provider } from ".."
import type { UpdateItemHook } from "../types/cart"
import { mutationFetcher } from "../utils/default-fetcher"

export type UseUpdateItem<
  H extends MutationHook<UpdateItemHook<any>> = MutationHook<UpdateItemHook>
> = ReturnType<H["useHook"]>

export const fetcher: HookFetcherFn<UpdateItemHook> = mutationFetcher

const fn = (provider: Provider) => provider.cart?.useUpdateItem!

const useUpdateItem: UseUpdateItem = input => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(input)
}

export default useUpdateItem
