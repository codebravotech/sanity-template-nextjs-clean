import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`;

const videoBlockFields = /* groq */  `
  "video": {
    "metadata": videoBlock.video.asset->metadata,
    "playbackId": videoBlock.video.asset->metadata.playbacks[0]._id,
    "aspectRatio": videoBlock.video.asset->metadata.aspectRatio,
    "originalFilename": videoBlock.video.asset->originalFilename,
    "duration": videoBlock.video.asset->metadata.duration,
    "assetId": videoBlock.video.asset->_id
  }
`

const videoFields = /* groq */ `
  "video": {
    "metadata": video.asset->metadata,
    "playbackId": video.asset->metadata.playbacks[0]._id,
    "aspectRatio": video.asset->metadata.aspectRatio,
    "originalFilename": video.asset->originalFilename,
    "duration": video.asset->metadata.duration,
    "assetId": video.asset->_id
  }
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`;

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "videoBlock" => {
        ...,
        ${videoFields} 
      },
      _type == "callToAction" => {
        ${linkFields},
        button {
          ...,
          ${linkFields}
        },
        ${videoBlockFields},
        body[]{
          ...,
          _type == "videoBlock" => {
            ...,
            ${videoFields} 
          }
        }
      },
      _type == "announcements" => {
        announcements[] {
          ...,
          button {
          ...,
          ${linkFields}
        }
        }
      },
      _type == "contactForm" => {
        ...,
      },
      _type == "infoSection" => {
        content[]{
          ...,
          ${videoFields},
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`);

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    ${videoFields},
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);
