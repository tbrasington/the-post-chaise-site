const withPlugins = require("next-compose-plugins")

const { withSentryConfig } = require("@sentry/nextjs")

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

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

// module.exports = withBundleAnalyzer(
//   withSentryConfig(withCommerceConfig(SentryWebpackPluginOptions))
// )

module.exports = withPlugins([
  [withBundleAnalyzer],
  [withSentryConfig, SentryWebpackPluginOptions],
  [
    {
      i18n: {
        locales: ["en-GB"],
        defaultLocale: "en-GB"
      },
      images: {
        domains: ["cdn.sanity.io"],
        loader: "custom"
      }
    }
  ]
  // your other plugins here
])

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log("next.config.js", JSON.stringify(module.exports, null, 2))
