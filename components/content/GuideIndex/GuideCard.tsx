import { getClient } from "@sanity/sanity.server"
import { GuideIndexList } from "@sanity/types/guides"
import { useNextSanityImage } from "next-sanity-image"
import Link from "next/link"
import React, { FC } from "react"
import { Flex } from "theme-ui"
import Image from "next/image"
import { Text } from "@components/ui"
const GuideCard: FC<{ item: GuideIndexList }> = ({ item }) => {
  const image = useNextSanityImage(getClient(false), item.hero_image, {
    imageBuilder: imageUrlBuilder => {
      return imageUrlBuilder.width(800).height(600).crop("focalpoint")
    }
  })
  return (
    <Flex sx={{ flexDirection: "column" }}>
      {image && (
        <Link href={`/guide/${item.slug}`} passHref>
          <Image
            {...image}
            alt={" "}
            layout="responsive"
            width={400}
            height={300}
            objectPosition="center"
            sizes="(max-width: 800px) 100vw, 800px"
          />
        </Link>
      )}
      <Flex
        sx={{
          flexDirection: "column",
          mt: 24,
          "& > div + div": {
            mt: 4
          }
        }}
      >
        <Text variant="sub_heading">{item.title}</Text>
        <Text variant="paragraph">{item.seo_description}</Text>
        <Text variant="paragraph">
          <Link href={`/guide/${item.slug}`}>
            <a>Read</a>
          </Link>
        </Text>
      </Flex>
    </Flex>
  )
}

export default GuideCard
