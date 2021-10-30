import {
  FontSizes,
  FontWeights,
  LineHeights,
  TextStyleNames,
  TextStyles
} from "./tokens"

import { ThemeUICSSObject } from "@theme-ui/css"

export const PageTitle: ThemeUICSSObject = {
  fontFamily: TextStyles.heading,
  lineHeight: LineHeights.heading,
  fontWeight: FontWeights.regular,
  fontSize: FontSizes.stepOne
}

export const SubHeading: ThemeUICSSObject = {
  fontFamily: TextStyles.label,
  lineHeight: LineHeights.heading,
  fontWeight: FontWeights.regular,
  fontSize: FontSizes.stepNegativeOne,
  letterSpacing: "0.05rem",
  textTransform: "uppercase"
}

export const Statement: ThemeUICSSObject = {
  fontFamily: TextStyles.paragraph,
  lineHeight: LineHeights.body,
  fontWeight: FontWeights.regular,
  fontSize: FontSizes.stepOne
}

export const Paragraph: ThemeUICSSObject = {
  fontFamily: TextStyles.paragraph,
  lineHeight: LineHeights.body,
  fontWeight: FontWeights.regular,
  fontSize: FontSizes.stepZero
}

export const ParagraphSmall: ThemeUICSSObject = {
  fontFamily: TextStyles.paragraph,
  lineHeight: LineHeights.body,
  fontWeight: FontWeights.regular,
  fontSize: FontSizes.stepNegativeOne
}

export const Caption: ThemeUICSSObject = {
  fontFamily: TextStyles.paragraph,
  lineHeight: LineHeights.heading,
  fontWeight: FontWeights.regular,
  fontSize: FontSizes.stepNegativeOne,
  letterSpacing: "0.05rem"
}

export const LabelRegular: ThemeUICSSObject = {
  fontFamily: TextStyles.label,
  lineHeight: LineHeights.heading,
  fontWeight: FontWeights.regular,
  fontSize: FontSizes.stepNegativeOne
}

export const LabelUpperRegular: ThemeUICSSObject = {
  fontFamily: TextStyles.label,
  lineHeight: LineHeights.heading,
  fontWeight: FontWeights.regular,
  fontSize: FontSizes.stepNegativeOne,
  letterSpacing: "0.05rem",
  textTransform: "uppercase"
}
export const Action: ThemeUICSSObject = {
  fontFamily: TextStyles.label,
  lineHeight: "normal",
  letterSpacing: "0.05rem",
  fontWeight: FontWeights.bold,
  fontSize: FontSizes.stepZero
}

export const TextStyleVariants = {
  [TextStyleNames.page_title]: {
    ...PageTitle
  },
  [TextStyleNames.sub_heading]: {
    ...SubHeading
  },
  [TextStyleNames.statement]: {
    ...Statement
  },
  [TextStyleNames.paragraph]: {
    ...Paragraph
  },
  [TextStyleNames.paragraph_small]: {
    ...ParagraphSmall
  },
  [TextStyleNames.caption]: {
    ...Caption
  },
  [TextStyleNames.label_standard]: {
    ...LabelRegular
  },
  [TextStyleNames.label_upper]: {
    ...LabelUpperRegular
  },
  [TextStyleNames.action]: {
    ...Action
  }
}
