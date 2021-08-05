import { FC, useState } from "react"
import { ProductImage, ProductSlider } from "@components/product"

import { Box } from "theme-ui"
import { ColorTokens } from "@theme/tokens"
import { PageContent } from "@sanity/types/guides"

interface GalleryProps {
  content: PageContent
}

const Gallery: FC<GalleryProps> = ({ content }) => {
  const slideColors =
    content.gallery && content.gallery.map(slide => slide.palette)

  return (
    <Box
      sx={{
        height: "80vh"
      }}
    >
      {content.gallery && (
        <ProductSlider slideColorData={slideColors}>
          {content.gallery?.map((slide, i) => {
            return (
              <ProductImage
                sanityImage={slide.mediaAsset}
                priority={i}
                key={slide._key}
              />
            )
          })}
        </ProductSlider>
      )}
    </Box>
  )
}

export default Gallery
