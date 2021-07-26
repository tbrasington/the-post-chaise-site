import { NextApiRequest, NextApiResponse } from "next"

import { getClient } from "@sanity/sanity.server"
import { getProduct } from "@sanity/api/product"

// gets the navigation items from sanity
export default async function handle(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getClient(false).fetch(getProduct, {
    slug: _req.query.slug
  })

  return res.json(data)
}
