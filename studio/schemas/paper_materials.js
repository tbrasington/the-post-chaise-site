export default {
  name: 'paper_materials',
  title: 'Paper Materials',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'body',
      type: 'blockContent',
      title: 'Text'
    }
  ],
}
