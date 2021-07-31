import { Fragment } from "react"
import Gallery from "./Gallery"
import Media from "./Media"
import { PageContent } from "@sanity/types/guides"
import Paragraph from "./Paragraph"

type SliceRendererProps = {
  block: PageContent
}

function SliceRenderer({ block }: SliceRendererProps) {
  switch (block._type) {
    case "paragraph":
      return <Paragraph content={block} />
    case "Media":
      return <Media content={block} />
    case "gallery":
      return <Gallery content={block} />
    default:
      return <Fragment />
  }
}

export default SliceRenderer
