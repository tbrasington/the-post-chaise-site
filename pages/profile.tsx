import { Container, Text } from "@components/ui"

import type { GetStaticPropsContext } from "next"
import { Layout } from "@components/common"
import commerce from "@lib/api/commerce"
import useCustomer from "@framework/customer/use-customer"

export async function getStaticProps({
  preview,
  locale,
  locales
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories }
  }
}

export default function Profile() {
  const { data } = useCustomer()
  return (
    <Container>
      <Text variant="page_title">My Profile</Text>
      {data && (
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 pr-4">
            <div>
              <Text variant="sub_heading">Full Name</Text>
              <span>
                {data.firstName} {data.lastName}
              </span>
            </div>
            <div className="mt-5">
              <Text variant="label_upper">Email</Text>
              <span>{data.email}</span>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

Profile.Layout = Layout
