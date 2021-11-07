import { Box } from "theme-ui"
import { Caption } from "@components/content/Slices"
import { FC } from "react"
import { Flex } from "theme-ui"
import { PageContent } from "@sanityLib/types/guides"
import { MediaImage } from "@components/common"
import { SanityAsset } from "@sanityLib/types/image"
import {
  ColorTokens,
  StandardLeftIndent,
  StandardXPadding
} from "@theme/tokens"
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
          px: content.fullbleed ? 0 : StandardXPadding,
          width: "100%"
        }}
      >
        <Box sx={{ mx: content.fullbleed ? 0 : StandardLeftIndent }}>
          {content.Image && (
            <MediaImage fit="contain" sanityImage={remappedImage} />
          )}
          {content.caption && (
            <Flex
              sx={{
                alignItems: "center",
                pt: 24,
                flexWrap: "wrap",
                flexShrink: 1,
                flexGrow: 1,
                ml: content.fullbleed ? StandardLeftIndent : 0,
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
              <Caption sx={{ color: ColorTokens.darken }}>
                {content.caption}
              </Caption>
            </Flex>
          )}
        </Box>
      </Box>
    )
  } else {
    return <Box />
  }
}

export default Media
