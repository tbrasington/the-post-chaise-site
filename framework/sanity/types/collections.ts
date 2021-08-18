import { SanityProduct } from "./product"

export interface SanityCollection {
  _id: string
  title: string
  description: string
  products: SanityProduct[]
  shopifyId: string
  slug: string
}
