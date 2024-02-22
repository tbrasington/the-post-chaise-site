import { groq } from "next-sanity";

export const GUIDES_QUERY = groq`*[_type == "guide"] {
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
}`;

export const GUIDE_QUERY = groq`*[_type == "guide" &&  slug.current == $slug]{
 ...,
  "slug": slug.current,
  page_content[]{
  	...,
    "country" :  country->title,
    "slug": slug.current,
    gallery[] {
      ...,

     "palette": mediaAsset.Image.asset->metadata.palette,
     "lqip" : mediaAsset.Image.asset->metadata.lqip
    },
		"palette": Image.asset->metadata.palette,
    "lqip" : Image.asset->metadata.lqip
	},
   "related" : {
      "past" : *[_type == "guide" && slug.current != $slug && _createdAt < ^._createdAt] | order(date_of_guide desc)  {
        _id,
       	"title": title,
        "slug": slug.current,
        "country" :  country->title,
        date_of_guide,
        hero_image,
        "palette": hero_image.asset->metadata.palette,
        "lqip" : hero_image.asset->metadata.lqip

      }[0...3],
      "future" : *[_type == "guide" && slug.current != $slug && _createdAt > ^._createdAt] | order(date_of_guide asc)  {
        _id,
       	"title": title,
        "slug": slug.current,
        "country" :  country->title,
        date_of_guide,
        hero_image,
        "palette": hero_image.asset->metadata.palette,
        "lqip" : hero_image.asset->metadata.lqip

      }[0...3]
}

}[0]`;

export const GUIDE_LIST = groq`*[_type == "guide"] | order(_createdAt desc)  {
  _id,
 	"title": title,
  "slug": slug.current,
}`;

export const GUIDE_INDEX_LIST = groq`*[_type == "guide"] | order(date_of_guide desc)  {
  _id,
 	"title": title,
  "slug": slug.current,
  "country" :  country->title,
  date_of_guide,
  location,
  seo_description,
  hero_image,
  "palette": hero_image.asset->metadata.palette,
  "lqip" : hero_image.asset->metadata.lqip
}`;

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
}`;

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
}`;

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
