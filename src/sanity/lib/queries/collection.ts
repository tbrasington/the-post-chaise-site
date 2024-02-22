import { groq } from "next-sanity"

export const getCollections = groq`*[_type == "shopifyCollection" && archived== false] {
  _id, 
  title, 
  "slug" : slug.current
}`

export const getCollectionsAndProducts = groq`*[_type == "shopifyCollection" && archived== false] {
  _id, 
  title, 
  description,
  "products" : *[_type=='shopifyProduct' && references(^._id)]{ 
  _id,
  shopifyId,
  handle,
  minVariantPrice,
  title,
  "thumbnail" : gallery[0]{...,"palette": Image.asset->metadata.palette,}

},
  "slug" : slug.current,
  shopifyId
}`

export const getCollection = groq`*[_type == "shopifyCollection" && archived== false &&  slug.current == $slug] {
  _id, 
  title, 
  description,
  "products" : *[_type=='shopifyProduct' && references(^._id)]{ 
  _id,
  shopifyId,
  handle,
  minVariantPrice,
  title,
  "thumbnail" : gallery[0]{...,"palette": Image.asset->metadata.palette,}

},
  "slug" : slug.current,
  shopifyId
}[0]`
