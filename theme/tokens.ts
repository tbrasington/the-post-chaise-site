import { ThemeUICSSObject } from 'theme-ui'

export const ColorValues = {
  black: ['#111111'],
  blue: ['#0B0D1A', '#2B325F', '#2D41C3'],
  green: ['#3A484A'],
  orange: ['#DC4A1F'],
  grey: ['#4F4F4F', '#A5A1A1', '#EDEDED'],
  white: ['#ffffff'],
  yellow: ['#D4B05A'],
}

export const ColorTokens = {
  text: 'text',
  background: 'background',
  primary: 'primary',
  secondary: 'secondary',
  highlight: 'highlight',
  accent: 'accent',
  muted: 'muted',
  gray: 'gray',
  darken: 'darken',
}

export const LineHeights = {
  heading: 'heading',
  label: 'label',
  body: 'body',
}

export const FontWeights = {
  regular: 'regular',
  medium: 'medium',
  bold: 'bold',
}

export const TextStyles = {
  heading: 'heading',
  paragraph: 'paragraph',
  label: 'label',
}

export const FontSizes = {
  stepNegativeTwo: 'stepNegativeTwo',
  stepNegativeOne: 'stepNegativeTwo',
  stepZero: 'stepZero',
  stepOne: 'stepOne',
  stepTwo: 'stepTwo',
  stepThree: 'stepThree',
  stepFour: 'stepFour',
  stepFive: 'stepFive',
  stepSix: 'stepSix',
  stepSeven: 'stepSeven',
  stepEight: 'stepEight',
  stepNine: 'stepNine',
}

export const TextStyleNames = {
  page_title: 'page_title',
  sub_heading: 'sub_heading',
  statement: 'statement',
  paragraph: 'paragraph',
  paragraph_small: 'paragraph_small',
  caption: 'caption',
  label_standard: 'label_standard',
  label_upper: 'label_upper',
  action: 'action',
}

export const Shadows = {
  shadow01: 'shadow01',
}

export const typeScale = (step: number): string => {
  return Math.pow(1.2, step) + 'rem'
}

export const spaces = {
  0: 0,
  4: '0.25rem',
  8: '0.5rem',
  10: '0.625rem',
  12: '0.75rem',
  16: '1rem',
  20: '1.25rem',
  24: '1.5rem',
  32: '2rem',
  40: '2.5rem',
  44: '2.75rem',
  48: '3rem',
  52: '3.25rem',
  56: '3.5rem',
  64: '4rem',
  72: '4.5rem',
  80: '5rem',
  88: '5.5rem',
  96: '6rem',
  104: '6.5rem',
  112: '7rem',
  120: '7.5rem',
  128: '8rem',
}

export const StandardXAxisSpace = `calc((100vw * 0.08333) +  ${spaces[64]})`
export const StandardXPadding = [24, 64, 64, StandardXAxisSpace]

// helpers for screen readers via tailwind
export const ScreenReaderOnly: ThemeUICSSObject = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
}

export const NotScreenReaderOnly: ThemeUICSSObject = {
  position: 'static',
  width: 'auto',
  height: 'auto',
  padding: 0,
  margin: 0,
  overflow: 'visible',
  clip: 'auto',
  whiteSpace: 'normal',
}
