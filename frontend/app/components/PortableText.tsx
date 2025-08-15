/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import cn from "classnames";
import ResolvedLink from "@/app/components/ResolvedLink";
import ResponsiveVideo from "./ResponsiveVideo";
import CoverImage from "./CoverImage";

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null;
        }

        return (
          <figure className="my-8">
            <CoverImage
              image={value}
              widthAsViewportPercentage={33}
              heightAsViewportPercentage={33}
              className="rounded-xl"
            />
          </figure>
        );
      },
      videoBlock: ({ value }) => {
        console.log("VIDEO BLOCK", {value});
        if (!value?.video?.playbackId) {
          return null;
        }
        const { autoPlay, muted, loop } = value.settings || {};

        return (
          <figure className="my-8">
            <ResponsiveVideo
              video={value.video}
              autoPlay={muted && autoPlay ? "muted" : false}
              muted={muted}
              loop={loop}
              maxWidthOfViewportAsPercentage={33}
              />
          </figure>
        );
      },
    },
    block: {
      h1: ({ children, value }) => (
        // Add an anchor to the h1
        <h1 className={cn("group relative", className)}>
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </a>
        </h1>
      ),
      h2: ({ children, value }) => {
        // Add an anchor to the h2
        return (
          <h2 className={cn("group relative", className)}>
            {children}
            <a
              href={`#${value?._key}`}
              className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </a>  
          </h2>
        );
      },
      h3: ({ children }) => {
        return <h3 className={cn("group relative", className)}>{children}</h3>;
      },
      h4: ({ children }) => {
        return <h4 className={cn("group relative", className)}>{children}</h4>;
      },
      h5: ({ children }) => {
        return <h5 className={cn("group relative", className)}>{children}</h5>;
      },
      h6: ({ children }) => {
        return <h6 className={cn("group relative", className)}>{children}</h6>;
      },
    },
    marks: {
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link} className={cn(className)}>{children}</ResolvedLink>;
      },
    },
  };

  return (
    <div className={cn("prose prose-a:text-brand", className)}>
      <PortableText components={components} value={value} />
    </div>
  );
}
