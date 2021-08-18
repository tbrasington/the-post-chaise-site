/** @jsxImportSource theme-ui */

import { Container, Text } from "@components/ui"

import { Box } from "theme-ui"
import { FC } from "react"
import { NextSeo } from "next-seo"
import { PortableText } from "@sanity/sanity"
import { TextStyleNames } from "@theme/tokens"
import { SanityPage } from "@sanity/types/page"

type Props = {
  content: SanityPage
}
const PageView: FC<Props> = ({ content }) => {
  const { title, body, seo_description } = content
  return (
    <>
      <Container>
        <Box
          sx={{
            m: "auto",
            variant: `text.${TextStyleNames.paragraph}`,
            maxWidth: "56ch"
          }}
        >
          <Text variant="page_title">{title}</Text>
          <Box
            sx={{
              m: "auto",
              mb: 48,
              minHeight: "40vh",
              p: {
                variant: `text.${TextStyleNames.paragraph}`
              }
            }}
          >
            <PortableText blocks={body} />
          </Box>
        </Box>
      </Container>

      <NextSeo title={title} description={seo_description} />
    </>
  )
}

export default PageView
