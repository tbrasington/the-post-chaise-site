// ./components/Post.tsx

import { PortableText } from "@portabletext/react";
import type { SanityGuide } from "@/sanity/types/guides";
import SliceRenderer from "../slices/slice-renderer";
import { myPortableTextComponents } from "../portable-components";
import DmsCoordinates from "dms-conversion";
import { GuideThumbnail } from "./thumbnail";

export default function Guide({ guide }: { guide: SanityGuide }) {
  const {
    title,
    location,
    date_of_guide,
    short_description,
    page_content,
    related,
  } = guide;

  const formatted_date = new Date(date_of_guide).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  /// coords
  const LocationData = location ? location.split(",") : ["0", "0"];
  const l = Number(LocationData[0].trim());
  const la = Number(LocationData[0].trim());
  const DMSCoordinates = new DmsCoordinates(l, la);

  const { longitude, latitude } = DMSCoordinates.dmsArrays;
  const [dlo, mlo, slo, nsewlo] = longitude;
  const [dla, mla, sla, nsewla] = latitude;

  const west = `${dlo}° ${mlo}′ ${Math.round(slo)}″ ${nsewlo} `;
  const north = `${dla}° ${mla}′ ${Math.round(sla)}″ ${nsewla}`;

  let further = related?.future?.concat(related.past || []);
  return (
    <main className="prose prose-stone dark:prose-invert prose-base container mx-auto px-6 py-11">
      <h1 className="m-0 text-sm font-medium antialiased">{title}</h1>
      <p className="m-0 mt-1 text-xs  antialiased">{formatted_date}</p>

      <p className="m-0 mt-4 text-xs  antialiased">{`${north}, ${west}`}</p>

      <div className="prose prose-sm prose-stone dark:prose-invert mt-10">
        {short_description ? (
          <PortableText
            value={short_description}
            components={myPortableTextComponents}
          />
        ) : null}
      </div>
      <section className="space-y-4">
        {page_content.map((block) => {
          return <SliceRenderer key={block._key} block={block} />;
        })}
      </section>
      <section className="mt-20">
        <h3 className="text-sm font-medium">Further</h3>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {further?.map((item) => {
            return (
              <GuideThumbnail
                bg={item.palette?.vibrant?.background || "#ccc"}
                slug={item.slug}
                key={`further-${item.slug}`}
                hero_image={item.hero_image}
                title={item.title}
                bgDark={item.palette?.darkVibrant?.background || "#000"}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
