import { groq } from "next-sanity"

export const getProducts = groq`*[_type == "shopifyCollection" && archived==false] {
  ...,
  products[]-> {
    ...,
    gallery[] {
      ...,
			"palette": Image.asset->metadata.palette

    }
  }
}`
