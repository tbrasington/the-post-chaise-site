/**  @jsxImportSource theme-ui */

import React, { FC, useEffect, useRef } from "react"
import { useUI, Logo, Button } from "@components/ui"
import { Box, Flex } from "@theme-ui/components"
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll
} from "body-scroll-lock"
import { alpha } from "@theme-ui/color"
import { ColorTokens, TextStyleNames } from "@theme/tokens"
import { SanityPages } from "@sanityLib/types/meta"
import Link from "next/link"
import { ButtonNames } from "@theme/buttons"
import { Grid } from "theme-ui"
import { motion } from "framer-motion"

type Props = {
  links: SanityPages
}
const NavigationMenu: FC<Props> = ({ links }) => {
  const { closeMenu } = useUI()
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
          onClick={closeMenu}
        />
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          initial={{
            opacity: 0,
            y: 100
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            stiffness: 300,
            damping: 20,
            type: "spring"
          }}
        >
          <Flex
            as="section"
            sx={{
              position: "absolute",
              width: ["100%", null, "60%"],
              minHeight: ["100%", null, "20%"],
              pt: 24,
              pb: 64,
              maxWidth: "40rem",
              bg: ColorTokens.background,
              overflowY: "auto"
            }}
          >
            <Box sx={{ position: "absolute", right: 24, top: 40 }}>
              <Button
                variant="mini"
                sx={{ bg: "red" }}
                onClick={() => closeMenu()}
              >
                Close
              </Button>
            </Box>

            <Flex
              key="menu-overlay"
              ref={ref}
              sx={{
                alignItems: "flex-start",
                justifyContent: "center",
                width: "100%",
                flexDirection: "column",
                px: 32
              }}
            >
              <Box
                sx={{
                  textAlign: "left",
                  color: ColorTokens.darken,
                  variant: `text.${TextStyleNames.sub_heading}`,
                  mt: 24,
                  pt: 8,
                  mb: [72, null, 48]
                }}
              >
                Where do you want to go?
              </Box>
              <Grid
                gap={56}
                columns={1}
                sx={{
                  width: "100%"
                }}
              >
                <Flex sx={{ flexDirection: "column", "& > a + a": { mt: 16 } }}>
                  <Link href={`/`} passHref>
                    <a
                      onClick={closeMenu}
                      sx={{
                        variant: `buttons.${ButtonNames.underlineHighlight}`
                      }}
                    >
                      Home
                    </a>
                  </Link>
                </Flex>

                <NavColumn label="Stories & Guides">
                  {links.guides.map(item => (
                    <Link
                      href={`/stories-and-guides/${item.slug}`}
                      key={`guides-${item._key}`}
                      passHref
                    >
                      <a
                        onClick={closeMenu}
                        sx={{ variant: `buttons.${ButtonNames.underline}` }}
                      >
                        {item.title}
                      </a>
                    </Link>
                  ))}
                  <Link href={`/`} passHref>
                    <a
                      onClick={closeMenu}
                      sx={{
                        variant: `buttons.${ButtonNames.underlineHighlight}`
                      }}
                    >
                      View all
                    </a>
                  </Link>
                </NavColumn>
                <NavColumn label="About">
                  {links.menu_pages.map(item => (
                    <Link
                      href={`/information/${item.slug}`}
                      key={`info-${item._key}`}
                      passHref
                    >
                      <a
                        onClick={closeMenu}
                        sx={{ variant: `buttons.${ButtonNames.underline}` }}
                      >
                        {item.title}
                      </a>
                    </Link>
                  ))}
                </NavColumn>
              </Grid>
            </Flex>
          </Flex>
        </motion.div>
      </Box>
    </Box>
  )
}

const NavColumn: FC<{ label: string }> = ({ label, children }) => {
  return (
    <Flex sx={{ flexDirection: "column", "& > a + a": { mt: 16 } }}>
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
