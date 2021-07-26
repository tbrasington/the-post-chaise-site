import blockContent from './blockContent'
// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
import mediaAsset from './mediaAsset'
import paper_materials from './paper_materials'
import { saneShopify } from '@sane-shopify/sanity-plugin'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

const saneShopifyTypes = saneShopify({
  product: {
    fields: [
      {
        name : 'gallery',
        type : 'array',
        of :[
          {
            type : 'mediaAsset'
          }
        ]
      },
      {
        name: "paperMaterials",
        title: "Paper Materials",
        type: "array",
        of: [{ type: "reference", to: { type: "paper_materials" } }]
      },
    ]
  }
})

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    blockContent,
    paper_materials,
    mediaAsset,

    ...saneShopifyTypes,
  ]),
})
