import { FC } from "react"
import NextHead from "next/head"
import { DefaultSeo } from "next-seo"
import config from "@config/seo.json"

const Head: FC = () => {
  return (
    <>
      <DefaultSeo {...config} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`RSS feed for ${config.openGraph.url}`}
          href="/rss.xml"
          key="rss-feed"
        />
      </NextHead>
    </>
  )
}

export default Head
