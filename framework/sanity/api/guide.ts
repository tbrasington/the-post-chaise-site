import { groq } from "next-sanity"

export const getGuides = groq`*[_type == "guide"] {
  ...,
  page_content[]{
  	..., 
    "slug": slug.current,
    gallery[] {
      ...,
     "palette": mediaAsset.Image.asset->metadata.palette,
      shopifyProduct->
    },
		"palette": Image.asset->metadata.palette,
	}
}`

export const getGuide = groq`*[_type == "guide" &&  slug.current == $slug]{
 ...,
  page_content[]{
  	...,
     "slug": slug.current,
    gallery[] {
      ...,
     "palette": mediaAsset.Image.asset->metadata.palette,
      shopifyProduct->
    },
		"palette": Image.asset->metadata.palette,
	}
}[0]`
