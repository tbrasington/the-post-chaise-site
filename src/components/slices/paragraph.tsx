import { PortableText } from '@portabletext/react'
import type { PageContent } from '@/sanity/types/guides'
import { myPortableTextComponents } from '../portable-components'

function Paragraph({ content }: { content: PageContent }) {
  return (
    <div className="prose prose-sm">
      <PortableText
        value={content?.body || []}
        components={myPortableTextComponents}
      />
    </div>
  )
}

export default Paragraph
