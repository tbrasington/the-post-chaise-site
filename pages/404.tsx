import type { GetStaticPropsContext } from "next"
import { Layout, Zoom } from "@components/common"
import { Container, Text } from "@components/ui"
import { getNavigation } from "@sanityLib/api/meta"
import { getClient } from "@sanityLib/sanity.server"

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
    revalidate: 200
  }
}

export default function NotFound() {
  return (
    <Container spacing={12} marginBottom={128}>
      <Text variant="page_title">Not Found</Text>
      <Text variant="statement">
        {`The requested page doesn't exist or you don't have access to it.`}
      </Text>
      <Zoom />
    </Container>
  )
}

NotFound.Layout = Layout
