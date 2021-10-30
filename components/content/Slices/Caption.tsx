import { Box, ThemeUIStyleObject } from "theme-ui"
import { FC } from "react"
import { TextStyleNames } from "@theme/tokens"
const Caption: FC<{ sx?: ThemeUIStyleObject }> = ({ children, sx }) => {
  return (
    <Box sx={{ variant: `text.${TextStyleNames.caption}`, ...sx }}>
      {children}
    </Box>
  )
}

export default Caption
