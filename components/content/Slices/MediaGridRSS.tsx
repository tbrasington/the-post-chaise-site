import React, { FC } from "react"

import { PageContent } from "@sanityLib/types/guides"
import { SanityAsset } from "@sanityLib/types/image"
import { MediaImageRSS } from "@components/common/MediaImage"

interface MediaProps {
  content: PageContent
}

const MediaGridRSS: FC<MediaProps> = ({ content }) => {
  return (
    <div>
      <div>
        {content.gallery &&
          content.gallery?.length > 0 &&
          content.gallery?.map(item => {
            if (item.mediaAsset) {
              const remappedImage: SanityAsset = {
                Image: item.mediaAsset.Image,
                alt_text: item.mediaAsset.alt_text,
                palette: item.mediaAsset.palette,
                _key: item._key,
                _type: item._type
              }

              return (
                <MediaImageRSS
                  key={remappedImage._key}
                  fit="contain"
                  sanityImage={remappedImage}
                />
              )
            } else {
              return <React.Fragment />
            }
          })}
      </div>

      {content.caption && (
        <div>
          <caption>{content.caption}</caption>
        </div>
      )}
    </div>
  )
}

export default MediaGridRSS
