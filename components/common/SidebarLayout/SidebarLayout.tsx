/** @jsxImportSource theme-ui */
import { Box, Flex } from "theme-ui"
import { ChevronLeft, Cross } from "@components/icons"
import React, { FC } from "react"

import { TextStyleNames } from "@theme/tokens"
import { TextStyleVariants } from "@theme/textStyles"
import { UserNav } from "@components/common"

type ComponentProps = { className?: string } & (
  | { handleClose: () => any; handleBack?: never }
  | { handleBack: () => any; handleClose?: never }
)

const SidebarLayout: FC<ComponentProps> = ({
  children,
  handleClose,
  handleBack
}) => {
  return (
    <Box sx={{ height: "100%" }}>
      <header
        sx={{
          py: 32,
          display: "flex"
        }}
      >
        {handleClose && (
          <button
            onClick={handleClose}
            aria-label="Close"
            className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none"
            sx={{
              bg: "transparent",
              m: 0,
              p: 0,
              border: "none",
              display: "inline-flex",
              alignItems: "center",
              mr: "auto"
            }}
          >
            <Cross />
            <span
              sx={{ ml: 12, variant: `text.${TextStyleNames.label_standard}` }}
            >
              Close
            </span>
          </button>
        )}
        {handleBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none"
          >
            <ChevronLeft className="h-6 w-6 hover:text-accent-3" />
            <span className="ml-2 text-accent-7 text-xs">Back</span>
          </button>
        )}
        <span>
          <UserNav />
        </span>
      </header>
      <Flex
        sx={{
          height: "100%",
          flexDirection: "column"
        }}
      >
        {children}
      </Flex>
    </Box>
  )
}

export default SidebarLayout
