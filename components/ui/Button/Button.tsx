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

    Component = "button",
    ...rest
  } = props

  const ref = useRef<typeof Component>(null)
  return (
    <Component
      aria-pressed={active}
      ref={mergeRefs([ref, buttonRef])}
      disabled={disabled}
      sx={{
        variant: `buttons.${variant}`,
        width: width
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i
          sx={{
            p: 4,
            display: "flex"
          }}
        >
          <LoadingDots />
        </i>
      )}
    </Component>
  )
})

export default Button
