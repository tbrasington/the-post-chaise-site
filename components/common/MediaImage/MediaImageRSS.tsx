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
        .maxWidth(800)
        .maxHeight(800)
        .crop("focalpoint")
    }
  })

  return (
    image && (
      <div key={image.src} ref={innerRef}>
        <Image
          loader={image.loader}
          src={image.src}
          alt={sanityImage.alt_text}
          layout="fixed"
          objectFit={fit}
          objectPosition="center"
        />
      </div>
    )
  )
}

export default MediaImageRSS
