import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import blockContent from './blockContent'
// First, we must import the schema creator
import gallery from './gallery'
import guide from './guide'
import country from './country'
import mediaAsset from './mediaAsset'
import page from './page'
import paper_materials from './paper_materials'
// Then import schema types from any plugins that might expose them
import site_meta from './meta'

 

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    country,
    blockContent,
    paper_materials,
    mediaAsset,
    gallery,
    page,
    guide,
    site_meta
  ]),
})
