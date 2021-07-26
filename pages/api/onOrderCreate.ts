import { webhooks } from "@sanity/webhooks"
import { withSentry } from "@sentry/nextjs"

export default withSentry(webhooks.onOrderCreate)
