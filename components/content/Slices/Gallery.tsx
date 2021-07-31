import { ProductImage, ProductSlider } from "@components/product"

import { Box } from "theme-ui"
import { FC } from "react"
import { PageContent } from "@sanity/types/guides"

interface GalleryProps {
  content: PageContent
}

const Gallery: FC<GalleryProps> = ({ content }) => {
  return (
    <Box
      sx={{
        height: "80vh"
      }}
    >
      {content.gallery && (
        <ProductSlider>
          {content.gallery?.map((slide, i) => (
            <ProductImage
              sanityImage={slide.mediaAsset}
              priority={i}
              key={slide._key}
            />
          ))}
        </ProductSlider>
      )}
    </Box>
  )
}

export default Gallery
