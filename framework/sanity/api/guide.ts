import { groq } from 'next-sanity'

export const getGuides = groq`*[_type == "guide"] {
  ...,
     "slug": slug.current,
  page_content[]{
  	..., 
    gallery[] {
      ...,
     "palette": mediaAsset.Image.asset->metadata.palette,

    },
		"palette": Image.asset->metadata.palette,
	}
}`

export const getGuide = groq`*[_type == "guide" &&  slug.current == $slug]{
 ...,
  "slug": slug.current,
  page_content[]{
  	...,      
    "country" :  country->title,
    "slug": slug.current,
    gallery[] {
      ...,
     "palette": mediaAsset.Image.asset->metadata.palette,

    },
		"palette": Image.asset->metadata.palette,
	}
}[0]`

export const getGuideList = groq`*[_type == "guide"]| order(_createdAt desc)  {
  _id,
 	"title": title,
  "slug": slug.current,
}`

export const getGuideIndexList  = groq`*[_type == "guide"]| order(date_of_guide desc)  {
  _id,
 	"title": title,
  "slug": slug.current,
  "country" :  country->title,
  date_of_guide,
  location,
  seo_description, 
  hero_image,
   "palette": hero_image.asset->metadata.palette,
}`
