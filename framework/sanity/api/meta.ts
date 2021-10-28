import { groq } from 'next-sanity'

export const getNavigation = groq`*[_type == "site_metadata"] {

"site_description" : site_description,
footer_internal[]{
    _key,
  	"title" : title,
  	"slug" : page->slug.current,
	},
	menu_pages[]{
    _key,
  	"title" : title,
  	"slug" : page->slug.current
	},
 "guides": *[_type == "guide"][0..5] {
   "_key":_id,
   "title" : title,
   "slug" : slug.current
 }
}[0]`
