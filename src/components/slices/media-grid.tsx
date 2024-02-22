import type { PageContent } from "@/sanity/types/guides";
import { MediaImage } from "../media/image";

function MediaGrid({ content }: { content: PageContent }) {
  const images = content?.gallery;
  const columns = content?.columns || 2;
  const col = `grid-cols-${columns}`;
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
