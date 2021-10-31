import * as Sentry from "@sentry/nextjs"
import { NextApiRequest, NextApiResponse } from "next"

export const customWithSentry = (handler: {
  (req: NextApiRequest, res: NextApiResponse<any>): Promise<void>
  (arg0: NextApiRequest, arg1: NextApiResponse<any>): any
}) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await handler(req, res)
    } catch (error) {
      Sentry.captureException(error)

      return new Promise((_, reject) => {
        Sentry.flush(2000).finally(() => {
          reject(error)
        })
      })
    }
  }
}
