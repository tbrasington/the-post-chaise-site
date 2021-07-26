// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
import { saneShopify } from '@sane-shopify/sanity-plugin'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

const saneShopifyTypes = saneShopify({
  product : {
    fields : [
      {
        name : 'materials',
        type : 'text'
      }
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
    ...saneShopifyTypes,
  ]),
})
