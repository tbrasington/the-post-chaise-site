import AddToBag from "./AddToBag"
import { Box } from "theme-ui"
import { FC } from "react"
import { PageContent } from "@sanity/types/guides"
import { ProductImage } from "@components/product"
import { SanityAsset } from "@sanity/types/image"
import { StandardXAxisSpace } from "@theme/tokens"

interface MediaProps {
  content: PageContent
}

const Media: FC<MediaProps> = ({ content }) => {
  console.log({ media: content })

  if (content.Image && content.palette) {
    const remappedImage: SanityAsset = {
      Image: content.Image,
      _key: content._key,
      _type: content._type,
      alt_text: content.alt_text || "",
      palette: content.palette
    }

    return (
      <Box
        sx={{
          ml: "auto",
          width: content.fullbleed
            ? "100%"
            : `calc(100% - ${StandardXAxisSpace})`
        }}
      >
        {content.Image && (
          <ProductImage fit="cover" sanityImage={remappedImage} />
        )}
        {content.shopifyProduct && (
          <AddToBag sanityProduct={content.shopifyProduct} />
        )}
      </Box>
    )
  } else {
    return <Box />
  }
}

export default Media
