/** @jsxImportSource theme-ui */
import { PageContentGallery } from "@sanityLib/types/guides"
import { SanityAsset } from "@sanityLib/types/image"
import { Box } from "@theme-ui/components"
import { ColorTokens } from "@theme/tokens"
import { AnimatePresence, motion } from "framer-motion"
import { FC, useState, useRef } from "react"
import { MediaImage } from "@components/common"
import { wrap } from "popmotion"
import {
  galleryMotionVariants,
  swipeConfidenceThreshold,
  swipePower
} from "../Gallery/Gallery"

import SliderControl from "../Gallery/Controls"

/**
 *
 * Zoom in and out of a component
 * Tap, launch zoom
 * Initial state
 *  Zoom in level 200%
 *  Tap to Zoom out level 100%
 *  Swipe left and right
 *  Tap to zoom in again 200%
 *  Pan to move around
 *  Close button to close
 *
 */

type ZoomProps = {
  initialIndex: number
  slides: PageContentGallery[]
}

export const Zoom: FC<ZoomProps> = ({ slides, initialIndex = 0, children }) => {
  const [zoomLevel, setZoomLevel] = useState<1 | 2>(1)
  const [[x, y], setPosition] = useState([0, 0])
  const [[zoomIndex, direction], setZoomIndex] = useState([initialIndex, 0])
  const imageIndex = wrap(0, slides.length, zoomIndex)
  const slideTotal = slides.length

  const slideColorData = slides[imageIndex]?.palette
  const [slideBg, setSlideBG] = useState(
    slideColorData && slideColorData.muted
      ? slideColorData.muted.background
      : ColorTokens.muted
  )

  // gallery state actions
  const galleryRef = useRef<HTMLDivElement>(null)

  const containerWidth = galleryRef.current
    ? galleryRef.current.getBoundingClientRect().width
    : "100%"

  // functions

  function paginate(newDirection: number) {
    setZoomIndex([zoomIndex + newDirection, newDirection])
    slides && slides[imageIndex].palette
    setSlideBG(slides[imageIndex].palette.muted.background)
  }

  const onPrev = () => paginate(-1)
  const onNext = () => paginate(1)

  const remappedImage: SanityAsset = {
    Image: slides[imageIndex].mediaAsset.Image,
    alt_text: slides[imageIndex].mediaAsset.alt_text,
    palette: slides[imageIndex].palette,
    _key: slides[imageIndex]._key,
    _type: slides[imageIndex]._type
  }

  return (
    <Box
      ref={galleryRef}
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        bg: slideBg,
        p: 32
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          bg: "green"
        }}
      >
        <AnimatePresence
          initial={false}
          custom={{ direction, width: containerWidth }}
        >
          <motion.div
            key={zoomIndex}
            custom={{ direction, width: containerWidth }}
            variants={galleryMotionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            dragPropagation
            drag={zoomLevel === 1 ? "x" : false}
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
            sx={{
              position: "absolute",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
              width: "100%",
              height: "100%"
            }}
            onTap={e => {
              setZoomLevel(zoomLevel === 1 ? 2 : 1)
              setPosition([e.x, e.y])
            }}
          >
            <motion.div
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%"
              }}
              animate={{
                // needs maths on bounding
                x: zoomLevel === 1 ? 0 : x * -1,
                y: zoomLevel === 1 ? 0 : y * -1,
                scale: zoomLevel === 1 ? 1 : 3
              }}
            >
              <MediaImage
                key={remappedImage._key}
                fit="contain"
                sanityImage={remappedImage}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Box>
      <SliderControl onPrev={onPrev} onNext={onNext} />
    </Box>
  )
}

export default Zoom
