import { Flex } from "@theme-ui/components"
import { LoadingDots } from ".."
import React from "react"
const Loader: React.FC = () => {
  return (
    <Flex className="w-80 h-80 flex items-center text-center justify-center p-3">
      <LoadingDots />
    </Flex>
  )
}
Loader.displayName = "Loader"
export default Loader
