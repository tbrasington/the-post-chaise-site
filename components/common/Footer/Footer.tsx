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
    name: "RSS",
    url: "/rss.xml"
  },
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
      <Container
        sx={{
          display: "flex",
          flexDirection: ["column", null, "row"],
          "& a:hover": {
            textDecoration: "underline"
          }
        }}
      >
        <Link href="/" passHref>
          <a
            sx={{
              color: ColorTokens.text,
              mr: 64,
              textDecoration: "none",
              variant: `text.${TextStyleNames.label_upper}`
            }}
          >
            The Post Chaise &copy; {new Date().getFullYear()}
          </a>
        </Link>

        {[...links].map(page => (
          <Link href={page.url!} passHref key={page.url}>
            <a
              sx={{
                mt: [16, 16, 0],
                mr: 32,
                color: `${ColorTokens.primary}`,
                textDecoration: "none",
                variant: `text.${TextStyleNames.label_upper}`
              }}
            >
              {page.name}
            </a>
          </Link>
        ))}
      </Container>
    </footer>
  )
}

export default Footer
