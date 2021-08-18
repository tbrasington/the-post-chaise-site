/** @jsxImportSource theme-ui */

import { FC } from "react"
import { Container, Text } from "@components/ui"
import { ColorTokens } from "@theme/tokens"
interface Props {
  title: string
  description: string
  bgOverride?: string | any
}

const PageHeader: FC<Props> = ({ title, description, bgOverride }) => {
  return (
    <Container
      sx={{
        bg: bgOverride ? bgOverride : ColorTokens.secondary,
        py: 128,
        mb: 56,
        color: ColorTokens.background
      }}
    >
      <Text variant="page_title">{title}</Text>
      <Text variant="statement">{description}</Text>
    </Container>
  )
}

export default PageHeader
