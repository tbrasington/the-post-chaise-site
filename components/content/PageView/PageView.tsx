/** @jsxImportSource theme-ui */

import { Container, Text } from "@components/ui"

import { Box } from "theme-ui"
import { FC } from "react"
import { NextSeo } from "next-seo"
import { PortableText } from "@sanity/sanity"
import { StandardLeftIndent, TextStyleNames } from "@theme/tokens"
import { SanityPage } from "@sanity/types/page"
import { defaultMotionContainer } from "@theme/motion"
import { motion } from "framer-motion"

type Props = {
  content: SanityPage
}
const PageView: FC<Props> = ({ content }) => {
  const { title, body, seo_description } = content
  return (
    <motion.div
      variants={defaultMotionContainer}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Container sx={{ ml: StandardLeftIndent }}>
        <Text variant="page_title">{title}</Text>
        <Box
          sx={{
            m: "auto",
            mb: 48,
            minHeight: "60vh",

            p: {
              maxWidth: "72ch",
              variant: `text.${TextStyleNames.paragraph}`
            }
          }}
        >
          <PortableText blocks={body} />
        </Box>
      </Container>

      <NextSeo title={title} description={seo_description} />
    </motion.div>
  )
}

export default PageView
