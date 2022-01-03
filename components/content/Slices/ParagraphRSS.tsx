import { FC } from "react"
import { PageContent } from "@sanityLib/types/guides"
import { PortableText } from "@sanityLib/sanity"

interface ParagraphProps {
  content: PageContent
}

const ParagraphRSS: FC<ParagraphProps> = ({ content }) => {
  return <PortableText blocks={content.body} />
}

export default ParagraphRSS
