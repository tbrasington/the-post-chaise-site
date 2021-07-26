import { NextApiRequest, NextApiResponse } from "next"

import { getClient } from "@sanity/sanity.server"
import { getProducts } from "@sanity/api/product"

// gets the navigation items from sanity
export default async function handle(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getClient(false).fetch(getProducts)

  return res.json(data)
}
