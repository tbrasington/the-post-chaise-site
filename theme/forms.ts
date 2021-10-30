import { ThemeUIStyleObject } from "@theme-ui/css"
import {
  Shadows,
  ColorTokens,
  FontSizes,
  TextStyleNames,
  TextStyles
} from "./tokens"

export const FormVariants: {
  label: ThemeUIStyleObject
  input: ThemeUIStyleObject
  select: ThemeUIStyleObject
  textarea: ThemeUIStyleObject
  checkbox: ThemeUIStyleObject
  radio: ThemeUIStyleObject
  slider: ThemeUIStyleObject
} = {
  label: {
    variant: `text.${TextStyleNames.label_standard}`
  },
  input: {
    fontFamily: TextStyles.paragraph,
    fontSize: FontSizes.stepOne,
    color: ColorTokens.text,
    bg: ColorTokens.background,
    borderColor: ColorTokens.muted,
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: 5,
    height: 64,
    m: 0,
    p: 0,
    px: 12,
    pt: 32,
    pb: 16,
    width: "100%",
    alignItems: "flex-start",
    appearance: "initial",
    ":focus": {
      borderColor: ColorTokens.gray,
      outline: "none",
      boxShadow: Shadows.shadow01
    }
  },
  select: {
    fontFamily: TextStyles.paragraph,
    fontSize: FontSizes.stepOne,
    color: ColorTokens.text,
    bg: ColorTokens.background,
    borderColor: ColorTokens.muted,
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: 5,
    height: 64,
    m: 0,
    p: 0,
    px: 12,
    pt: 28,
    width: "100%",
    alignItems: "flex-start",
    appearance: "initial",
    ":focus": {
      borderColor: ColorTokens.gray,
      outline: "none",
      boxShadow: Shadows.shadow01
    }
  },
  textarea: {},
  checkbox: {},
  radio: {},
  slider: {}
}
