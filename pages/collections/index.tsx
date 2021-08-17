/** @jsxImportSource theme-ui */

import type { GetStaticPropsContext, InferGetStaticPropsType } from "next"

import { Container, Text } from "@components/ui"
import { Layout } from "@components/common"
import { getClient } from "@sanity/sanity.server"
import { getNavigation } from "@sanity/api/meta"
export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const sanityPages = await getClient(preview || false).fetch(getNavigation)

  return {
    props: {
      pages: sanityPages
    },
    revalidate: 60
  }
}

export default function Collections({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  return (
    <>
      <Container sx={{ py: 64 }}>
        <Text variant="page_title">Collections</Text>
        <Text variant="statement">Selected works for sale.</Text>
      </Container>
    </>
  )
}

Collections.Layout = Layout
