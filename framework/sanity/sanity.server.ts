import { config } from "./sanity"
// lib/sanity.server.js
import { createClient } from "next-sanity"

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_STUDIO_API_TOKEN
})

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview: boolean) =>
  usePreview ? previewClient : sanityClient
