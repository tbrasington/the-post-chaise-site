import Media from './media'
import { PageContent } from '@/sanity/types/guides'
import Paragraph from './paragraph'
import MediaGrid from './media-grid'

type SliceRendererProps = {
  block: PageContent
  clickEvent?: (clickData?: string) => void
}

function SliceRenderer({ block }: SliceRendererProps) {
  switch (block._type) {
    case 'paragraph':
      return <Paragraph content={block} />
    case 'Media':
      return <Media content={block} />
    case 'mediaGrid':
      return <MediaGrid content={block} />
    default:
      return null
  }
}

export default SliceRenderer
