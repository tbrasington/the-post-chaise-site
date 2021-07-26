import {
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook
} from "next-sanity"

import { SanityImageSource } from "@sanity/image-url/lib/types/types"

export const config = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: "2021-03-25", // use a UTC date string,
  fetch: fetch

  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
}

if (config.projectId.length === 0) {
  throw Error("The Project ID is not set. Check your environment variables.")
}
if (config.dataset.length === 0) {
  throw Error("The dataset name is not set. Check your environment variables.")
}

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source: SanityImageSource) =>
  createImageUrlBuilder(config).image(source)

// Set up the live preview subsscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {}
})

// props that let us flow next's ssg methods down to the components
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
