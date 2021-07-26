import { groq } from "next-sanity"

export const getProducts = groq`*[_type == "shopifyProduct" && archived == false && sourceData.availableForSale == true]{
  gallery[] {
    ...,
    "asset" : Image.asset->
  },
  ...
}`

export const getProduct = groq`*[_type == "shopifyProduct" &&  handle == $slug && archived == false && sourceData.availableForSale == true]{
  gallery[] {
    ...,
    "asset" : Image.asset->
  },
  ...
  }[0]`
