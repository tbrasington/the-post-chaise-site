/* eslint-disable @next/next/no-img-element */
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
      <div key={image.src} ref={innerRef} style={{ marginBottom: "24px" }}>
        <img src={image.src} alt={sanityImage.alt_text} />
      </div>
    )
  )
}

export default MediaImageRSS
