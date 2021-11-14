import { Fragment } from "react"
import Gallery from "./Gallery"
import Media from "./Media"
import { PageContent } from "@sanityLib/types/guides"
import Paragraph from "./Paragraph"
import MediaGrid from "./MediaGrid"

type SliceRendererProps = {
  block: PageContent
  clickEvent?: (clickData?: string) => void
}

function SliceRenderer({ block, clickEvent }: SliceRendererProps) {
  switch (block._type) {
    case "paragraph":
      return <Paragraph content={block} />
    case "Media":
      return <Media content={block} clickEvent={clickEvent && clickEvent} />
    case "gallery":
      return <Gallery content={block} />
    case "mediaGrid":
      return <MediaGrid content={block} clickEvent={clickEvent && clickEvent} />
    default:
      return <Fragment />
  }
}

export default SliceRenderer
