import { Box } from "theme-ui"
import { FC } from "react"
import { TextStyleNames } from "@theme/tokens"
const Caption: FC = ({ children }) => {
  return (
    <Box sx={{ variant: `text.${TextStyleNames.caption}` }}>{children}</Box>
  )
}

export default Caption
