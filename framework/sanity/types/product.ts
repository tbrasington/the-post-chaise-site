import { SanityAsset } from "./image"

export interface SanityProduct {
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
  archived: boolean
  collections?: CollectionsEntity[] | null
  handle: string
  maxVariantPrice: number
  minVariantPrice: number
  options?: OptionsEntity[] | null
  shopifyId: string
  sourceData: SourceData
  title: string
  variants?: VariantsEntity[] | null
  materials?: string
  gallery?: SanityAsset[]
}
export interface CollectionsEntity {
  _key: string
  _ref: string
  _type: string
}
export interface OptionsEntity {
  _key: string
  _type: string
  name: string
  shopifyOptionId: string
  values?: ValuesEntity[] | null
}
export interface ValuesEntity {
  _key: string
  _type: string
  value: string
}
export interface SourceData {
  __typename: string
  _type: string
  availableForSale: boolean
  collections: Collections
  compareAtPriceRange: NodeOrCompareAtPriceRangeOrPriceRange
  createdAt: string
  description: string
  descriptionHtml: string
  handle: string
  id: string
  images: Images
  media: Media
  options?: OptionsEntity1[] | null
  presentmentPriceRanges: PresentmentPriceRanges
  priceRange: NodeOrCompareAtPriceRangeOrPriceRange
  productType: string
  publishedAt: string
  shopName: string
  tags?: string[] | null
  title: string
  updatedAt: string
  variants: Variants
  vendor: string
}
export interface Collections {
  edges?: EdgesEntity[] | null
  pageInfo: PageInfo
}
export interface EdgesEntity {
  _key: string
  _type: string
  cursor: string
  node: Node
}
export interface Node {
  handle: string
  id: string
}
export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
}
export interface NodeOrCompareAtPriceRangeOrPriceRange {
  maxVariantPrice: MaxVariantPriceOrMinVariantPriceOrPriceOrPriceV2OrCompareAtPriceV2
  minVariantPrice: MaxVariantPriceOrMinVariantPriceOrPriceOrPriceV2OrCompareAtPriceV2
}
export interface MaxVariantPriceOrMinVariantPriceOrPriceOrPriceV2OrCompareAtPriceV2 {
  amount: string
  currencyCode: string
}
export interface Images {
  edges?: EdgesEntity1[] | null
}
export interface EdgesEntity1 {
  _key: string
  _type: string
  cursor: string
  node: Node1
}
export interface Node1 {
  __typename: string
  altText?: string | null
  id: string
  originalSrc: string
  w100: string
  w1200: string
  w1600: string
  w300: string
  w800: string
}
export interface Media {
  edges?: EdgesEntity2[] | null
}
export interface EdgesEntity2 {
  _key: string
  _type: string
  cursor: string
  node: Node2
}
export interface Node2 {
  image: NodeOrImage
}
export interface NodeOrImage {
  __typename: string
  altText: string
  id: string
  originalSrc: string
  w100: string
  w1200: string
  w1600: string
  w300: string
  w800: string
}
export interface OptionsEntity1 {
  _key: string
  name: string
  values?: string[] | null
}
export interface PresentmentPriceRanges {
  edges?: EdgesEntity3[] | null
}
export interface EdgesEntity3 {
  cursor: string
  node: NodeOrCompareAtPriceRangeOrPriceRange
}
export interface Variants {
  edges?: EdgesEntity4[] | null
  pageInfo: PageInfo
}
export interface EdgesEntity4 {
  _key: string
  _type: string
  cursor: string
  node: Node3
}
export interface Node3 {
  availableForSale: boolean
  compareAtPriceV2?: null
  currentlyNotInStock: boolean
  id: string
  image: NodeOrImage
  presentmentPrices: PresentmentPrices
  priceV2: MaxVariantPriceOrMinVariantPriceOrPriceOrPriceV2OrCompareAtPriceV2
  requiresShipping: boolean
  selectedOptions?: SelectedOptionsEntity[] | null
  sku: string
  title: string
  weight: number
  weightUnit: string
}
export interface PresentmentPrices {
  edges?: EdgesEntity5[] | null
}
export interface EdgesEntity5 {
  cursor: string
  node: Node4
}
export interface Node4 {
  compareAtPrice?: null
  price: MaxVariantPriceOrMinVariantPriceOrPriceOrPriceV2OrCompareAtPriceV2
}
export interface SelectedOptionsEntity {
  name: string
  value: string
}
export interface VariantsEntity {
  _key: string
  _type: string
  id: string
  shopifyVariantID: string
  sourceData: SourceData1
  title: string
}
export interface SourceData1 {
  __cursor: string
  _type: string
  availableForSale: boolean
  compareAtPriceV2: MaxVariantPriceOrMinVariantPriceOrPriceOrPriceV2OrCompareAtPriceV2
  currentlyNotInStock: boolean
  id: string
  image: NodeOrImage
  presentmentPrices: PresentmentPrices
  priceV2: MaxVariantPriceOrMinVariantPriceOrPriceOrPriceV2OrCompareAtPriceV2
  requiresShipping: boolean
  selectedOptions?: SelectedOptionsEntity1[] | null
  sku: string
  title: string
  weight: number
  weightUnit: string
}
export interface SelectedOptionsEntity1 {
  _key: string
  _type: string
  name: string
  value: string
}
