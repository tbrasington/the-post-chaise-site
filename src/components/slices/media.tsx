import type { PageContent } from "@/sanity/types/guides";
import { MediaImage } from "../media/image";

function Media({ content }: { content: PageContent }) {
  const image = content?.Image;
  if (!image) return null;
  return (
    <div className={`${content?.fullbleed ? "w-full" : "w-auto"}`}>
      <MediaImage
        alt={content?.alt_text || ""}
        image={image}
        placeholder={content?.lqip}
        palette={content?.palette}
        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw"
      />
      {content?.caption ? (
        <p className="mt-2 font-mono text-sm text-gray-400 dark:text-gray-500">
          {content.caption}
        </p>
      ) : null}
    </div>
  );
}

export default Media;
