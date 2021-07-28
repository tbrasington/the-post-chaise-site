import React, { CSSProperties } from "react"

import px from "@lib/to-pixels"

interface SkeletonProps {
  show?: boolean
  block?: boolean
  className?: string
  style?: CSSProperties
  width?: string | number
  height?: string | number
  boxHeight?: string | number
}

const Skeleton: React.FC<SkeletonProps> = ({
  style,
  width,
  height,
  children,
  className,
  show = true,
  boxHeight = height
}) => {
  // Automatically calculate the size if there are children
  // and no fixed sizes are specified
  const shouldAutoSize = !!children && !(width || height)

  // Defaults
  width = width || 24
  height = height || 24
  boxHeight = boxHeight || height

  //  className={cn(s.skeleton, className, {
  //       [s.show]: show,
  //       [s.wrapper]: shouldAutoSize,
  //       [s.loaded]: !shouldAutoSize && !!children
  //     })}
  //
  return (
    <span
      style={
        shouldAutoSize
          ? {}
          : {
              minWidth: px(width),
              minHeight: px(height),
              marginBottom: `calc(${px(boxHeight)} - ${px(height)})`,
              ...style
            }
      }
    >
      {children}
    </span>
  )
}

export default Skeleton
