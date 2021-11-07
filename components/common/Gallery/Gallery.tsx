/** @jsxImportSource theme-ui */
import { AnimatePresence, motion } from "framer-motion"
import { Box, Flex } from "theme-ui"
import { ColorTokens, StandardXPadding } from "@theme/tokens"
import React, { Children, Fragment, useRef, useState } from "react"

import { Palette } from "@sanityLib/types/image"
import SliderControl from "./Controls"
import { alpha } from "@theme-ui/color"
import { wrap } from "@popmotion/popcorn"

interface GallerySliderProps {
  children: React.ReactNode[]
  className?: string
  slideColorData?: Palette[]
}

const variants = {
  enter: (props: { direction: number; width: number }) => {
    return {
      x: props.direction > 0 ? props.width : -props.width,
      opacity: 0,
      zIndex: 1
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (props: { direction: number; width: number }) => {
    return {
      zIndex: 0,
      x: props.direction < 0 ? 1000 : -props.width,
      opacity: 0
    }
  }
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

const GallerySlider: React.FC<GallerySliderProps> = ({
  children,
  slideColorData
}) => {
  const slideTotal = Children.count(children)
  // gallery slide movements
  const [[page, direction], setPage] = useState([0, 0])
  const imageIndex = wrap(0, slideTotal, page)

  const [slideBg, setSlideBG] = useState(
    slideColorData && slideColorData.length === slideTotal
      ? slideColorData[imageIndex].muted.background
      : ColorTokens.muted
  )

  const GallerySlides = Children.toArray(children).map((child, key) => {
    return <Fragment key={`gallery-slide-${key}`}>{child}</Fragment>
  })

  // gallery state actions
  const galleryRef = useRef<HTMLDivElement>(null)

  const containerWidth = galleryRef.current
    ? galleryRef.current.getBoundingClientRect().width
    : "100%"

  const Slide: React.FC = () => {
    if (GallerySlides[imageIndex]) {
      return GallerySlides[imageIndex]
    } else {
      // Must return null. Returning undefined crashes React
      return null
    }
  }

  function paginate(newDirection: number) {
    setPage([page + newDirection, newDirection])
    slideColorData &&
      slideColorData.length === slideTotal &&
      setSlideBG(slideColorData[imageIndex].muted.background)
  }

  const onPrev = () => paginate(-1)
  const onNext = () => paginate(1)

  return (
    <Flex
      ref={galleryRef}
      sx={{
        width: "100%",
        height: "100%",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        px: StandardXPadding,
        py: [24, null, null, 64],
        flexDirection: "column",
        bg: alpha(slideBg, 0.3),
        transition: "background-color 0.2s ease"
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          mb: 24
        }}
      >
        <AnimatePresence
          initial={false}
          custom={{ direction, width: containerWidth }}
        >
          <motion.div
            custom={{ direction, width: containerWidth }}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              display: "flex"
            }}
            key={page}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
          >
            <Slide />
          </motion.div>
        </AnimatePresence>
      </Box>

      <SliderControl onPrev={onPrev} onNext={onNext} />
    </Flex>
  )
}

export default GallerySlider
