"use client";
import Image from "next/image";
import { SanityDocument, SanityImageAssetDocument } from "next-sanity";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useId, useLayoutEffect, useState } from "react";
import { useScrollLock } from "usehooks-ts";

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
  const { lock, unlock } = useScrollLock({
    autoLock: false,
    lockTarget: "body",
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedDimensions, setExpandedDimensions] = useState({
    width: 0,
    height: 0,
  });

  const layoutId = useId();
  useLayoutEffect(() => {
    const calculateDimensions = () => {
      if (!isExpanded) return;

      // Get viewport dimensions (subtract padding)
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.9;

      let width, height;

      // If fitting to width
      const potentialHeight = maxWidth / aspectRatio;
      if (potentialHeight <= maxHeight) {
        width = maxWidth;
        height = potentialHeight;
      } else {
        // If fitting to height
        height = maxHeight;
        width = height * aspectRatio;
      }

      setExpandedDimensions({ width, height });
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);
    return () => window.removeEventListener("resize", calculateDimensions);
  }, [isExpanded, aspectRatio]);
  return (
    <>
      <motion.div
        layout
        className={`relative h-auto w-full `}
        style={{
          aspectRatio: `${aspectRatio}`,
          backgroundColor: bg,
        }}
        layoutId={layoutId}
        onClick={() => {
          lock();
          setIsExpanded(true);
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
          sizes={sizes}
          priority={priority}
          placeholder={placeholder ? "blur" : "empty"}
          blurDataURL={placeholder}
        />
      </motion.div>
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 p-4  h-full w-full flex items-center justify-center bg-black bg-opacity-95`}
            onClick={() => {
              setIsExpanded(false);
              unlock();
            }}
          >
            <motion.div
              layout
              layoutId={layoutId}
              className="relative h-[90vh] w-[90vw]"
              style={{
                aspectRatio: `${aspectRatio}`,
                width: expandedDimensions.width,
                height: expandedDimensions.height,
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
                priority={false}
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
