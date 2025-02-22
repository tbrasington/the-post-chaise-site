"use client";
import Image from "next/image";
import { SanityDocument, SanityImageAssetDocument } from "next-sanity";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useId, useState } from "react";

type Props = {
  image: SanityDocument;
  alt: string;
  priority?: boolean;
  sizes?: string;
  placeholder?: string;
  clickEvent?: () => void;
  palette?: SanityImageAssetDocument["metadata"]["palette"];
};

export function MediaImage({
  image,
  priority,
  sizes = "(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw",
  alt = "",
  placeholder,
  palette,
}: Props) {
  const imageProps = useNextSanityImage(client, image, {
    imageBuilder: (returnUrl, options) =>
      returnUrl
        .fit("crop")
        .auto("format")
        .quality(80)
        .maxWidth(
          options.width || Math.min(options.originalImageDimensions.width),
        )
        .maxHeight(Math.min(options.originalImageDimensions.height))
        .crop("focalpoint"),
  });
  const bg = palette?.muted?.background || "#ccc";
  let aspectRatio = imageProps.width / imageProps.height;
  const [isExpanded, setIsExpanded] = useState(false);
  const layoutId = useId();
  return (
    <>
      <motion.div
        layout
        className={`relative h-auto w-full`}
        style={{
          aspectRatio: `${aspectRatio}`,
          backgroundColor: bg,
        }}
        layoutId={layoutId}
        onClick={() => setIsExpanded(true)}
      >
        <Image
          src={imageProps.src}
          style={{
            width: "100%",
            height: "100%",
            margin: 0,
            objectFit: "cover",
          }}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={placeholder ? "blur" : "empty"}
          blurDataURL={placeholder}
        />
      </motion.div>
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            className={`fixed inset-0 z-50 p-4  h-full w-full `}
            onClick={() => setIsExpanded(false)}
            style={{
              backgroundColor: bg,
              aspectRatio: `${aspectRatio}`,
            }}
          >
            <motion.div
              transition={{ duration: 0.5 }}
              layout
              layoutId={layoutId}
              className={`relative h-full w-full flex items-center justify-center`}
              style={{
                backgroundColor: bg,
                aspectRatio: `${aspectRatio}`,
              }}
            >
              <Image
                src={imageProps.src}
                style={{
                  width: "100%",
                  height: "100%",
                  margin: 0,
                  objectFit: "contain",
                }}
                alt={alt}
                fill
                sizes={"100vw"}
                priority={priority}
                placeholder={placeholder ? "blur" : "empty"}
                blurDataURL={placeholder}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
