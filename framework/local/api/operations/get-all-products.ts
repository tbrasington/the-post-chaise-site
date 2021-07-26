import type { LocalConfig, Provider } from "../index"

import { GetAllProductsOperation } from "@commerce/types/product"
import type { OperationContext } from "@commerce/api/operations"
import { Product } from "@commerce/types/product"
import data from "../../data.json"

export default function getAllProductsOperation({
  commerce
}: OperationContext<any>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    query = "",
    variables,
    config
  }: {
    query?: string
    variables?: T["variables"]
    config?: Partial<LocalConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    return {
      products: data.products
    }
  }
  return getAllProducts
}
