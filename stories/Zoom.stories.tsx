/** @jsxImportSource theme-ui */
import { ComponentMeta, ComponentStory } from "@storybook/react"

import { Zoom as Component } from "@components/common"

export default {
  title: "Components/Content/Zoom",
  component: Component,
  argTypes: {
    backgroundColor: { control: "color" }
  }
} as ComponentMeta<typeof Component>

const data = [
  {
    mediaAsset: {
      Image: {
        _type: "image",
        asset: {
          _ref: "image-8f7a818ef059a449f0655c68aa93baaf436bbfda-4000x2250-jpg",
          _type: "reference"
        }
      }
    },
    _key: "7b41ec1faae6",
    _type: "Media",
    alt_text: "A speed boat flies past making the fishing boat look still",
    country: null,
    gallery: null,
    palette: {
      _type: "sanity.imagePalette",
      darkMuted: {
        _type: "sanity.imagePaletteSwatch",
        background: "#3c464e",
        foreground: "#fff",
        population: 0.01,
        title: "#fff"
      },
      darkVibrant: {
        _type: "sanity.imagePaletteSwatch",
        background: "#27485d",
        foreground: "#fff",
        population: 0,
        title: "#fff"
      },
      dominant: {
        _type: "sanity.imagePaletteSwatch",
        background: "#acc3cc",
        foreground: "#000",
        population: 12.57,
        title: "#fff"
      },
      lightMuted: {
        _type: "sanity.imagePaletteSwatch",
        background: "#acc3cc",
        foreground: "#000",
        population: 12.57,
        title: "#fff"
      },
      lightVibrant: {
        _type: "sanity.imagePaletteSwatch",
        background: "#81abc4",
        foreground: "#000",
        population: 5.87,
        title: "#fff"
      },
      muted: {
        _type: "sanity.imagePaletteSwatch",
        background: "#748084",
        foreground: "#fff",
        population: 0.02,
        title: "#fff"
      },
      vibrant: {
        _type: "sanity.imagePaletteSwatch",
        background: "#74a6c4",
        foreground: "#000",
        population: 0.11,
        title: "#fff"
      }
    },
    slug: null
  },
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

const Template: ComponentStory<typeof Component> = args => (
  <Component {...args}></Component>
)

export const Zoom = Template.bind({})
Zoom.args = { slides: data, initialIndex: "" }
