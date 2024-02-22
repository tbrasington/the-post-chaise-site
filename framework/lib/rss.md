import { PortableText } from '@sanityLib/sanity'
import { GuideRSSList, PageContent } from '@sanityLib/types/guides'
import { SliceRendererRSS } from '@components/content/Slices'

import config from '../config/seo.json'
import ReactDOMServer from 'react-dom/server'
import { Fragment } from 'react'

const URL = config.openGraph.url
const TITLE = config.openGraph.title
const SUBTITLE = config.openGraph.description

function generateSlices(page_content: PageContent[]) {
  const slices = page_content.map((slice) => {
    return <SliceRendererRSS key={slice._key} block={slice} />
  })

  return ReactDOMServer.renderToStaticMarkup(<div>{slices}</div>)
}
export async function generateRssItem(post: GuideRSSList) {
  // i need to convert page content here to neat html

  const content = post.short_description ? (
    <PortableText blocks={post.short_description} />
  ) : (
    <Fragment />
  )

  const contentString = ReactDOMServer.renderToStaticMarkup(content)
  const sliceString = generateSlices(post.page_content)
  // get slices

  return `
    <item>
      <guid>${URL}/stories-and-guides/${post.slug}</guid>
      <title>${post.title}</title>
      <description>${post.seo_description || ''}</description>
      <link>${URL}/stories-and-guides/${post.slug}</link>
      <pubDate>${new Date(post.date_of_guide).toUTCString()}</pubDate>
      <content:encoded><![CDATA[${contentString}${sliceString}]]></content:encoded>
    </item>
  `
}

export async function generateRss(posts: GuideRSSList[]) {
  const itemsList = await Promise.all(posts.map(generateRssItem))

  return `
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
      <channel>
        <title>${TITLE}</title>
        <link>${URL}</link>
        <description>${SUBTITLE}</description>
        <language>en</language>
        <lastBuildDate>${new Date(
          posts[0].date_of_guide,
        ).toUTCString()}</lastBuildDate>
        <atom:link href="${URL}" rel="self" type="application/rss+xml"/>
        ${itemsList.join('')}
      </channel>
    </rss>
  `
}
