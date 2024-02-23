// ./components/Posts.tsx

import { SanityGuide, GuideIndexList } from "@/sanity/types/guides";
import { GuideThumbnail } from "./thumbnail";

export default function Guides({ guides }: { guides: SanityGuide[] }) {
  const dates = guides.map((item) => item.date_of_guide.split("-")[0]);
  const uniqeYears = [...new Set(dates)];
  const groupedGuidesByYear: Array<{ year: string; items: SanityGuide[] }> =
    uniqeYears.map((el) => {
      return {
        year: el,
        items: guides.filter((item) => item.date_of_guide.split("-")[0] === el),
      };
    });

  return (
    <main className="grid-cols-auto container mx-auto grid snap-proximity gap-8 px-6 py-11">
      <p>A photographic archive by tbrasington.</p>

      {groupedGuidesByYear.map((year) => {
        return (
          <div
            key={`year-${year.year}`}
            className="flex flex-col gap-4 sm:flex-row sm:gap-8"
          >
            <h2 className="font-mono text-sm text-stone-600 dark:text-stone-500">
              {year.year}
            </h2>

            <div className="grid-cols grid flex-1 snap-center gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
              {year.items.map((guide) => {
                return (
                  <GuideThumbnail
                    key={guide._id}
                    title={guide.title}
                    slug={guide.slug}
                    hero_image={guide.hero_image}
                    lqip={guide.lqip}
                    bg={guide.palette?.vibrant?.background || "inherit"}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </main>
  );
}
