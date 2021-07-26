import type { GetStaticPropsContext } from "next"
import Search from "@components/search"
import { getSearchStaticProps } from "@lib/search-props"

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSearchStaticProps(context)
}

export default Search
