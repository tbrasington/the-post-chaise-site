import type { PageContent } from "@/sanity/types/guides";
import { MediaImage } from "../media/image";

function MediaGrid({ content }: { content: PageContent }) {
  const images = content?.gallery;
  const columns = content?.columns || 2;
  let col = `grid-cols-1`;
  if (columns === 2) col = `grid-cols-2`;
  if (columns === 3) col = `grid-cols-3`;
  if (columns === 4) col = `grid-cols-4`;
  if (!images) return null;
  return (
    <div className={`grid gap-4 ${col}`}>
      {images?.map((item) => {
        if (!item.mediaAsset) return null;
        return (
          <div key={item._key} className="relative">
            <MediaImage
              alt={item?.alt_text || ""}
              image={item.mediaAsset.Image}
              placeholder={item?.lqip}
              palette={item?.palette}
            />
          </div>
        );
      })}
      {content?.caption ? (
        <p className="mt-2 font-mono text-sm text-gray-400 dark:text-gray-500">
          {content.caption}
        </p>
      ) : null}
    </div>
  );
}

export default MediaGrid;
