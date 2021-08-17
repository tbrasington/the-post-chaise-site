/** @jsxImportSource theme-ui */

import { getClient } from "@sanity/sanity.server"
import { GuideIndexList } from "@sanity/types/guides"
import { useNextSanityImage } from "next-sanity-image"
import Link from "next/link"
import React, { FC } from "react"
import { Box, Flex } from "theme-ui"
import Image from "next/image"
import { Text } from "@components/ui"
import { ButtonNames } from "@theme/buttons"
const GuideCard: FC<{ item: GuideIndexList }> = ({ item }) => {
  const image = useNextSanityImage(getClient(false), item.hero_image, {
    imageBuilder: imageUrlBuilder => {
      return imageUrlBuilder.width(800).height(600).crop("focalpoint")
    }
  })
  return (
    <Flex sx={{ flexDirection: "column" }}>
      {image && (
        <Link href={`/stories-and-guides/${item.slug}`} passHref>
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
        <Box sx={{ mt: 24 }}>
          <Text variant="paragraph">
            <Link href={`/stories-and-guides/${item.slug}`} passHref>
              <a
                sx={{
                  variant: `buttons.${ButtonNames.underline}`
                }}
              >
                Read
              </a>
            </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default GuideCard
