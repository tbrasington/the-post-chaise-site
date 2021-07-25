/** @jsxImportSource theme-ui */

import { ArrowLeft, ArrowRight } from "@components/icons"

import { Button } from "@components/ui"
import { ButtonVariants } from "@theme/buttons"
import { Flex } from "theme-ui"
import React from "react"

interface ProductSliderControl {
  onPrev: React.MouseEventHandler<HTMLButtonElement>
  onNext: React.MouseEventHandler<HTMLButtonElement>
}

const ProductSliderControl: React.FC<ProductSliderControl> = React.memo(
  function Slider({ onPrev, onNext }) {
    return (
      <Flex
        sx={{
          alignSelf: "flex-end"
        }}
      >
        <Button
          onClick={onPrev}
          aria-label="Previous Product Image"
          variant="controls"
          width={40}
        >
          <ArrowLeft />
        </Button>
        <Button
          onClick={onNext}
          aria-label="Next Product Image"
          variant="controls"
          width={40}
        >
          <ArrowRight />
        </Button>
      </Flex>
    )
  }
)
export default ProductSliderControl
