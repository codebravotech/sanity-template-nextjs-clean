import ResolvedLink from "./ResolvedLink";
import CoverImage from "./CoverImage";
import { snakeCaseToTitleCase } from "../../../shared/utils/text";
import { ExtractPageBuilderType } from "@/sanity/lib/types";
import {createDataAttribute} from '@sanity/visual-editing'

type AnnouncementsProps = {
  block: ExtractPageBuilderType<"announcements">;
  index: number;
  pageId: string;
  pageType: string;
};

export default function Announcements({ block, pageId, pageType }: AnnouncementsProps) {
  const { heading, announcements } = block;

  return (
    <div className="py-10 px-2">
      {heading && (
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block ml-6 w-1.5 h-8 bg-[#f50] rounded-full"></span>
          {
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              {heading}
            </h2>
          }
        </div>
      )}
      <div 
        className="flex flex-row justify-start px-12 items-start gap-10"
        data-sanity={createDataAttribute({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${block._key}"].announcements`,
        }).toString()}
      >
        {announcements?.map((announcement) => {
          const { category, title, summary, button, image, date } =
            announcement;

          return (
            <div
              key={announcement._key}
              className="flex flex-col items-start my-4 gap-2 flex-shrink-0"
              data-sanity={createDataAttribute({
                id: pageId,
                type: pageType,
                path: `pageBuilder[_key=="${block._key}"].announcements[_key=="${announcement._key}"]`,
              }).toString()}
            >
              {image && (
                <CoverImage
                  image={image}
                  widthAsPixels={160}
                  heightAsPixels={160}
                  className="rounded-xl"
                />
              )}
              <div className="bg-[#f50] text-white text-xs px-3 py-1 rounded-md grow-0">
                {snakeCaseToTitleCase(category || "")}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(date || new Date()).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-lg font-bold">{title}</div>
              <div className="text-xs">{summary}</div>
              <ResolvedLink
                link={button?.link}
                className="text-[#f50] underline text-sm"
              >
                {button?.buttonText}
              </ResolvedLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}
