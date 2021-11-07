import { PageContent } from "@sanityLib/types/guides"

function SliceWidth(block: PageContent) {
  switch (block._type) {
    case "paragraph":
      return false
    case "gallery":
      return true
    case "Media":
      return true
    case "mediaGrid":
      return false
    default:
      return false
  }
}

export default SliceWidth
