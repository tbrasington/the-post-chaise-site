export interface SanityPage {
  slug: string
  title: string
  _key: string
}

export interface SanityPages {
  footer_internal: SanityPage[]
  menu_pages: SanityPage[]
  guides: SanityPage[]
  collections: SanityPage[]
}
