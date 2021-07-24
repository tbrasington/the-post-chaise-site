import { Container } from '@components/ui'
import { FC } from 'react'
import { I18nWidget } from '@components/common'
import Link from 'next/link'
import type { Page } from '@commerce/types/page'
import cn from 'classnames'
import getSlug from '@lib/get-slug'
import s from './Footer.module.css'
import { useRouter } from 'next/router'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'Home',
    url: '/',
  },
]

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages } = usePages(pages)

  return (
    <footer>
      <Container>
        <Link href="/">
          <a>
            <span>&copy; The Post Chaise</span>
          </a>
        </Link>

        {[...links, ...sitePages].map((page) => (
          <span key={page.url} >
            <Link href={page.url!}>
              <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
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
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
