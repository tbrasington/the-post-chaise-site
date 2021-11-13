/** @jsxImportSource theme-ui */

import { ArrowLeft, ArrowRight } from "@components/icons"

import { Button } from "@components/ui"
import { Flex } from "theme-ui"
import React from "react"

interface GalleryControlProps {
  onPrev: React.MouseEventHandler<HTMLButtonElement>
  onNext: React.MouseEventHandler<HTMLButtonElement>
  textOverride?: string
  bgOverride?: string
}

const GalleryControl: React.FC<GalleryControlProps> = React.memo(
  function Slider({ onPrev, onNext, textOverride, bgOverride }) {
    return (
      <Flex
        sx={{
          alignSelf: "flex-end",
          "& > button + button": {
            ml: 8
          }
        }}
      >
        <Button
          onClick={onPrev}
          aria-label="Previous Product Image"
          variant="controls"
          width={40}
          bgOverride={bgOverride}
          textOverride={textOverride}
        >
          <ArrowLeft />
        </Button>
        <Button
          onClick={onNext}
          aria-label="Next Product Image"
          variant="controls"
          width={40}
          bgOverride={bgOverride}
          textOverride={textOverride}
        >
          <ArrowRight />
        </Button>
      </Flex>
    )
  }
)
export default GalleryControl
