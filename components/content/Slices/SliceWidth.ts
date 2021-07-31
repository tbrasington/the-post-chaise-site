import { PageContent } from "@sanity/types/guides"

function SliceWidth(block: PageContent) {
  switch (block._type) {
    case "paragraph":
      return false
    case "gallery":
      return true
    case "Media":
      return true
    default:
      return false
  }
}

export default SliceWidth
