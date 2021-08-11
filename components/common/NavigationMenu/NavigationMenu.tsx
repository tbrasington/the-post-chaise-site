/**  @jsxImportSource theme-ui */

import React, { FC, useEffect, useRef } from "react"
import type { LineItem } from "@commerce/types/cart"
import useCart from "@framework/cart/use-cart"
import { useUI, Logo } from "@components/ui"
import { Box, Flex } from "@theme-ui/components"
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll
} from "body-scroll-lock"
import { alpha } from "@theme-ui/color"
import { ColorTokens, TextStyleNames } from "@theme/tokens"
import { SanityPages } from "@sanity/types/meta"
import Link from "next/link"
import { ButtonNames } from "@theme/buttons"
import { Grid } from "theme-ui"

const countItem = (count: number, item: LineItem) => count + item.quantity

type Props = {
  links: SanityPages
}
const NavigationMenu: FC<Props> = ({ links }) => {
  const { data } = useCart()
  const { toggleMenu } = useUI()
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    if (ref.current) {
      disableBodyScroll(ref.current, { reserveScrollBarGap: true })
    }
    return () => {
      if (ref && ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        enableBodyScroll(ref.current)
      }
      clearAllBodyScrollLocks()
    }
  }, [])
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        zIndex: 50
      }}
    >
      <Box
        sx={{
          position: "absolute",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bg: alpha(ColorTokens.darken, 0.9),
            width: "100%",
            height: "100%",
            backdropFilter: "blur(0.8px)"
          }}
          onClick={toggleMenu}
        />
        <Flex
          as="section"
          sx={{
            position: "absolute",
            width: "60%",
            height: "60%",
            bg: ColorTokens.background,
            overflowY: "auto"
          }}
        >
          <Flex
            ref={ref}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              flexDirection: "column"
            }}
          >
            <Logo
              sx={{
                width: [64, 64, 128],
                height: [64, 64, 128]
              }}
            />
            <Box
              sx={{
                textAlign: "center",
                color: ColorTokens.darken,
                variant: `text.${TextStyleNames.sub_heading}`,
                mt: 24,
                mb: 48
              }}
            >
              Where do you want to go?
            </Box>
            <Grid gap={72} columns={3}>
              <NavColumn label="Collections">
                {links.collections.map(item => (
                  <Link
                    href={`/collections/${item.slug}`}
                    key={item._key}
                    passHref
                  >
                    <a sx={{ variant: `buttons.${ButtonNames.underline}` }}>
                      {item.title}
                    </a>
                  </Link>
                ))}
                <Link href={`/collections`} passHref>
                  <a sx={{ variant: `buttons.${ButtonNames.underline}` }}>
                    View all
                  </a>
                </Link>
              </NavColumn>

              <NavColumn label="Stories & Guides">
                {links.guides.map(item => (
                  <Link href={`/guide/${item.slug}`} key={item._key} passHref>
                    <a sx={{ variant: `buttons.${ButtonNames.underline}` }}>
                      {item.title}
                    </a>
                  </Link>
                ))}
                <Link href={`/guides`} passHref>
                  <a sx={{ variant: `buttons.${ButtonNames.underline}` }}>
                    View all
                  </a>
                </Link>
              </NavColumn>

              <NavColumn label="About">
                {links.menu_pages.map(item => (
                  <Link
                    href={`/information/${item.slug}`}
                    key={item._key}
                    passHref
                  >
                    <a sx={{ variant: `buttons.${ButtonNames.underline}` }}>
                      {item.title}
                    </a>
                  </Link>
                ))}
              </NavColumn>
            </Grid>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

const NavColumn: FC<{ label: string }> = ({ label, children }) => {
  return (
    <Flex sx={{ flexDirection: "column", "& > a + a": { mt: 12 } }}>
      <Box
        sx={{
          variant: `text.${TextStyleNames.label_upper}`,
          color: ColorTokens.darken,
          mb: 16
        }}
      >
        {label}
      </Box>
      {children}
    </Flex>
  )
}

export default NavigationMenu
