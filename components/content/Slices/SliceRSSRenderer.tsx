import { Fragment } from "react"
import { PageContent } from "@sanityLib/types/guides"
import MediaGridRSS from "./MediaGridRSS"
import { MediaRSS, ParagraphRSS } from "."

type SliceRSSRendererProps = {
  block: PageContent
}

function SliceRendererRSS({ block }: SliceRSSRendererProps) {
  switch (block._type) {
    case "paragraph":
      return <ParagraphRSS content={block} />
    case "Media":
      return <MediaRSS content={block} />
    case "mediaGrid":
      return <MediaGridRSS content={block} />
    default:
      return <Fragment />
  }
}

export default SliceRendererRSS
