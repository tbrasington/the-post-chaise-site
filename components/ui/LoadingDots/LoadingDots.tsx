import { Box, Flex } from "@theme-ui/components"
const LoadingDots: React.FC = () => {
  return (
    <Flex as="span">
      <Box as="span" key={`dot_1`} />
      <Box as="span" key={`dot_2`} />
      <Box as="span" key={`dot_3`} />
    </Flex>
  )
}

export default LoadingDots
