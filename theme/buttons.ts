import {
  ColorTokens,
  FontSizes,
  FontWeights,
  TextStyleNames,
  TextStyles
} from "./tokens"

export const ButtonBase = {
  px: 16,
  m: 0,
  height: 40,
  borderStyle: "solid",
  borderRadius: 40,
  transition: "all 0.2s ease",
  cursor: "pointer",
  variant: `text.${TextStyleNames.action}`
}

export type ButtonTypes = "primary" | "secondary" | "link" | "controls"
export const ButtonVariants = {
  primary: {
    ...ButtonBase,
    bg: ColorTokens.primary,
    borderColor: ColorTokens.primary,
    color: ColorTokens.background,
    ":hover": {
      borderColor: ColorTokens.highlight,
      bg: ColorTokens.highlight
    },
    ":disabled": {
      cursor: "not-allowed",
      bg: ColorTokens.muted,
      borderColor: ColorTokens.muted
    }
  },
  secondary: {
    ...ButtonBase,
    bg: ColorTokens.secondary,
    color: ColorTokens.background,
    borderColor: ColorTokens.secondary,
    ":hover": {
      borderColor: ColorTokens.highlight,
      bg: ColorTokens.highlight,
      color: ColorTokens.background
    },
    ":disabled": {
      cursor: "not-allowed",
      bg: ColorTokens.muted,
      borderColor: ColorTokens.muted
    }
  },
  link: {
    cursor: "pointer",
    border: "none",
    bg: "transparent",
    height: "auto",
    m: 0,
    p: 0,
    color: ColorTokens.primary,
    lineHeight: "inherit",
    fontFamily: "inherit",
    fontWeight: "inherit",
    textDecoration: "none",

    ":hover": {
      color: ColorTokens.highlight
    },
    ":active": {
      color: ColorTokens.primary
    },

    "& a": {
      color: "inherit",
      textDecoration: "none"
    }
  },
  controls: {
    ...ButtonBase,
    bg: ColorTokens.text,
    borderColor: ColorTokens.text,
    color: ColorTokens.background,
    ":hover": {
      borderColor: ColorTokens.highlight,
      bg: ColorTokens.highlight
    },
    ":disabled": {
      cursor: "not-allowed",
      bg: ColorTokens.muted,
      borderColor: ColorTokens.muted
    }
  }
}
