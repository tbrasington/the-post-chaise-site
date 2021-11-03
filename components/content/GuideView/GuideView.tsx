/** @jsxImportSource theme-ui */

import { Container, Text } from "@components/ui"
import { SliceRenderer, SliceWidth } from "@components/content/Slices"

import { Box, Grid } from "theme-ui"
import React, { FC } from "react"
import { NextSeo } from "next-seo"
import { PortableText, usePreviewSubscription } from "@sanity/sanity"
import { GuideIndexList, SanityGuide } from "@sanity/types/guides"
import { ColorTokens, StandardLeftIndent, TextStyleNames } from "@theme/tokens"
import { getClient } from "@sanity/sanity.server"
import { useNextSanityImage } from "next-sanity-image"
import DmsCoordinates from "dms-conversion"
import { motion } from "framer-motion"
import { defaultMotionContainer } from "@theme/motion"
import { getGuide } from "@sanity/api/guide"
import config from "@config/seo.json"
import { GuideCard } from ".."

interface GuideViewProps {
  content: SanityGuide
  preview?: boolean
  slug?: string
}

const GuideView: FC<GuideViewProps> = ({ content, preview = false, slug }) => {
  // preview
  //
  const data = usePreviewSubscription(getGuide, {
    params: { slug: slug },
    initialData: content,
    enabled: preview
  })

  // // seo image
  const image =
    data && data.data.hero_image ? data.data.hero_image : "logo/disc.png"

  const SEOImage = useNextSanityImage(getClient(preview), image, {
    imageBuilder: imageUrlBuilder => {
      return imageUrlBuilder
        .width(800)
        .height(600)
        .crop("focalpoint")
        .fit("crop")
    }
  })

  const SEODescription = data.data.seo_description || config.description

  /// coords
  const LocationData = data.data.location
    ? data.data.location.split(",")
    : [0, 0]
  const DMSCoordinates = new DmsCoordinates(
    Number(LocationData[0]),
    Number(LocationData[1])
  )

  const { longitude, latitude } = DMSCoordinates.dmsArrays
  const [dlo, mlo, slo, nsewlo] = longitude
  const [dla, mla, sla, nsewla] = latitude

  const west = `${dlo}° ${mlo}′ ${Math.round(slo)}″ ${nsewlo} `
  const north = `${dla}° ${mla}′ ${Math.round(sla)}″ ${nsewla}`

  // recomendations
  const mergedRecomendations = data.data.related?.nearby
    ?.concat(data.data.related?.time || [])
    .slice(0, 4)

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
            {data.data.title}
          </Text>
          <Text
            variant="page_title"
            as="p"
            sx={{
              color: ColorTokens.gray,
              mt: 8
            }}
          >
            {data.data.date_of_guide.split("-")[0]}
          </Text>

          <Text
            variant="sub_heading"
            as="p"
            sx={{
              color: ColorTokens.text,
              mt: 24
            }}
          >
            {`${north}, ${west}`}
          </Text>

          <Text
            variant="paragraph"
            as="div"
            sx={{
              mt: 32,
              mb: 56
            }}
          >
            <PortableText blocks={data.data.short_description} />
          </Text>
        </Box>
      </Container>

      <Container clean spacing={24}>
        {data.data.page_content.map(slice => {
          return (
            <Container clean={SliceWidth(slice)} key={slice._key}>
              <SliceRenderer block={slice} />
            </Container>
          )
        })}
      </Container>

      {mergedRecomendations && (
        <Container sx={{ mx: StandardLeftIndent }}>
          <Text
            variant="sub_heading"
            sx={{
              mt: 128,

              mb: 12
            }}
          >
            Further
          </Text>

          <Grid
            sx={{
              flex: 1,
              p: 0,
              m: 0
            }}
            columns={[2, 4, 4]}
            gap={12}
            as="ol"
          >
            {mergedRecomendations.map((item: GuideIndexList) => {
              return (
                <GuideCard key={item._id} item={item} showDescription={false} />
              )
            })}
          </Grid>
        </Container>
      )}

      <NextSeo
        title={`${data.data.title} | ${config.title}`}
        description={SEODescription}
        openGraph={{
          type: "website",
          title: `${data.data.title} | ${config.title}`,
          description: SEODescription,
          images: [
            {
              url: SEOImage?.src!,
              width: 800,
              height: 600,
              alt: data.data.title
            }
          ]
        }}
      />
    </motion.div>
  )
}

export default GuideView
