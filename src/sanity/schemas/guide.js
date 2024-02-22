const guide = {
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
      title: "Country",
      name: "country",
      type: "reference",
      to: [{ type: "country" }],
    },
    {
      name: "date_of_guide",
      title: "Date of guide",
      type: "date",
    },
    {
      title: "Location",
      description: "e.g. 63.905, -22.2725",
      name: "location",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
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
      options: {
        hotspot: true,
      },
    },
    {
      type: "array",
      name: "page_content",
      title: "Page content",
      of: [
        {
          name: "paragraph",
          type: "object",
          title: "Paragraph",
          fields: [
            {
              name: "body",
              type: "blockContent",
              title: "Text",
            },
          ],
          preview: {
            select: {
              title: "body.0.children.0.text",
            },
            prepare(selection) {
              const { title } = selection;
              return {
                title: title,
              };
            },
          },
        },
        {
          name: "mediaGrid",
          type: "object",
          title: "Media Grid",
          fields: [
            {
              name: "columns",
              title: "Columns",
              type: "number",
              initialValue: 1,
            },
            {
              name: "gallery",
              title: "Gallery",
              type: "gallery",
            },
            {
              name: "caption",
              type: "text",
              title: "Caption",
            },
          ],
          preview: {
            select: {
              title: "gallery.0.mediaAsset.caption",
              image: "gallery.0.mediaAsset.Image",
            },
            prepare(selection) {
              const { title, image } = selection;
              return {
                title: `Media grid : ${title}`,
                media: image,
              };
            },
          },
        },
        {
          name: "gallery",
          type: "object",
          title: "Gallery",
          fields: [
            {
              name: "gallery",
              title: "Gallery",
              type: "gallery",
            },
          ],
          preview: {
            select: {
              title: "gallery.0.mediaAsset.caption",
              image: "gallery.0.mediaAsset.Image",
            },
            prepare(selection) {
              const { title, image } = selection;
              return {
                title: `Gallery : ${title}`,
                media: image,
              };
            },
          },
        },
        {
          name: "media",
          name: "Media",
          type: "mediaAsset",
        },
      ],
    },
  ],
};
export default guide;
