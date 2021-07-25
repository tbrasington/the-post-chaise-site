import { GetProductBySlugQuery, Product as ShopifyProduct } from "../../schema"
import type {
  OperationContext,
  OperationOptions
} from "@commerce/api/operations"
import type { Provider, ShopifyConfig } from ".."
import { getProductQuery, normalizeProduct } from "../../utils"

import { GetProductOperation } from "../../types/product"

export default function getProductOperation({
  commerce
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>(opts: {
    variables: T["variables"]
    config?: Partial<ShopifyConfig>
    preview?: boolean
  }): Promise<T["data"]>

  async function getProduct<T extends GetProductOperation>(
    opts: {
      variables: T["variables"]
      config?: Partial<ShopifyConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T["data"]>

  async function getProduct<T extends GetProductOperation>({
    query = getProductQuery,
    variables,
    config: cfg
  }: {
    query?: string
    variables: T["variables"]
    config?: Partial<ShopifyConfig>
    preview?: boolean
  }): Promise<T["data"]> {
    const { fetch, locale } = commerce.getConfig(cfg)

    const {
      data: { productByHandle }
    } = await fetch<GetProductBySlugQuery>(
      query,
      {
        variables
      },
      {
        ...(locale && {
          headers: {
            "Accept-Language": locale
          }
        })
      }
    )

    return {
      ...(productByHandle && {
        product: normalizeProduct(productByHandle as ShopifyProduct)
      })
    }
  }

  return getProduct
}
