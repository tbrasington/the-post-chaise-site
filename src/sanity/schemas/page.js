const page = {
  name: "page",
  title: "Page",
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
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],
};
export default page;
