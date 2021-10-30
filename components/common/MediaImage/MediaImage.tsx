import { Flex } from "theme-ui"
import Image from "next/image"
import { SanityAsset } from "@sanity/types/image"
import { getClient } from "@sanity/sanity.server"
import { useNextSanityImage } from "next-sanity-image"

type Props = {
  sanityImage: SanityAsset
  priority?: number
  width?: number
  height?: number
  sizes?: string
  fit?: "contain" | "cover"
}

const MediaImage: React.FC<Props> = ({
  sanityImage,
  priority,
  width,
  height,
  sizes = "(max-width: 800px) 100vw, 800px",
  fit = "contain"
}) => {
  const image = useNextSanityImage(getClient(false), sanityImage.Image, {
    imageBuilder: (imageUrlBuilder, options) => {
      return imageUrlBuilder
        .auto("format")
        .width(
          width ||
            options.width ||
            Math.min(options.originalImageDimensions.width)
        )
        .maxHeight(height || Math.min(options.originalImageDimensions.height))
        .crop("focalpoint")
    }
  })

  return (
    image && (
      <Flex
        key={image.src}
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          aspectRatio: String(image.width / image.height),
          "& > div": {
            height: "100%",
            width: "100%"
          },
          "& img": {
            backgroundRepeat: "no-repeat"
          }
        }}
      >
        <Image
          {...image}
          alt={sanityImage.alt_text}
          layout="responsive"
          objectFit={fit}
          objectPosition="center"
          priority={priority === 0}
          sizes={sizes}
        />
      </Flex>
    )
  )
}

export default MediaImage
