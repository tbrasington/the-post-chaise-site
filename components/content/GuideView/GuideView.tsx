/** @jsxImportSource theme-ui */
import { Box, Flex } from "theme-ui"
import { Container, Text } from "@components/ui"
import { SliceRenderer, SliceWidth } from "@components/content/Slices"

import { FC } from "react"
import { NextSeo } from "next-seo"
import { PortableText } from "@sanity/sanity"
import { SanityGuide } from "@sanity/types/guides"
import { TextStyleNames } from "@theme/tokens"

interface GuideViewProps {
  content: SanityGuide
}

const GuideView: FC<GuideViewProps> = ({ content }) => {
  // // seo image
  // const image =
  //   sanityProduct && sanityProduct.gallery
  //     ? sanityProduct.gallery[0].Image
  //     : "logo/disc.png"

  // const SEOImage = useNextSanityImage(getClient(false), image, {
  //   imageBuilder: imageUrlBuilder => {
  //     return imageUrlBuilder.width(800).height(600).crop("focalpoint")
  //   }
  // })

  console.log({ content: content.page_content })

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
              p: {
                variant: `text.${TextStyleNames.statement}`
              }
            }}
          >
            <PortableText blocks={content.short_description} />
          </Box>
        </Box>
      </Container>

      {content.page_content.map(slice => {
        return (
          <Container
            clean={SliceWidth(slice)}
            key={slice._key}
            sx={{
              "& > * + *": {
                mt: 64
              }
            }}
          >
            <SliceRenderer block={slice} />
          </Container>
        )
      })}

      <NextSeo
        title={content.title}
        description={"get desc"}
        openGraph={{
          type: "website",
          title: content.title,
          description: content.title,
          images: [
            // {
            //   url: SEOImage?.src!,
            //   width: 800,
            //   height: 600,
            //   alt: sanityProduct.title
            // }
          ]
        }}
      />
    </>
  )
}

export default GuideView
