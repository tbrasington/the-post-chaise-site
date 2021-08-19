/** @jsxImportSource theme-ui */

import type { GetStaticPropsContext, InferGetStaticPropsType } from "next"

import { Container } from "@components/ui"
import { Layout, PageHeader } from "@components/common"
import { getClient } from "@sanity/sanity.server"
import { getNavigation } from "@sanity/api/meta"
import { getGuideIndexList } from "@sanity/api/guide"
import { Grid } from "theme-ui"
import { GuideIndexList } from "@sanity/types/guides"
import { GuideCard } from "@components/content"
import { NextSeo } from "next-seo"
import { ColorTokens } from "@theme/tokens"
import { shade } from "@theme-ui/color"

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
  const pageTitle = "Stories and guides"
  const pageDescription = "Photostories, notes on journeys and explorations."
  const bg = shade(ColorTokens.primary, 0.5)

  return (
    <>
      <NextSeo title={pageTitle} description={pageDescription} />

      <Container clean>
        <PageHeader
          title={pageTitle}
          description={pageDescription}
          bgOverride={bg}
        />
        <Container>
          <Grid sx={{ mt: 32 }} columns={[1, null, 2, 2, 3]}>
            {guides.map((item: GuideIndexList) => {
              return <GuideCard key={item._id} item={item} />
            })}
          </Grid>
        </Container>
      </Container>
    </>
  )
}

Guides.Layout = Layout
