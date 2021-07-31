import { NextApiRequest, NextApiResponse } from "next"

import { getClient } from "@sanity/sanity.server"
import { getGuides } from "@sanity/api/guide"

// gets the navigation items from sanity
export default async function handle(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getClient(false).fetch(getGuides)

  return res.json(data)
}
