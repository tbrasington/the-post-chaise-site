const commerce = require("./commerce.config.json")
const {
  withCommerceConfig,
  getProviderName
} = require("./framework/commerce/config")
const { withSentryConfig } = require("@sentry/nextjs")

const provider = commerce.provider || getProviderName()
const isBC = provider === "bigcommerce"
const isShopify = provider === "shopify"
const isSaleor = provider === "saleor"
const isSwell = provider === "swell"
const isVendure = provider === "vendure"

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

module.exports = withSentryConfig(
  withCommerceConfig(
    {
      commerce,
      i18n: {
        locales: ["en-GB"],
        defaultLocale: "en-GB"
      },
      images: {
        domains: ["cdn.sanity.io"]
      },
      rewrites() {
        return [
          (isBC || isShopify || isSwell || isVendure) && {
            source: "/checkout",
            destination: "/api/checkout"
          },
          // The logout is also an action so this route is not required, but it's also another way
          // you can allow a logout!
          isBC && {
            source: "/logout",
            destination: "/api/logout?redirect_to=/"
          },
          // For Vendure, rewrite the local api url to the remote (external) api url. This is required
          // to make the session cookies work.
          isVendure &&
            process.env.NEXT_PUBLIC_VENDURE_LOCAL_URL && {
              source: `${process.env.NEXT_PUBLIC_VENDURE_LOCAL_URL}/:path*`,
              destination: `${process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL}/:path*`
            }
        ].filter(Boolean)
      }
    },
    SentryWebpackPluginOptions
  )
)

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log("next.config.js", JSON.stringify(module.exports, null, 2))
