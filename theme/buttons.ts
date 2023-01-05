import { ColorTokens, TextStyleNames } from "./tokens"

import { ThemeUICSSObject } from "theme-ui"

const ButtonSizeStandard: ThemeUICSSObject = {
  px: 16,
  py: 0,
  height: 40,
  borderRadius: 40,
  borderWidth: 0,
  variant: `text.${TextStyleNames.action}`
}

const ButtonSizeMini: ThemeUICSSObject = {
  px: 12,
  height: 32,
  py: 0,
  mt: 2,
  borderRadius: 32,
  borderWidth: 0,
  variant: `text.${TextStyleNames.label_upper}`,
  lineHeight: 0
}
export const ButtonBase: ThemeUICSSObject = {
  m: 0,
  display: "inline-flex",
  borderStyle: "solid",
  transition: "all 0.2s ease",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none"
}

export const ButtonNames = {
  primary: "primary",
  secondary: "secondary",
  mini: "mini",
  link: "link",
  controls: "controls",
  underline: "underline",
  underlineHighlight: "underlineHighlight"
}

export type ButtonTypes =
  | "primary"
  | "secondary"
  | "mini"
  | "link"
  | "controls"
  | "underline"
export const ButtonVariants = {
  primary: {
    ...ButtonBase,
    ...ButtonSizeStandard,
    bg: ColorTokens.primary,
    borderColor: ColorTokens.primary,
    color: ColorTokens.background,

    ":hover": {
      borderColor: ColorTokens.accent,
      bg: ColorTokens.accent
    },
    ":disabled": {
      cursor: "not-allowed",
      bg: ColorTokens.muted,
      borderColor: ColorTokens.muted
    }
  },
  secondary: {
    ...ButtonBase,
    ...ButtonSizeStandard,
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
  mini: {
    ...ButtonBase,
    ...ButtonSizeMini,
    bg: ColorTokens.primary,
    borderColor: ColorTokens.primary,
    color: ColorTokens.background,
    ":hover": {
      borderColor: ColorTokens.accent,
      bg: ColorTokens.accent
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
  underline: {
    cursor: "pointer",
    height: "auto",
    m: 0,
    p: 0,
    color: ColorTokens.primary,
    textUnderlineOffset: 4,
    variant: `text.${TextStyleNames.label_standard}`,
    ":hover": {
      color: ColorTokens.accent
    },
    ":active": {
      color: ColorTokens.accent
    }
  },
  underlineHighlight: {
    cursor: "pointer",
    height: "auto",
    m: 0,
    p: 0,
    color: ColorTokens.accent,
    textUnderlineOffset: 4,
    variant: `text.${TextStyleNames.label_standard}`,
    ":hover": {
      color: ColorTokens.accent
    },
    ":active": {
      color: ColorTokens.accent
    }
  },
  controls: {
    ...ButtonBase,
    ...ButtonSizeStandard,
    bg: ColorTokens.text,
    borderColor: ColorTokens.text,
    color: ColorTokens.background,
    ":hover": {
      borderColor: ColorTokens.accent,
      bg: ColorTokens.accent
    },
    ":disabled": {
      cursor: "not-allowed",
      bg: ColorTokens.muted,
      borderColor: ColorTokens.muted
    }
  }
}
