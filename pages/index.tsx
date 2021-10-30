/** @jsxImportSource theme-ui */
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next"

import { Container } from "@components/ui"
import { Layout } from "@components/common"
import { getClient } from "@sanity/sanity.server"
import { getNavigation } from "@sanity/api/meta"
import { Text } from "@components/ui"
import { GuideIndexList } from "@sanity/types/guides"
import { GuideCard } from "@components/content"
import { Flex, Box, Grid } from "@theme-ui/components"
import { getGuideIndexList } from "@sanity/api/guide"
import { motion } from "framer-motion"
import { StandardLeftIndent, TextStyleNames } from "@theme/tokens"
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
  const MotionGrid = motion(Grid)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const motionItem = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1 },
    exit: { y: 30, opacity: 0 }
  }

  return (
    <>
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
                  width: ["100%", 80, 96],
                  mb: 12,
                  variant: `text.${TextStyleNames.label_upper}`
                }}
              >
                {groupYear.year}
              </Box>
              <MotionGrid
                sx={{
                  flex: 1,
                  p: 0,
                  m: 0
                }}
                columns={[1, 3, 4]}
                gap={12}
                variants={container}
                initial="hidden"
                animate="show"
                as="ol"
                transition={{
                  duration: 0
                }}
              >
                {groupYear.items.map((item: GuideIndexList) => {
                  return (
                    <motion.li
                      key={item._id}
                      variants={motionItem}
                      sx={{ listStyle: "none", m: 0, p: 0 }}
                      transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 100
                      }}
                    >
                      <GuideCard item={item} showDescription={false} />
                    </motion.li>
                  )
                })}
              </MotionGrid>
            </Flex>
          )
        })}
      </Container>
    </>
  )
}

Home.Layout = Layout
