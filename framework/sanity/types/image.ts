import { SanityProduct } from "./product"

export interface Dimensions {
  _type: string
  aspectRatio: number
  height: number
  width: number
}

export interface DarkMuted {
  _type: string
  background: string
  foreground: string
  population: number
  title: string
}

export interface DarkVibrant {
  _type: string
  background: string
  foreground: string
  population: number
  title: string
}

export interface Dominant {
  _type: string
  background: string
  foreground: string
  population: number
  title: string
}

export interface LightMuted {
  _type: string
  background: string
  foreground: string
  population: number
  title: string
}

export interface LightVibrant {
  _type: string
  background: string
  foreground: string
  population: number
  title: string
}

export interface Muted {
  _type: string
  background: string
  foreground: string
  population: number
  title: string
}

export interface Vibrant {
  _type: string
  background: string
  foreground: string
  population: number
  title: string
}

export interface Palette {
  _type: string
  darkMuted: DarkMuted
  darkVibrant: DarkVibrant
  dominant: Dominant
  lightMuted: LightMuted
  lightVibrant: LightVibrant
  muted: Muted
  vibrant: Vibrant
}

export interface Metadata {
  _type: string
  dimensions: Dimensions
  hasAlpha: boolean
  isOpaque: boolean
  lqip: string
  palette: Palette
}

export interface SanityAssetExpanded {
  _createdAt: Date
  _id: string
  _rev: string
  _type: string
  _updatedAt: Date
  assetId: string
  extension: string
  metadata: Metadata
  mimeType: string
  originalFilename: string
  path: string
  sha1hash: string
  size: number
  uploadId: string
  url: string
}

export interface SanityAsset {
  Image: Image
  _key: string
  _type: string
  alt_text: string
  caption?: string
  palette: Palette
  fullbleed?: boolean
  shopifyProduct?: SanityProduct
}
export interface Image {
  _type: string
  asset: Asset
  crop: Crop
  hotspot: Hotspot
}
export interface Asset {
  _ref: string
  _type: string
}
export interface Crop {
  _type: string
  bottom: number
  left: number
  right: number
  top: number
}
export interface Hotspot {
  _type: string
  height: number
  width: number
  x: number
  y: number
}
