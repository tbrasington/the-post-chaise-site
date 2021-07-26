export default {
  name: 'mediaAsset',
  title: 'Media Asset',
  type: 'object',
  fields: [
    {
      name: 'Image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'alt_text',
      title: 'Alt Text',
      type: 'string',
    },
    {
      name: 'caption',
      type: 'text',
      title: 'Caption'
    }
  ],
}
