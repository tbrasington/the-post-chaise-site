import { Flex } from "theme-ui"
import Image from "next/image"
import { SanityAsset } from "@sanity/types/image"
import { getClient } from "@sanity/sanity.server"
import { useNextSanityImage } from "next-sanity-image"

type Props = {
  sanityImage: SanityAsset
  priority: number
}

const ProductImage: React.FC<Props> = ({ sanityImage, priority }) => {
  const image = useNextSanityImage(getClient(false), sanityImage.Image)
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
          "& > div": {
            height: "100%"
          }
        }}
      >
        <Image
          {...image}
          alt={sanityImage.alt_text}
          layout="intrinsic"
          objectFit="contain"
          objectPosition="center"
          priority={priority === 0}
          sizes="(max-width: 800px) 100vw, 800px"
        />
      </Flex>
    )
  )
}

export default ProductImage
