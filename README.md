# Shopify docs

## payment
https://help.shopify.com/en/partners/dashboard/managing-stores/test-orders-in-dev-stores#testing-using-shopify-payments-test-mode


*[_type in [ "sanity.imageAsset"]][0...5] {
  _id,
  assetId
}

*[_type in [ "sanity.imageAsset"] | order(_createdAt desc)][0...5] {
  _id,
  _createdAt,
  assetId,
  "guide" : *[_type == "guide" && ^._id == page_content[].Image.asset._ref ||  ^._id == page_content[].gallery[].mediaAsset.Image.asset._ref]{
title
}
}

*[_type == "guide" &&  slug.current =='rock-2020']{
 page_content[] { ..., Image { asset-> }}
}[0]

image-cf5f73a6bf7d6d38b8a482d32e08456a766fd2ae-4000x2667-jpg"
