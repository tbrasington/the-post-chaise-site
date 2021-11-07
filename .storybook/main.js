const path = require('path');


module.exports = {
   webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "../components"),
      "@lib": path.resolve(__dirname, "../lib"),
      "@utils": path.resolve(__dirname, "../utils"),
      "@assets": path.resolve(__dirname, "../assets"),
      "@theme": path.resolve(__dirname, "../theme"),
      "@config": path.resolve(__dirname, "../config"),
      "@commerce": path.resolve(__dirname, "../commerce"),
      "@sanityLib": path.resolve(__dirname, "../framework/sanity")
    };

    // Return the altered config
    return config;
  },
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}

