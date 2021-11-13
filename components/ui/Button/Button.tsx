/* eslint-disable react/display-name */
/** @jsxImportSource theme-ui */
import React, {
  ButtonHTMLAttributes,
  JSXElementConstructor,
  forwardRef,
  useRef
} from "react"

import { ButtonTypes } from "@theme/buttons"
import { LoadingDots } from "@components/ui"
import { ThemeUIStyleObject } from "theme-ui"
import mergeRefs from "react-merge-refs"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Link to the button
   */
  href?: string
  /**
   * What kind of style?
   */
  variant?: ButtonTypes
  active?: boolean
  type?: "submit" | "reset" | "button"
  Component?: string | JSXElementConstructor<any>
  /**
   * overide the width
   */
  width?: string | number
  /**
   * Toggle loading dots on and off
   */
  loading?: boolean
  /**
   * Disable the butotn
   */
  disabled?: boolean
  /**
   * override the color value of the bg
   */
  bgOverride?: string
  /**
   * override the color value of the bg
   */
  textOverride?: string
}

const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = "primary",
    children,
    active,
    width,
    loading = false,
    disabled = false,
    bgOverride,
    textOverride,
    Component = "button",
    ...rest
  } = props

  const ref = useRef<typeof Component>(null)

  let colorOverrides: ThemeUIStyleObject = {}

  if (bgOverride && bgOverride?.length > 0) {
    colorOverrides = {
      bg: bgOverride,
      borderColor: bgOverride
    }
  }

  if (textOverride && textOverride?.length > 0) {
    colorOverrides = {
      ...colorOverrides,
      color: textOverride
    }
  }

  return (
    <Component
      aria-pressed={active}
      ref={mergeRefs([ref, buttonRef])}
      disabled={disabled}
      sx={{
        variant: `buttons.${variant}`,
        ...colorOverrides,
        width: width
      }}
      {...rest}
    >
      {loading ? (
        <i
          sx={{
            display: "flex"
          }}
        >
          <LoadingDots />
        </i>
      ) : (
        children
      )}
    </Component>
  )
})

export default Button
