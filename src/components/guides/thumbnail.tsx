"use client";
import Link from "next/link";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";
import { SanityGuide } from "@/sanity/types/guides";
import { useCardClick } from "@/utils/hooks/useCardClick";
import NextImage from "next/image";
import { useEffect, useState } from "react";

type Props = Pick<SanityGuide, "title" | "hero_image" | "slug" | "lqip"> & {
  bg: string;
  bgDark: string;
};

export function GuideThumbnail({
  hero_image,
  title,
  slug,
  lqip,
  bg,
  bgDark,
}: Props) {
  const imageProps = useNextSanityImage(client, hero_image || null, {
    imageBuilder: (returnUrl) =>
      returnUrl.fit("crop").auto("format").quality(70).width(800).height(600),
  });
  const url = `/stories-and-guides/${slug}`;

  const click = useCardClick(url);

  // colors for thumb
  const [bgEffect, setBg] = useState(bg);
  useEffect(() => {
    const isBrowser = typeof window !== "undefined" && window.matchMedia;
    if (isBrowser) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      if (mediaQuery) {
        setBg(mediaQuery.matches ? bgDark : bg);
        mediaQuery.addEventListener("change", (e) => {
          setBg(e.matches ? bgDark : bg);
        });
      }
    }
    return () => {
      if (isBrowser) {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        if (mediaQuery) {
          mediaQuery.removeEventListener("change", () => {});
        }
      }
    };
  }, [bg, bgDark]);

  // kill if no image
  if (imageProps === null) return null;

  return (
    <div
      className="group flex cursor-pointer flex-col gap-2"
      onMouseDown={click.onMouseDown}
      onMouseUp={click.onMouseUp}
    >
      <div
        className={`aspect-4/3 relative overflow-hidden`}
        style={{
          backgroundColor: bgEffect,
        }}
      >
        <NextImage
          src={imageProps.src}
          fill
          style={{ width: "100%", margin: 0 }}
          alt={""}
          sizes={"(max-width : 600px) 80vw, 15vw"}
          priority={false}
          placeholder={lqip ? "blur" : "empty"}
          blurDataURL={lqip}
          className="duration-400 transition-opacity group-hover:opacity-40"
        />
      </div>
      <p className="m-0 text-sm">
        <Link
          className="transition-duration-400 underline decoration-stone-100 underline-offset-4 transition-all group-hover:underline group-hover:decoration-stone-500 dark:decoration-stone-800"
          href={url}
        >
          {title}
        </Link>
      </p>
    </div>
  );
}
