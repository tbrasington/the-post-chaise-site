import { NextApiRequest, NextApiResponse } from "next"

async function exit(_req: NextApiRequest, res: NextApiResponse) {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData()

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: "/" })
  res.end()
}

export default exit
