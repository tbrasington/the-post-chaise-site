/** @jsxImportSource theme-ui */
import { Box } from "@theme-ui/components"
import { ColorTokens } from "@theme/tokens"
import { motion } from "framer-motion"
import { FC } from "react"

/**
 *
 * Zoom in and out of a component
 * Tap, launch zoom
 * Initial state
 *  Zoom in level 200%
 *  Tap to Zoom out level 100%
 *  Swipe left and right
 *  Tap to zoom in again 200%
 *  Pan to move around
 *  Close button to close
 *
 */
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
