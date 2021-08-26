/** @jsxImportSource theme-ui */

import { Container, Text } from "@components/ui"
import { SliceRenderer, SliceWidth } from "@components/content/Slices"

import { Box } from "theme-ui"
import { FC } from "react"
import { NextSeo } from "next-seo"
import { PortableText } from "@sanity/sanity"
import { SanityGuide } from "@sanity/types/guides"
import { TextStyleNames } from "@theme/tokens"
import { getClient } from "@sanity/sanity.server"
import { useNextSanityImage } from "next-sanity-image"

interface GuideViewProps {
  content: SanityGuide
}

const GuideView: FC<GuideViewProps> = ({ content }) => {
  // // seo image
  const image =
    content && content.hero_image ? content.hero_image : "logo/disc.png"

  const SEOImage = useNextSanityImage(getClient(false), image, {
    imageBuilder: imageUrlBuilder => {
      return imageUrlBuilder
        .width(800)
        .height(600)
        .crop("focalpoint")
        .fit("crop")
    }
  })

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
          <Text variant="page_title">{content.title}</Text>
          <Box
            sx={{
              m: "auto",
              mb: 48,
              p: {
                variant: `text.${TextStyleNames.statement}`
              }
            }}
          >
            <PortableText blocks={content.short_description} />
          </Box>
        </Box>
      </Container>

      <Container clean spacing={96} sx={{ mb: 128 }}>
        {content.page_content.map(slice => {
          return (
            <Container clean={SliceWidth(slice)} key={slice._key}>
              <SliceRenderer block={slice} />
            </Container>
          )
        })}
      </Container>

      <NextSeo
        title={content.title}
        description={content.seo_description}
        openGraph={{
          type: "website",
          title: content.title,
          description: content.title,
          images: [
            {
              url: SEOImage?.src!,
              width: 800,
              height: 600,
              alt: content.title
            }
          ]
        }}
      />
    </>
  )
}

export default GuideView
