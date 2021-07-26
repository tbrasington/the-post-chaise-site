import {
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
  Product as ShopifyProduct
} from "../../schema"
import type {
  OperationContext,
  OperationOptions
} from "@commerce/api/operations"
import type { Provider, ShopifyConfig } from ".."

import { GetAllProductsOperation } from "../../types/product"
import getAllProductsQuery from "../../utils/queries/get-all-products-query"
import { normalizeProduct } from "../../utils"

export default function getAllProductsOperation({
  commerce
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>(opts?: {
    variables?: T["variables"]
    config?: Partial<ShopifyConfig>
    preview?: boolean
  }): Promise<T["data"]>

  async function getAllProducts<T extends GetAllProductsOperation>(
    opts: {
      variables?: T["variables"]
      config?: Partial<ShopifyConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T["data"]>

  async function getAllProducts<T extends GetAllProductsOperation>({
    query = getAllProductsQuery,
    variables,
    config
  }: {
    query?: string
    variables?: T["variables"]
    config?: Partial<ShopifyConfig>
    preview?: boolean
  } = {}): Promise<T["data"]> {
    const { fetch, locale } = commerce.getConfig(config)

    const { data } = await fetch<
      GetAllProductsQuery,
      GetAllProductsQueryVariables
    >(
      query,
      { variables },
      {
        ...(locale && {
          headers: {
            "Accept-Language": locale
          }
        })
      }
    )

    return {
      products: data.products.edges.map(({ node }) =>
        normalizeProduct(node as ShopifyProduct)
      )
    }
  }

  return getAllProducts
}
