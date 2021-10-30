import { Box } from "theme-ui"
import { Caption } from "@components/content/Slices"
import { FC } from "react"
import { Flex, Grid } from "theme-ui"
import { PageContent } from "@sanity/types/guides"
import { MediaImage } from "@components/common"
import { SanityAsset } from "@sanity/types/image"
import { StandardLeftIndent, StandardXPadding } from "@theme/tokens"
interface MediaProps {
  content: PageContent
}

const MediaGrid: FC<MediaProps> = ({ content }) => {
  return (
    <Box
      sx={{
        width: "100%",
        px: StandardLeftIndent
      }}
    >
      <Grid columns={content.columns || 2} gap={24} sx={{ width: "100%" }}>
        {content.gallery?.map(item => {
          const remappedImage: SanityAsset = {
            Image: item.mediaAsset.Image,
            alt_text: item.mediaAsset.alt_text,
            palette: item.mediaAsset.palette,
            _key: item._key,
            _type: item._type
          }

          return (
            <MediaImage
              key={remappedImage._key}
              fit="contain"
              sanityImage={remappedImage}
            />
          )
        })}
      </Grid>

      {content.caption && (
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
          <Caption>{content.caption}</Caption>
        </Flex>
      )}
    </Box>
  )
}

export default MediaGrid
