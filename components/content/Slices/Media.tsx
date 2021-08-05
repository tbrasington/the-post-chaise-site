import AddToBag from "./AddToBag"
import { Box } from "theme-ui"
import { Caption } from "@components/content/Slices"
import { FC } from "react"
import { Flex } from "theme-ui"
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
        <Flex
          sx={{
            alignItems: "center",
            pt: 24,
            flexWrap: "wrap",
            flexShrink: 1,
            flexGrow: 1,
            "& > div": {
              flexShrink: 1,
              flexGrow: 1,
              mb: 16,
              pr: 24,
              mx: content.fullbleed ? StandardXAxisSpace : 0
            },
            "& > div + div": {
              flexShrink: 0.5,
              flexGrow: 0.5
            }
          }}
        >
          {content.caption && <Caption>{content.caption}</Caption>}
          {content.shopifyProduct && (
            <AddToBag
              sanityProduct={content.shopifyProduct}
              colorOverride={remappedImage.palette.lightMuted.background}
            />
          )}
        </Flex>
      </Box>
    )
  } else {
    return <Box />
  }
}

export default Media
