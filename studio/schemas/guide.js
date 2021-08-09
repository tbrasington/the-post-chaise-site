export default {
  name: "guide",
  title: "Guide",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
      {
      name: "seo_description",
      title: "SEO description / Summary",
      type: "text",
    },
    {
      name: "short_description",
      title: "Short description",
      type: "blockContent",
    },   
    {
      name: "hero_image",
      title: "Hero image",
      type: "image",
    },
    {
      type: 'array',
      name: 'page_content',
      title: 'Page content',
      of: [
        {
          name: 'paragraph',
          type: 'object',
          title: 'Paragraph',
          fields: [
            {
              name: 'body',
              type: 'blockContent',
              title: 'Text'
            }
          ],
          preview: {
            select: {
              title: 'body.0.children.0.text'
            },
            prepare(selection) {
              const { title } = selection;
              return {
                title: title
              };
            }
          }
        },
        {
          name: 'gallery',
          type: 'object',
          title: 'Gallery',
          fields: [
            {
              name: 'gallery',
              title: "Gallery",
              type: 'gallery'
            }
          ],
          preview: {
            select: {
              title: 'gallery.0.mediaAsset.caption',
              image: 'gallery.0.mediaAsset.Image'
            },
            prepare(selection) {
              const { title, image } = selection;
              return {
                title: `Gallery : ${title}`,
                media: image
              };
            },
          }
        },
        {
          name: 'media',
          name: "Media",
          type: 'mediaAsset',
        }
      ]
    }
  ],
};
