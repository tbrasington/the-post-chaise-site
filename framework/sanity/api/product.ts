import { groq } from "next-sanity"

export const getProducts = groq`*[_type == "shopifyProduct"]`
