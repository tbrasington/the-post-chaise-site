/** @jsxImportSource theme-ui */

import { FC, JSXElementConstructor } from "react"

import { StandardXPadding } from "@theme/tokens"
import { ThemeUIStyleObject } from "theme-ui"

interface ContainerProps {
  children?: any
  el?: string | JSXElementConstructor<any>
  clean?: boolean
  sx?: ThemeUIStyleObject
  spacing?: number
  marginBottom?: number
}

const Container: FC<ContainerProps> = ({
  children,
  el = "div",
  clean,
  spacing = 0,
  marginBottom = 0,
  ...props
}) => {
  let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any

  return (
    <Component
      sx={{
        px: clean ? 0 : StandardXPadding,
        mb: marginBottom,
        "& > * + *": {
          mt: spacing
        }
      }}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Container
