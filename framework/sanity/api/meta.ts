import { groq } from "next-sanity"

export const getNavigation = groq`*[_type == "site_metadata"] {

  footer_internal[]{
  	"title" : title,
  	"slug" : page->slug.current
	},
	menu_pages[]{
  	"title" : title,
  	"slug" : page->slug.current
	}
}`


