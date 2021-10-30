/** @jsxImportSource theme-ui */

import { Container, Text } from "@components/ui"
import { SliceRenderer, SliceWidth } from "@components/content/Slices"

import { Box } from "theme-ui"
import { FC } from "react"
import { NextSeo } from "next-seo"
import { PortableText } from "@sanity/sanity"
import { SanityGuide } from "@sanity/types/guides"
import { ColorTokens, StandardLeftIndent, TextStyleNames } from "@theme/tokens"
import { getClient } from "@sanity/sanity.server"
import { useNextSanityImage } from "next-sanity-image"
import DmsCoordinates from "dms-conversion"
import { motion } from "framer-motion"
import { defaultMotionContainer } from "@theme/motion"

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

  /// coords
  const LocationData = content.location ? content.location.split(",") : [0, 0]
  const DMSCoordinates = new DmsCoordinates(
    Number(LocationData[0]),
    Number(LocationData[1])
  )

  const { longitude, latitude } = DMSCoordinates.dmsArrays
  const [dlo, mlo, slo, nsewlo] = longitude
  const [dla, mla, sla, nsewla] = latitude

  const west = `${dlo}° ${mlo}′ ${Math.round(slo)}″ ${nsewlo} `
  const north = `${dla}° ${mla}′ ${Math.round(sla)}″ ${nsewla}`

  return (
    <motion.div
      variants={defaultMotionContainer}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Container sx={{ ml: StandardLeftIndent }}>
        <Box
          sx={{
            variant: `text.${TextStyleNames.paragraph}`,
            maxWidth: "56ch"
          }}
        >
          <Text
            variant="page_title"
            sx={{
              color: ColorTokens.secondary
            }}
          >
            {content.title}
          </Text>
          <Text
            variant="page_title"
            as="p"
            sx={{
              color: ColorTokens.gray,
              mt: 8
            }}
          >
            {content.date_of_guide.split("-")[0]}
          </Text>

          <Text
            variant="sub_heading"
            as="p"
            sx={{
              color: ColorTokens.gray,
              mt: 24
            }}
          >
            {`${north}, ${west}`}
          </Text>

          <Text
            variant="paragraph"
            sx={{
              mt: 32,
              mb: 56
            }}
          >
            <PortableText blocks={content.short_description} />
          </Text>
        </Box>
      </Container>

      <Container clean spacing={24}>
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
    </motion.div>
  )
}

export default GuideView
