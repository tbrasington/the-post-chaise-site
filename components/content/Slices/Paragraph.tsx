import { Box } from "theme-ui"
import { FC } from "react"
import { PageContent } from "@sanityLib/types/guides"
import { PortableText } from "@sanityLib/sanity"
import { TextStyleNames } from "@theme/tokens"

interface ParagraphProps {
  content: PageContent
}

const Paragraph: FC<ParagraphProps> = ({ content }) => {
  return (
    <Box
      sx={{
        variant: `text.${TextStyleNames.paragraph}`,
        maxWidth: "56ch",
        margin: "auto"
      }}
    >
      <PortableText blocks={content.body} />
    </Box>
  )
}

export default Paragraph
