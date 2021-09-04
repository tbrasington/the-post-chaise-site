import { Box } from "theme-ui"
import { Caption } from "@components/content/Slices"
import { FC } from "react"
import { Flex } from "theme-ui"
import { PageContent } from "@sanity/types/guides"
import { MediaImage } from "@components/common"
import { SanityAsset } from "@sanity/types/image"
import { StandardXAxisSpace, StandardXPadding } from "@theme/tokens"
interface MediaProps {
  content: PageContent
}

const Media: FC<MediaProps> = ({ content }) => {
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
          ml: [0, null, "auto"],
          px: content.fullbleed ? 0 : [24, null, 0],
          width: content.fullbleed
            ? "100%"
            : ["100%", null, `calc(100% - ${StandardXAxisSpace})`]
        }}
      >
        {content.Image && (
          <MediaImage fit="cover" sanityImage={remappedImage} />
        )}
        <Flex
          sx={{
            alignItems: "center",
            pt: 24,
            flexWrap: "wrap",
            flexShrink: 1,
            flexGrow: 1,
            px: content.fullbleed ? StandardXPadding : 0,
            "& > div": {
              flexShrink: 1,
              flexGrow: 1,
              mb: 16,
              pr: content.fullbleed ? 0 : StandardXPadding
            },
            "& > div + div": {
              flexShrink: 0.5,
              flexGrow: 0.5
            },
            "& > div a": {
              ml: [0, 0, "auto"]
            }
          }}
        >
          {content.caption && <Caption>{content.caption}</Caption>}
        </Flex>
      </Box>
    )
  } else {
    return <Box />
  }
}

export default Media
