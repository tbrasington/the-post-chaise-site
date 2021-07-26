import { GetAPISchema, createEndpoint } from "@commerce/api"

import type { CheckoutSchema } from "../../../types/checkout"
import type { ShopifyAPI } from "../.."
import checkout from "./checkout"
import checkoutEndpoint from "@commerce/api/endpoints/checkout"

export type CheckoutAPI = GetAPISchema<ShopifyAPI, CheckoutSchema>

export type CheckoutEndpoint = CheckoutAPI["endpoint"]

export const handlers: CheckoutEndpoint["handlers"] = { checkout }

const checkoutApi = createEndpoint<CheckoutAPI>({
  handler: checkoutEndpoint,
  handlers
})

export default checkoutApi
