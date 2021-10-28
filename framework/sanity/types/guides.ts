import { Asset, Image, Palette, SanityAsset } from './image'

import { SanityBlock } from './shared'
import { SanityProduct } from './product'

export interface SanityGuide {
  _createdAt: Date
  _id: string
  _rev: string
  _type: string
  _updatedAt: Date
  page_content: PageContent[]
  short_description: SanityBlock[]
  seo_description?: string
  hero_image?: Asset
  slug: Slug
  title: string
  date_of_guide: string
  country: string
  location:string
}

export interface Slug {
  _type: string
  current: string
}

export interface PageContent {
  _key: string
  _type: 'paragraph' | 'gallery' | 'Media' | string
  body?: SanityBlock[]
  gallery?: PageContentGallery[]
  Image?: Image
  alt_text?: string
  caption?: string
  palette?: Palette
  fullbleed?: boolean
  shopifyProduct?: SanityProduct
}

export interface PageContentGallery {
  _key: string
  _type: string
  mediaAsset: SanityAsset
  palette: Palette
}

export interface GuideIndexList {
  _id: string
  title: string
  slug: string
  seo_description: string
  hero_image: Image
  palette: Palette
  date_of_guide: string
}
