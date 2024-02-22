import { type SchemaTypeDefinition } from "sanity";
import blockContent from "./schemas/blockContent";
import country from "./schemas/country";
import gallery from "./schemas/gallery";
import guide from "./schemas/guide";
import mediaAsset from "./schemas/mediaAsset";
import meta from "./schemas/meta";
import page from "./schemas/page";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, country, gallery, guide, mediaAsset, meta, page],
};
