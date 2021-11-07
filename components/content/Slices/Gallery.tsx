import { FC } from "react"
import { Gallery } from "@components/common"
import MediaImage from "../../common/MediaImage"
import { Box } from "theme-ui"

import { PageContent } from "@sanityLib/types/guides"

interface GalleryProps {
  content: PageContent
}

const GallerySlice: FC<GalleryProps> = ({ content }) => {
  const slideColors =
    content.gallery && content.gallery.map(slide => slide.palette)

  return (
    <Box
      sx={{
        height: "80vh"
      }}
    >
      {content.gallery && (
        <Gallery slideColorData={slideColors}>
          {content.gallery?.map((slide, i) => {
            return (
              <MediaImage
                sanityImage={slide.mediaAsset}
                priority={i}
                key={slide._key}
              />
            )
          })}
        </Gallery>
      )}
    </Box>
  )
}

export default GallerySlice
