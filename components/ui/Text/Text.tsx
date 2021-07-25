/** @jsxImportSource theme-ui */
import React, {
  CSSProperties,
  FunctionComponent,
  JSXElementConstructor
} from "react"
interface TextProps {
  variant?: Variant
  className?: string
  style?: CSSProperties
  children?: React.ReactNode | any
  html?: string
  onClick?: () => any
}

type Variant =
  | "page_title"
  | "sub_heading"
  | "statement"
  | "paragraph"
  | "paragraph_small"
  | "caption"
  | "label_standard"
  | "label_upper"
  | "action"

const Text: FunctionComponent<TextProps> = ({
  variant = "paragraph",

  children,
  html,
  onClick,
  ...props
}) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string
  } = {
    page_title: "h1",
    sub_heading: "h2",
    statement: "p",
    paragraph: "p",
    paragraph_small: "p",
    caption: "p",
    label_standard: "span",
    label_upper: "span",
    action: "span"
  }

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    | string = componentsMap![variant!]

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html }
      }
    : {}

  return (
    <Component
      sx={{
        m: 0,
        p: 0,
        variant: `text.${variant}`,
        "& p": {
          m: 0,
          p: 0
        }
      }}
      onClick={onClick}
      {...htmlContentProps}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Text
