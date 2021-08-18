/** @jsxImportSource theme-ui */
import { Flex } from "theme-ui"
import { FC } from "react"
import { Text } from "@components/ui"
import { ColorTokens } from "@theme/tokens"

interface Props {
  title: string
  description: string
  useRule?: boolean
}

const CollectionShelf: FC<Props> = ({
  title,
  description,
  useRule,
  children
}) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        borderTopStyle: useRule ? "solid" : "none",
        borderTopColor: ColorTokens.muted,
        borderTopWidth: useRule ? 1 : 0,
        py: 32
      }}
    >
      <Text variant="sub_heading">{title}</Text>
      <Text>{description}</Text>
      <Flex>{children}</Flex>
    </Flex>
  )
}

export default CollectionShelf
