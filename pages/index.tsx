/** @jsxImportSource theme-ui */
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import fs from "fs"
import { Container } from "@components/ui"
import { Layout } from "@components/common"
import { getClient } from "@sanityLib/sanity.server"
import { getNavigation } from "@sanityLib/api/meta"
import { Text } from "@components/ui"
import { GuideIndexList, GuideRSSList } from "@sanityLib/types/guides"
import { GuideCard } from "@components/content"
import { Flex, Box, Grid } from "@theme-ui/components"
import { getGuideIndexList, getGuideRSSList } from "@sanityLib/api/guide"
import { motion } from "framer-motion"
import { StandardLeftIndent, TextStyleNames } from "@theme/tokens"
import { defaultMotionContainer, motionItem } from "@theme/motion"
import { generateRss } from "@lib/rss"
import { NextSeo } from "next-seo"
import config from "@config/seo.json"

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const sanityMetaData = await getClient(preview || false).fetch(getNavigation)

  const guides: GuideIndexList[] = await getClient(preview || false).fetch(
    getGuideIndexList
  )

  const dates = guides.map(item => item.date_of_guide.split("-")[0])
  const uniqeYears = [...new Set(dates)]
  const groupedGuidesByYear: Array<{ year: string; items: GuideIndexList[] }> =
    uniqeYears.map(el => {
      return {
        year: el,
        items: guides.filter(item => item.date_of_guide.split("-")[0] === el)
      }
    })

  // rss content
  const guidesForRSS: GuideRSSList[] = await getClient(preview || false).fetch(
    getGuideRSSList
  )

  const rss = await generateRss(guidesForRSS)

  fs.writeFileSync("./public/rss.xml", rss)

  return {
    props: {
      pages: sanityMetaData,
      groupedGuidesByYear
    },
    revalidate: 60
  }
}

export default function Home({
  pages,
  groupedGuidesByYear
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <motion.div
      variants={defaultMotionContainer}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Container
        el="section"
        sx={{
          ml: [80, 80, 96],
          mb: [48, null, 96]
        }}
      >
        <Text
          variant="paragraph"
          sx={{
            maxWidth: "38ch"
          }}
        >
          {pages.site_description}
        </Text>
      </Container>
      <Container
        el="section"
        sx={{
          "& > div + div": {
            mt: 32
          }
        }}
      >
        <Text
          variant="sub_heading"
          sx={{
            ml: StandardLeftIndent,
            mb: 12
          }}
        >
          Stories
        </Text>
        {groupedGuidesByYear.map(groupYear => {
          return (
            <Flex
              key={`grid-${groupYear.year}`}
              sx={{
                flexDirection: ["column", "row"]
              }}
            >
              <Box
                sx={{
                  position: ["relative", "sticky"],
                  top: [0, 32],
                  height: 12,
                  width: ["100%", 80, 96],
                  mb: 12,
                  variant: `text.${TextStyleNames.label_upper}`,
                  zIndex: 2
                }}
              >
                {groupYear.year}
              </Box>
              <Grid
                sx={{
                  flex: 1,
                  p: 0,
                  m: 0
                }}
                columns={[1, 3, 4]}
                gap={12}
                as="ol"
              >
                {groupYear.items.map((item: GuideIndexList) => {
                  return (
                    <motion.li
                      key={item._id}
                      variants={motionItem}
                      sx={{ listStyle: "none", m: 0, p: 0 }}
                    >
                      <GuideCard item={item} showDescription={false} />
                    </motion.li>
                  )
                })}
              </Grid>
            </Flex>
          )
        })}
      </Container>

      <NextSeo
        title={`${config.title}`}
        description={config.description}
        openGraph={{
          title: config.title,
          description: config.description,
          images: [
            {
              url: config.openGraph.images[0].url,
              width: 1820,
              height: 904,
              alt: config.openGraph.images[0].alt
            }
          ]
        }}
      />
    </motion.div>
  )
}

Home.Layout = Layout
