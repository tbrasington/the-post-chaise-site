/** @jsxImportSource theme-ui */
import { PageContentGallery } from "@sanityLib/types/guides"
import { SanityAsset } from "@sanityLib/types/image"
import { Box } from "@theme-ui/components"
import { ColorTokens } from "@theme/tokens"
import { AnimatePresence, motion, useMotionValue } from "framer-motion"
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

export const Zoom: FC<ZoomProps> = ({ slides, initialIndex = 0 }) => {
  const [zoomLevel, setZoomLevel] = useState<1 | 2>(1)
  const [[zoomIndex, direction], setZoomIndex] = useState([initialIndex, 0])
  const [zoomOffset, setZoomOffset] = useState<{
    top: number
    left: number
    right: number
    bottom: number
  }>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  })
  const imageIndex = wrap(0, slides.length, zoomIndex)

  // gallery state actions
  const galleryRef = useRef<HTMLDivElement>(null)

  const containerWidth = galleryRef.current
    ? galleryRef.current.getBoundingClientRect().width
    : "100%"

  // functions

  function paginate(newDirection: number) {
    setZoomIndex([zoomIndex + newDirection, newDirection])
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
        bg: slides[imageIndex].palette.darkMuted.background,
        p: 32
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden"
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
          >
            <button
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                bg: "red",
                zIndex: 10,
                display: zoomLevel === 2 ? "none" : "block",
                opacity: 0
              }}
              onClick={() => {
                let imageWrapper =
                  galleryRef.current &&
                  galleryRef.current.getElementsByTagName("img")[0]

                /* 
                calculate the new width and height of the image 
                */

                const width = imageWrapper?.getBoundingClientRect().width || 0

                const height = imageWrapper?.getBoundingClientRect().height || 0

                const naturalWidth = imageWrapper?.naturalWidth || 0
                const naturalHeight = imageWrapper?.naturalHeight || 0
                const scale = 3
                const scaledWidth = Math.round(width * scale)
                const scaledHeight = Math.round(
                  (scaledWidth * naturalHeight) / naturalWidth
                )

                // set the connstraints
                setZoomOffset({
                  top: ((scaledHeight - height) / 2) * -1,
                  left: ((scaledWidth - width) / 2) * -1,
                  right: (scaledWidth - width) / 2,
                  bottom: (scaledHeight - height) / 2
                })

                setZoomLevel(zoomLevel === 1 ? 2 : 1)
              }}
            ></button>
            <motion.div
              dragConstraints={{
                top: zoomOffset.top,
                bottom: zoomOffset.bottom,
                left: zoomOffset.left,
                right: zoomOffset.right
              }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                ...(zoomLevel === 2
                  ? {
                      x: 0,
                      y: 0
                    }
                  : {})
              }}
              animate={{
                // needs maths on bounding
                scale: zoomLevel === 1 ? 1 : 3
              }}
              drag
              onClick={() => {
                setZoomLevel(1)
                setZoomOffset({
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
                })
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
