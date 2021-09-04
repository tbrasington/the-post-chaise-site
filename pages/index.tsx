/** @jsxImportSource theme-ui */
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next"

import { Container } from "@components/ui"
import { Layout } from "@components/common"
import { getClient } from "@sanity/sanity.server"
import { getNavigation } from "@sanity/api/meta"

export async function getStaticProps({
  preview,
  locale,
  locales
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const sanityPages = await getClient(preview || false).fetch(getNavigation)

  return {
    props: {
      pages: sanityPages
    },
    revalidate: 60
  }
}

export default function Home({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  return (
    <>
      <Container sx={{ py: 64 }}></Container>
    </>
  )
}

Home.Layout = Layout
