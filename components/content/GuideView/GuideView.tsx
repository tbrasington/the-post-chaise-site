/** @jsxImportSource theme-ui */

import DmsCoordinates from "dms-conversion"
import { motion } from "framer-motion"
import { useNextSanityImage } from "next-sanity-image"
import { NextSeo } from "next-seo"
import React, { FC } from "react"
import { Box, Grid } from "theme-ui"

import { SliceRenderer, SliceWidth } from "@components/content/Slices"
import { Container, Text } from "@components/ui"
import config from "@config/seo.json"
import { getGuide } from "@sanityLib/api/guide"
import { PortableText, usePreviewSubscription } from "@sanityLib/sanity"
import { getClient } from "@sanityLib/sanity.server"
import { GuideIndexList, SanityGuide } from "@sanityLib/types/guides"
import { defaultMotionContainer } from "@theme/motion"
import { ColorTokens, StandardLeftIndent, TextStyleNames } from "@theme/tokens"

import { GuideCard } from "../"

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
            {data.data.short_description && (
              <PortableText
                blocks={data.data.short_description}
                sx={{
                  "& p + p": {
                    mt: 16
                  }
                }}
              />
            )}
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
