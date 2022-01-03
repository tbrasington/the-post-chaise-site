import Image from "next/image"
import { SanityAsset } from "@sanityLib/types/image"
import { getClient } from "@sanityLib/sanity.server"
import { useNextSanityImage } from "next-sanity-image"
import React from "react"
type Props = {
  sanityImage: SanityAsset
  priority?: number
  width?: number
  height?: number
  sizes?: string
  fit?: "contain" | "cover"
  innerRef?: React.ForwardedRef<HTMLDivElement>
}

const MediaImageRSS: React.FC<Props> = ({
  sanityImage,
  priority,
  width,
  height,
  sizes = "(max-width: 800px) 100vw, 800px",
  fit = "contain",
  innerRef
}) => {
  const image = useNextSanityImage(getClient(false), sanityImage.Image, {
    imageBuilder: (imageUrlBuilder, options) => {
      return imageUrlBuilder
        .auto("format")
        .maxWidth(
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
      <div key={image.src} ref={innerRef}>
        <Image
          loader={image.loader}
          placeholder={image.placeholder}
          src={image.src}
          blurDataURL={image.blurDataURL}
          alt={sanityImage.alt_text}
          layout="fill"
          objectFit={fit}
          objectPosition="center"
          priority={priority === 0}
          sizes={sizes}
        />
      </div>
    )
  )
}

export default MediaImageRSS
