/** @jsxImportSource theme-ui */

import DmsCoordinates from "dms-conversion"
import { motion } from "framer-motion"
import { useNextSanityImage } from "next-sanity-image"
import { NextSeo } from "next-seo"
import React, { FC } from "react"
import { Box, Grid } from "theme-ui"

import { Zoom } from "@components/common"
import { SliceRenderer, SliceWidth } from "@components/content/Slices"
import { Container, Text } from "@components/ui"
import config from "@config/seo.json"
import { getGuide } from "@sanityLib/api/guide"
import { PortableText, usePreviewSubscription } from "@sanityLib/sanity"
import { getClient } from "@sanityLib/sanity.server"
import {
  GuideIndexList,
  PageContent,
  remappedAllMediaProps,
  SanityGuide
} from "@sanityLib/types/guides"
import { defaultMotionContainer } from "@theme/motion"
import { ColorTokens, StandardLeftIndent, TextStyleNames } from "@theme/tokens"

import { GuideCard } from "../"

interface GuideViewProps {
  content: SanityGuide
  allMedia?: remappedAllMediaProps[]
  preview?: boolean
  slug?: string
}

const GuideView: FC<GuideViewProps> = ({
  content,
  allMedia,
  preview = false,
  slug
}) => {
  // preview
  //
  const data = usePreviewSubscription(getGuide, {
    params: { slug: slug },
    initialData: { content, allMedia },
    enabled: preview
  })

  // // seo image
  const image =
    data && data.data.content.hero_image
      ? data.data.content.hero_image
      : "logo/disc.png"

  const SEOImage = useNextSanityImage(getClient(preview), image, {
    imageBuilder: imageUrlBuilder => {
      return imageUrlBuilder
        .width(800)
        .height(600)
        .crop("focalpoint")
        .fit("crop")
    }
  })

  const SEODescription = data.data.content.seo_description || config.description

  /// coords
  const LocationData = data.data.content.location
    ? data.data.content.location.split(",")
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

  // recomendations.
  const nearby = data.data.content.related?.nearby || []
  const timely = data.data.content.related?.time || []
  const mergedGuides: GuideIndexList[] = timely.concat(nearby)

  function getUniqueListBy(arr: GuideIndexList[]) {
    return [
      ...new Map(arr.map((item: GuideIndexList) => [item._id, item])).values()
    ]
  }

  const filteredGuide = getUniqueListBy(mergedGuides)

  // manage gallery zoom
  const [[zoomOpen, zoomKey], toggleZoom] = React.useState([false, "0"])

  const postedDate = new Date(data.data.content.date_of_guide)
  const textDate = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    postedDate
  )

  return (
    <>
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
            {data.data.content.title}
          </Text>
          <Text
            variant="page_title"
            as="p"
            sx={{
              color: ColorTokens.gray,
              mt: 8
            }}
          >
            {`${data.data.content.date_of_guide.split("-")[0]},
              ${textDate}`}
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
            variant="statement"
            as="div"
            sx={{
              mt: 32,
              mb: 12
            }}
          >
            {data.data.content.short_description && (
              <PortableText
                blocks={data.data.content.short_description}
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
      <motion.div
        variants={defaultMotionContainer}
        initial="hidden"
        animate="show"
        exit="exit"
        key={`page-${data.data.content._id}`}
      >
        <Container clean spacing={24}>
          {data.data.content.page_content.map(slice => {
            return (
              <Container clean={SliceWidth(slice)} key={slice._key}>
                <SliceRenderer
                  block={slice}
                  clickEvent={(clickData?: string) => {
                    toggleZoom([!zoomOpen, clickData || ""])
                  }}
                />
              </Container>
            )
          })}
        </Container>
      </motion.div>

      {filteredGuide && (
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
            {filteredGuide.map((item: GuideIndexList) => {
              return (
                <GuideCard
                  key={`recomendations-${item._id}`}
                  item={item}
                  showDescription={false}
                />
              )
            })}
          </Grid>
        </Container>
      )}

      <NextSeo
        title={`${data.data.content.title} | ${config.title}`}
        description={SEODescription}
        openGraph={{
          type: "website",
          title: `${data.data.content.title} | ${config.title}`,
          description: SEODescription,
          images: [
            {
              url: SEOImage?.src!,
              width: 800,
              height: 600,
              alt: data.data.content.title
            }
          ]
        }}
      />

      {data.data.allMedia && zoomOpen && (
        <motion.div
          style={{
            opacity: 0,
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          animate={{
            opacity: 1
          }}
        >
          <Zoom
            slides={data.data.allMedia}
            initialIndex={zoomKey}
            close={() => {
              toggleZoom([false, "0"])
            }}
          />
        </motion.div>
      )}
    </>
  )
}

export default GuideView
