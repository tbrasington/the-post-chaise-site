/** @jsxImportSource theme-ui */

import { ColorTokens, TextStyleNames } from "@theme/tokens"
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next"

import { Container, Text } from "@components/ui"
import { Layout } from "@components/common"
import { getClient } from "@sanity/sanity.server"
import { getNavigation } from "@sanity/api/meta"
import { getGuideIndexList } from "@sanity/api/guide"
import { Grid } from "theme-ui"
import { GuideIndexList } from "@sanity/types/guides"
import { GuideCard } from "@components/content"
export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const sanityPages = await getClient(preview || false).fetch(getNavigation)
  const guides = await getClient(preview || false).fetch(getGuideIndexList)

  return {
    props: {
      pages: sanityPages,
      guides: guides
    },
    revalidate: 60
  }
}

export default function Guides({
  guides
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Container sx={{ py: 64 }}>
        <Text variant="page_title">Stories and guides</Text>
        <Text variant="statement">
          Photostories, notes on journeys and explorations.
        </Text>
        <Grid sx={{ mt: 32 }} columns={[1, null, 2, 2, 3]}>
          {guides.map((item: GuideIndexList) => {
            return <GuideCard key={item._id} item={item} />
          })}
        </Grid>
      </Container>
    </>
  )
}

Guides.Layout = Layout
