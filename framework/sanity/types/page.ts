import { SanityBlock } from "./shared"

export interface SanityPage {
  _id: string
  title: string
  slug: string
  seo_description?: string
  body?: SanityBlock[]
}

export interface SanityPageList {
  _id: string
  title: string
  slug: string
}
