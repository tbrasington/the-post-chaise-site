/** @jsxImportSource theme-ui */
import {
  PageContentGallery,
  remappedAllMediaProps
} from "@sanityLib/types/guides"
import { SanityAsset } from "@sanityLib/types/image"
import { Box, Flex } from "@theme-ui/components"
import { AnimatePresence, motion, useMotionValue } from "framer-motion"
import { FC, useState, useRef } from "react"
import { MediaImage } from "@components/common"
import { Button } from "@components/ui"

import { wrap } from "popmotion"
import {
  galleryMotionVariants,
  swipeConfidenceThreshold,
  swipePower
} from "../Gallery/Gallery"

import SliderControl from "../Gallery/Controls"
import { Text } from "@components/ui"
import { fallbackPalette } from "@theme/palette"

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
  initialIndex: string
  slides: remappedAllMediaProps[]
  close: () => void
}

export const Zoom: FC<ZoomProps> = ({ slides, initialIndex = "", close }) => {
  const mappedIndex =
    slides.findIndex(slide => slide._key === initialIndex) || 0
  const [zoomLevel, setZoomLevel] = useState<1 | 2>(1)
  const [[zoomIndex, direction], setZoomIndex] = useState([mappedIndex, 0])
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

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const filterSlides = slides.filter(item => item.Image !== null)
  const totalSlides = filterSlides.length
  const imageIndex = wrap(0, totalSlides, zoomIndex)

  const remappedImage: SanityAsset = {
    Image: filterSlides[imageIndex]?.Image || {
      _type: "image",
      asset: {
        _ref: "image-45b6703725a2b226e0fb3cdb230b1c2e714b3569-3199x4000-jpg",
        _type: "reference"
      }
    },
    alt_text: filterSlides[imageIndex]?.alt_text || "",
    palette: filterSlides[imageIndex]?.palette || fallbackPalette,
    _key: filterSlides[imageIndex]._key,
    _type: filterSlides[imageIndex]._type
  }

  return (
    <Flex
      ref={galleryRef}
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        bg: filterSlides[imageIndex].palette?.darkMuted.background,
        p: 32,
        flexDirection: "column"
      }}
    >
      <Box sx={{ position: "absolute", right: 24, top: 40, zIndex: 10 }}>
        <Button
          variant="mini"
          bgOverride={filterSlides[imageIndex].palette?.vibrant.background}
          textOverride={filterSlides[imageIndex].palette?.vibrant.foreground}
          onClick={close}
        >
          Close
        </Button>
      </Box>
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
            key={`zoom-outer-${zoomIndex}`}
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
              aria-label="Zoom image"
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
                      x: x,
                      y: y
                    }
                  : { x: 0, y: 0 })
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
              onMouseMove={e => {
                if (zoomLevel === 2) {
                  let xPos = x.get() + e.movementX
                  let yPos = y.get() + e.movementY

                  let imageWrapper =
                    galleryRef.current &&
                    galleryRef.current.getElementsByTagName("img")[0]

                  const zoomedImageWidth =
                    (imageWrapper?.getBoundingClientRect().width || 0) / 3

                  const zoomedImageHeight =
                    (imageWrapper?.getBoundingClientRect().height || 0) / 3

                  if (yPos > zoomedImageHeight) {
                    yPos = zoomedImageHeight
                  }

                  if (yPos < zoomedImageHeight * -1) {
                    yPos = zoomedImageHeight * -1
                  }

                  if (xPos > zoomedImageWidth) {
                    xPos = zoomedImageWidth
                  }

                  if (xPos < zoomedImageWidth * -1) {
                    xPos = zoomedImageWidth * -1
                  }

                  x.set(xPos)
                  y.set(yPos)
                }
              }}
            >
              <MediaImage
                key={`image-${zoomIndex}`}
                fit="contain"
                sanityImage={remappedImage}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Box>
      <Flex
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Text
          sx={{
            color: filterSlides[imageIndex].palette?.darkMuted.foreground
          }}
          variant="caption"
        >
          {imageIndex + 1} / {totalSlides}
        </Text>

        <SliderControl
          onPrev={onPrev}
          onNext={onNext}
          bgOverride={filterSlides[imageIndex].palette?.vibrant.background}
          textOverride={filterSlides[imageIndex].palette?.vibrant.foreground}
        />
      </Flex>
    </Flex>
  )
}

export default Zoom
