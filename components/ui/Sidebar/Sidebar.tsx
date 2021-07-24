import { Box, Flex } from "theme-ui"
import { FC, useEffect, useRef } from "react"
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll
} from "body-scroll-lock"

import { ColorTokens } from "@theme/tokens"
import { alpha } from "@theme-ui/color"

interface SidebarProps {
  children: any
  onClose: () => void
}

const Sidebar: FC<SidebarProps> = ({ children, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    if (ref.current) {
      disableBodyScroll(ref.current, { reserveScrollBarGap: true })
    }
    return () => {
      if (ref && ref.current) {
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
          height: "100%"
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
          onClick={onClose}
        />
        <Flex
          as="section"
          className="absolute inset-y-0 right-0 max-w-full flex outline-none pl-10"
          sx={{
            position: "absolute",
            right: 0,
            height: "100%",
            bg: ColorTokens.background,
            px: 32
          }}
        >
          <div className="h-full w-full md:w-screen md:max-w-md">
            <div ref={ref}>{children}</div>
          </div>
        </Flex>
      </Box>
    </Box>
  )
}

export default Sidebar
