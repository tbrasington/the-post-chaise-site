import { groq } from "next-sanity"

export const getPageList = groq`*[_type == "page"]| order(_createdAt desc)  {
  _id,
 	"title": title,
  "slug": slug.current,
}`

export const getPage = groq`*[_type == "page" &&  slug.current == $slug]{

  _id, 
  title, 
  body,
  "slug": slug.current,

}[0]`
