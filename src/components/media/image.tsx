"use client";
import Image from "next/image";
import { SanityDocument, SanityImageAssetDocument } from "next-sanity";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";

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
  if (imageProps.width > imageProps.height) {
    aspectRatio = imageProps.height / imageProps.width;
  }

  return (
    <div
      className={`relative h-auto  w-full`}
      style={{
        aspectRatio: `${aspectRatio}`,
        backgroundColor: bg,
      }}
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
    </div>
  );
}
