import { groq } from "next-sanity"

export const getGuides = groq`*[_type == "guide"] {
  ...,
     "slug": slug.current,
  page_content[]{
  	..., 
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
  "slug": slug.current,
  page_content[]{
  	...,      
    shopifyProduct->, 
    "slug": slug.current,
    gallery[] {
      ...,
     "palette": mediaAsset.Image.asset->metadata.palette,
      shopifyProduct->
    },
		"palette": Image.asset->metadata.palette,
	}
}[0]`

export const getGuideList = groq`*[_type == "guide"]| order(_createdAt desc)  {
 	"title": title,
  "slug": slug.current,
}`
