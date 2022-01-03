import { FC } from "react"
import { PageContent } from "@sanityLib/types/guides"
import { SanityAsset } from "@sanityLib/types/image"
import { MediaImageRSS } from "@components/common/MediaImage"
interface MediaProps {
  content: PageContent
}

const MediaRSS: FC<MediaProps> = ({ content }) => {
  if (content.Image && content.palette) {
    const remappedImage: SanityAsset = {
      Image: content.Image,
      _key: content._key,
      _type: content._type,
      alt_text: content.alt_text || "",
      palette: content.palette
    }

    return (
      <div>
        <div>
          {content.Image && (
            <MediaImageRSS fit="contain" sanityImage={remappedImage} />
          )}
          {content.caption && (
            <div>
              <caption>{content.caption}</caption>
            </div>
          )}
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

export default MediaRSS
