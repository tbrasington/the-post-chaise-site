/** @jsxImportSource theme-ui */
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { Container } from '@components/ui'
import { Layout } from '@components/common'
import { getClient } from '@sanity/sanity.server'
import { getNavigation } from '@sanity/api/meta'
import { Text } from '@components/ui'
import { GuideIndexList } from '@sanity/types/guides'
import { GuideCard } from '@components/content'
import { Grid } from '@theme-ui/components'
import { getGuideIndexList } from '@sanity/api/guide'
import { motion } from 'framer-motion'
export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const sanityMetaData = await getClient(preview || false).fetch(getNavigation)
  const guides = await getClient(preview || false).fetch(getGuideIndexList)

  return {
    props: {
      pages: sanityMetaData,
      guides: guides,
    },
    revalidate: 60,
  }
}

export default function Home({
  pages,
  guides,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const MotionGrid = motion(Grid)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const motionItem = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1 },
    exit: { y: 30, opacity: 0 },
  }

  return (
    <>
      <Container
        el="section"
        sx={{
          ml: [80, 80, 96],
          mb: [48, null, 96],
        }}
      >
        <Text
          variant="paragraph"
          sx={{
            maxWidth: '38ch',
          }}
        >
          {pages.site_description}
        </Text>
      </Container>
      <Container
        el="section"
        sx={{
          ml: [0, 80, 96],
        }}
      >
        <Text variant="sub_heading">Places</Text>
        <MotionGrid
          sx={{
            p: 0,
            m: 0,
            mt: 12,
          }}
          columns={[1, 3, 4]}
          gap={12}
          variants={container}
          initial="hidden"
          animate="show"
          as="ol"
          transition={{
            duration: 0,
          }}
        >
          {guides.map((item: GuideIndexList) => {
            return (
              <motion.li
                variants={motionItem}
                sx={{ listStyle: 'none', m: 0, p: 0 }}
                transition={{ type: 'spring', damping: 30, stiffness: 100 }}
              >
                <GuideCard key={item._id} item={item} showDescription={false} />
              </motion.li>
            )
          })}
        </MotionGrid>
      </Container>
    </>
  )
}

Home.Layout = Layout
