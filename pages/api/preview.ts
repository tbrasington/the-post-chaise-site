import { getGuide } from "@sanity/api/guide"
import { getClient } from "@sanity/sanity.server"
import type { NextApiRequest, NextApiResponse } from "next"
import * as Sentry from "@sentry/nextjs"

async function preview(req: NextApiRequest, res: NextApiResponse) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  try {
    if (
      req.query.secret !== process.env.SANITY_STUDIO_PREVIEW_SECRET ||
      !req.query.slug ||
      !req.query.type
    ) {
      return res.status(401).json({ message: "Invalid token" })
    }

    // Fetch the headless CMS to check if the provided `slug` exists
    if (req.query.type === "guide") {
      const guideContent = await getClient(true).fetch(getGuide, {
        slug: req.query.slug
      })

      if (!guideContent) {
        return res.status(401).json({ message: "Invalid slug" })
      }

      res.setPreviewData({})

      await Sentry.flush(2000)

      res.writeHead(307, {
        Location: `/stories-and-guides/${guideContent.slug}`
      })
      res.end()
    } else {
      await Sentry.flush(2000)

      res.end()
    }
  } catch (e: any) {
    Sentry.captureException(e)

    await Sentry.flush(2000)

    res.json({
      error: true,
      message:
        process.env.NEXT_PUBLIC_APP_STAGE === "production"
          ? undefined
          : e.message
    })
  }
}

export default preview

// A simple example for testing it manually from your browser.
// If this is located at pages/api/preview.js, then
// open /api/preview from your browser.
// export default (req:any, res:any) => {
//   res.setPreviewData({})
//   res.end('Preview mode enabled')
// }
