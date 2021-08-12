import { groq } from "next-sanity"

export const getNavigation = groq`*[_type == "site_metadata"] {
footer_internal[]{
    _key,
  	"title" : title,
  	"slug" : page->slug.current
	},
	menu_pages[]{
    _key,
  	"title" : title,
  	"slug" : page->slug.current
	},
 "guides": *[_type == "guide"][] {
   "_key":_id,
   "title" : title,
   "slug" : slug.current
 },
 "collections": *[_type == "shopifyCollection"][] {
  	"_key" : _id,
   "title" : title,
   "slug" : slug.current
 }
}[0]`
