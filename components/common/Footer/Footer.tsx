/** @jsxImportSource theme-ui */
import { ColorTokens, TextStyleNames } from "@theme/tokens"

import { Container } from "@components/ui"
import { FC } from "react"
import Link from "next/link"
import type { Page } from "@commerce/types/page"
import getSlug from "@lib/get-slug"
import { useRouter } from "next/router"

interface Props {
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: "Instagram",
    url: "https://instagram.com/thepostchaise"
  }
]

const Footer: FC<Props> = ({ pages }) => {
  const { sitePages } = usePages(pages)

  return (
    <footer
      sx={{
        py: 64,
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: ColorTokens.muted
      }}
    >
      <Container>
        <Link href="/" passHref>
          <a
            sx={{
              color: ColorTokens.text,
              mr: 64,
              textDecoration: "none",
              variant: `text.${TextStyleNames.label_upper}`
            }}
          >
            <span>&copy; The Post Chaise</span>
          </a>
        </Link>

        {[...links, ...sitePages].map(page => (
          <span
            key={page.url}
            sx={{
              mr: 32
            }}
          >
            <Link href={page.url!} passHref>
              <a
                sx={{
                  color: `${ColorTokens.primary}`,
                  textDecoration: "none",
                  variant: `text.${TextStyleNames.label_upper}`
                }}
              >
                {page.name}
              </a>
            </Link>
          </span>
        ))}
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach(page => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder)
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
