/** @jsxImportSource theme-ui */
import { Box } from "@theme-ui/components"
import { ColorTokens } from "@theme/tokens"
import { motion } from "framer-motion"
import { FC } from "react"

export const Zoom: FC = ({}) => {
  return (
    <Box>
      <motion.div
        onPan={(e, pointInfo) => {
          console.log({ pointInfo })
        }}
        style={{
          touchAction: "pinch-zoom"
        }}
      >
        <Box sx={{ width: 200, height: 200, bg: ColorTokens.primary }}>hi</Box>
      </motion.div>
    </Box>
  )
}

export default Zoom
