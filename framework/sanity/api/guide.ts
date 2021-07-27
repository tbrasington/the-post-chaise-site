import { groq } from "next-sanity"

export const getGuides = groq`*[_type == "guide"] {
  ...,
  page_content[]{
  	...,
    gallery[] {
      ...,
      shopifyProduct->
    }
	}
}`
