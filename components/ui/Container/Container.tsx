/** @jsxImportSource theme-ui */

import { FC } from 'react'
import { StandardXPadding } from '@theme/tokens'

interface ContainerProps {

  children?: any
  el?: HTMLElement
  clean?: boolean
}

const Container: FC<ContainerProps> = ({
  children,
  el = 'div',
  clean,
}) => {
 

  let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any

  return <Component sx={{
    px : clean ? 0 : StandardXPadding
  }}>{children}</Component>
}

export default Container
