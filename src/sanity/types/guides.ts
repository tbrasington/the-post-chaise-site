import { SanityDocument, SanityImageAssetDocument } from "next-sanity";

import { SanityBlock } from "./shared";

export interface SanityGuide extends SanityDocument {
  page_content: PageContent[];
  short_description: SanityBlock[];
  seo_description?: string;
  hero_image?: SanityDocument;
  palette?: SanityImageAssetDocument["metadata"]["palette"];
  lqip?: string;
  slug: string;
  title: string;
  date_of_guide: string;
  country: string;
  location: string;
  related?: {
    future?: GuideIndexList[];
    past?: GuideIndexList[];
  };
}

export interface Slug {
  _type: string;
  current: string;
}

export interface PageContent {
  _key: string;
  _type: "paragraph" | "gallery" | "Media" | "mediaGrid";
  body?: SanityBlock[];
  gallery?: PageContentGallery[];
  Image?: SanityDocument;
  alt_text?: string;
  caption?: string;
  palette?: SanityImageAssetDocument["metadata"]["palette"];
  fullbleed?: boolean;
  columns?: number;
  lqip?: string;
}

export interface PageContentGallery {
  alt_text?: string;
  _key: string;
  _type: string;
  mediaAsset?: SanityDocument;
  palette?: SanityImageAssetDocument["metadata"]["palette"];
  lqip?: string;
}

export interface GuideIndexList {
  _id: string;
  title: string;
  slug: string;
  seo_description?: string;
  hero_image: SanityDocument;
  palette: SanityImageAssetDocument["metadata"]["palette"];
  date_of_guide: string;
  country?: string;
  location?: string;
}

export interface GuideRSSList {
  _id: string;
  title: string;
  slug: string;
  seo_description?: string;
  hero_image: SanityDocument;
  page_content: PageContent[];
  date_of_guide: string;
  country?: string;
  location?: string;
  short_description: SanityBlock[];
}

export interface remappedAllMediaProps {
  Image?: SanityDocument;
  palette?: SanityImageAssetDocument["metadata"]["palette"];
  alt_text?: string;
  _key: string;
  _type: string;
}
