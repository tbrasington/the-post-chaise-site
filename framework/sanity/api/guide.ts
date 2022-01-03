import { groq } from "next-sanity"

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
	},
   "related" : { "nearby" : *[_type == "guide" && country->title in [^.country->title] && slug.current != $slug] | order(date_of_guide desc)  {
  _id,
 	"title": title,
  "slug": slug.current,
  "country" :  country->title,
  date_of_guide,
                 hero_image,
                  "palette": hero_image.asset->metadata.palette,
  
}[0...3],
"time" : *[_type == "guide" && slug.current != $slug] | order(date_of_guide desc)  {
  _id,
 	"title": title,
  "slug": slug.current,
  "country" :  country->title,
  date_of_guide,
    hero_image,
     "palette": hero_image.asset->metadata.palette,
  
}[0...3]
}

}[0]`

export const getGuideList = groq`*[_type == "guide"]| order(_createdAt desc)  {
  _id,
 	"title": title,
  "slug": slug.current,
}`

export const getGuideIndexList = groq`*[_type == "guide"]| order(date_of_guide desc)  {
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

export const getGuideRSSList = groq`*[_type == "guide"]| order(date_of_guide desc)  {
  _id,
 	"title": title,
  "slug": slug.current,
  "country" :  country->title,
  date_of_guide,
  location,
  seo_description, 
  hero_image,
  page_content,
  short_description
}`

export const getSelectionOfAssets = groq`*[_type in [ "sanity.imageAsset"] | order(_createdAt desc)][0...5] {
  _id,
  _createdAt,
  assetId,
  "guide" : *[_type == "guide" && references(^._id)]{
title,
"slug": slug.current,
  location,
  'country' : country->title
}[0]
}`

/*


get assets all form sanity into one array
we will use this to make a seamless gallery
*[_type=="guide" &&  slug.current == $slug]{
  _id,
  title,
  "sluggy" :slug.current,
"images":  *[_type in ['sanity.imageAsset']] {
  _id,
  alt,
  'refs': count( *[_type == "guide" && references(^._id) &&  slug.current == $slug ])

} | [refs > 0]

}[0]
*/
