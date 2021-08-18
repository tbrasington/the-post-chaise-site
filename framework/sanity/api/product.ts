import { groq } from "next-sanity"

export const getProducts = groq`*[_type == "shopifyProduct" && archived == false && sourceData.availableForSale == true]{
  _id,
  _handle,
  maxVariantPrice,
  minVariantPrice,
  shopifyId, 
  title,
  "thumbnail" : gallery[0]{...,"palette": Image.asset->metadata.palette}
}`

export const getProduct = groq`*[_type == "shopifyProduct" &&  handle == $slug && archived == false && sourceData.availableForSale == true]{
  ...,
   paperMaterials[]->,
  gallery[] {
     ..., 
     "palette": Image.asset->metadata.palette,
    
  }
  }[0]`

export const getProductRecomendations = groq`*[_type == "shopifyProduct" && handle != $slug  &&  archived == false && sourceData.availableForSale == true][0..1]{
 
  _id,
  _handle,
  maxVariantPrice,
  minVariantPrice,
  shopifyId, 
  title,
  "thumbnail" : gallery[0]{...,"palette": Image.asset->metadata.palette}
}`
