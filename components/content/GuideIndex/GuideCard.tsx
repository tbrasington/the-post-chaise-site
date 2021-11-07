/** @jsxImportSource theme-ui */

import { getClient } from "@sanityLib/sanity.server"
import { GuideIndexList } from "@sanityLib/types/guides"
import { useNextSanityImage } from "next-sanity-image"
import Link from "next/link"
import { FC } from "react"
import { Flex } from "theme-ui"
import Image from "next/image"
import { Text } from "@components/ui"

const GuideCard: FC<{ item: GuideIndexList; showDescription?: boolean }> = ({
  item,
  showDescription = true
}) => {
  const image = useNextSanityImage(getClient(false), item.hero_image, {
    imageBuilder: (imageUrlBuilder, options) => {
      return imageUrlBuilder
        .width(options.width || 800)
        .height((options.width || 800) * 0.75)
        .crop("focalpoint")
        .fit("crop")
        .auto("format")
    }
  })
  return (
    <Flex sx={{ flexDirection: "column" }}>
      {image && (
        <Link href={`/stories-and-guides/${item.slug}`} passHref>
          <a
            aria-label={`view ${item.title}`}
            sx={{
              bg: item.palette.muted.background,
              img: {
                transition: "all 0.15s ease-in",
                transformOrigin: "center"
              },
              ":hover div": {
                filter: "grayscale(100%) saturate(20%) "
              },
              ":hover img": {
                opacity: 0.5
              },
              ":focus img": {
                opacity: 0.2
              },
              ":focus": {
                outline: `3px solid ${item.palette.darkVibrant.background}`
              }
            }}
          >
            <Image
              {...image}
              alt={""}
              layout="responsive"
              width={400}
              height={300}
              objectPosition="center"
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </a>
        </Link>
      )}
      <Flex
        sx={{
          flexDirection: "column",
          mt: 12,
          "& > div + div": {
            mt: 4
          }
        }}
      >
        <Text variant="paragraph_small">{item.title}</Text>
        {showDescription && item.seo_description && (
          <Text variant="paragraph_small">{item.seo_description}</Text>
        )}
      </Flex>
    </Flex>
  )
}

export default GuideCard
