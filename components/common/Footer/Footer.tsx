/** @jsxImportSource theme-ui */
import { ColorTokens, TextStyleNames } from "@theme/tokens"

import { Container } from "@components/ui"
import { FC } from "react"
import Link from "next/link"

interface Props {
  children?: any
}

const links = [
  {
    name: "Instagram",
    url: "https://instagram.com/tbrasington"
  }
]

const Footer: FC<Props> = ({}) => {
  return (
    <footer
      sx={{
        mt: 64,
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

        {[...links].map(page => (
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

export default Footer
