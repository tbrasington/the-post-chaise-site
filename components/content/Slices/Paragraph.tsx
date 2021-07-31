import { Box } from "theme-ui"
import { FC } from "react"
import { PageContent } from "@sanity/types/guides"
import { PortableText } from "@sanity/sanity"
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
