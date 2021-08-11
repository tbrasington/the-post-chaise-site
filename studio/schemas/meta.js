export default {
  name: "site_metadata",
  title: "Meta & Navigation",
  type: "document",
  fields: [
    {
      name: "site_title",
      title: "Site title",
      type: "string",
    },
    {
      name: "site_description",
      title: "Site description",
      type: "text",
    },
    {
      title: "Menu > Pages",
      name: "menu_pages",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "page", type: "reference", title: "Page",  to: [{type: 'page'}] },
          ],
        },
      ],
    },
     {
      title: "Menu > Guides",
      name: "menu_guides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "page", type: "reference", title: "Page",  to: [{type: 'guide'}] },
          ],
        },
      ],
    },
    {
      title: "Footer External",
      name: "footer_menu_external",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "path", type: "string", title: "Path" },
          ],
        },
      ],
    },
    {
      title: "Footer Internal",
      name: "footer_internal",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "page", type: "reference", title: "Page",  to: [{type: 'page'}] },
          ],
        },
      ],
    },
  ],
};
