export default {
  name: 'gallery',
  title: "Gallery",
  type: 'array',
  of: [
    {
      name: "media",
      type: "object",
      fields: [
        {
          type: 'mediaAsset',
          name: "mediaAsset",
        },
        {
          name: "shopifyProduct",
          title: "Related product",
          type: "reference",
          to: { type: "shopifyProduct" }
        }
      ],
      preview: {
            select: {
              title: 'mediaAsset.caption',
              image: 'mediaAsset.Image'
            },
            prepare(selection) {
              const { title, image } = selection;
              return {
                title: title,
                media: image
              };
            },
          }
    }
  ],
  
}