/** @jsxImportSource theme-ui */
import { ComponentMeta, ComponentStory } from "@storybook/react"

import { MediaImage, Zoom as Component } from "@components/common"
import React from "react"
import { SanityAsset } from "@sanityLib/types/image"

export default {
  title: "Components/Content/Zoom",
  component: Component,
  argTypes: {
    backgroundColor: { control: "color" }
  }
} as ComponentMeta<typeof Component>

const data = [
  {
    _key: "007f042c1277",
    _type: "media",
    mediaAsset: {
      Image: {
        _type: "image",
        asset: {
          _ref: "image-062edeae36f16e8aa4e30352c8cd2c7c0bddcc76-3000x4000-jpg",
          _type: "reference"
        }
      },
      _type: "mediaAsset",
      alt_text: "Lava pouring from the top of volcano"
    },
    palette: {
      _type: "sanity.imagePalette",
      darkMuted: {
        _type: "sanity.imagePaletteSwatch",
        background: "#34443c",
        foreground: "#fff",
        population: 0,
        title: "#fff"
      },
      darkVibrant: {
        _type: "sanity.imagePaletteSwatch",
        background: "#6d2925",
        foreground: "#fff",
        population: 5.03,
        title: "#fff"
      },
      dominant: {
        _type: "sanity.imagePaletteSwatch",
        background: "#acbaca",
        foreground: "#000",
        population: 8.74,
        title: "#fff"
      },
      lightMuted: {
        _type: "sanity.imagePaletteSwatch",
        background: "#acbaca",
        foreground: "#000",
        population: 8.74,
        title: "#fff"
      },
      lightVibrant: {
        _type: "sanity.imagePaletteSwatch",
        background: "#ef8e6e",
        foreground: "#000",
        population: 0.02,
        title: "#fff"
      },
      muted: {
        _type: "sanity.imagePaletteSwatch",
        background: "#ac5068",
        foreground: "#fff",
        population: 0,
        title: "#fff"
      },
      vibrant: {
        _type: "sanity.imagePaletteSwatch",
        background: "#ba4938",
        foreground: "#fff",
        population: 2.29,
        title: "#fff"
      }
    }
  },
  {
    _key: "949e45d14277",
    _type: "media",
    mediaAsset: {
      Image: {
        _type: "image",
        asset: {
          _ref: "image-a514bc53311cff3f9b3bf8ae3f4dbb8305e186f0-3000x4000-jpg",
          _type: "reference"
        }
      },
      _type: "mediaAsset",
      alt_text: "Lava pooling "
    },
    palette: {
      _type: "sanity.imagePalette",
      darkMuted: {
        _type: "sanity.imagePaletteSwatch",
        background: "#5d2e2e",
        foreground: "#fff",
        population: 1.29,
        title: "#fff"
      },
      darkVibrant: {
        _type: "sanity.imagePaletteSwatch",
        background: "#6c3e0a",
        foreground: "#fff",
        population: 0.01,
        title: "#fff"
      },
      dominant: {
        _type: "sanity.imagePaletteSwatch",
        background: "#5d2e2e",
        foreground: "#fff",
        population: 1.29,
        title: "#fff"
      },
      lightMuted: {
        _type: "sanity.imagePaletteSwatch",
        background: "#883e10",
        foreground: "#fff",
        population: 0,
        title: "#fff"
      },
      lightVibrant: {
        _type: "sanity.imagePaletteSwatch",
        background: "#ed9f6e",
        foreground: "#000",
        population: 0.09,
        title: "#fff"
      },
      muted: {
        _type: "sanity.imagePaletteSwatch",
        background: "#ac6059",
        foreground: "#fff",
        population: 0.61,
        title: "#fff"
      },
      vibrant: {
        _type: "sanity.imagePaletteSwatch",
        background: "#d4441c",
        foreground: "#fff",
        population: 0,
        title: "#fff"
      }
    }
  }
]

// const remappedImage: SanityAsset = {
//   //@ts-ignore
//   Image: data[0].mediaAsset.Image,
//   alt_text: data[0].mediaAsset.alt_text,
//   palette: data[0].palette,
//   _key: data[0]._key,
//   _type: data[0]._type
// }
// <MediaImage
//       key={remappedImage._key}
//       fit="contain"
//       sanityImage={remappedImage}
//     />
const Template: ComponentStory<typeof Component> = args => (
  <Component {...args}></Component>
)

export const Zoom = Template.bind({})
Zoom.args = { slides: data, initialIndex: 0 }
