/** @jsxImportSource theme-ui */
import { Flex } from "theme-ui"
import { FC } from "react"
import { Text } from "@components/ui"

interface Props {
  title: string
  description: string
}

const CollectionShelf: FC<Props> = ({ title, description, children }) => {
  return (
    <Flex>
      <Text>{title}</Text>
      <Text>{description}</Text>
      <Flex>{children}</Flex>
    </Flex>
  )
}

export default CollectionShelf
