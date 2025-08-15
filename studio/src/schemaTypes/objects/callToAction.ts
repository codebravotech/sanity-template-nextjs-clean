import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon, ComposeIcon, EditIcon, ImageIcon, CogIcon} from '@sanity/icons'
import { defineVideoField } from 'sanity/media-library'
import videoPreviewImage from './VideoPreviewImage'

/**
 * Call to action schema object.  Objects are reusable schema structures document.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'object',
  icon: BulbOutlineIcon,
  groups: [
    {
      name: "contents",
      icon: ComposeIcon,
      default: true,
    },
    {
      name: "media",
      icon: ImageIcon,
    },
    {
      name: "button",
      icon: EditIcon
    },
    {
      name: "designSystem",
      icon: CogIcon,
    }
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: "contents",
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: "contents",
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      group: "contents",
    }),
    defineField({
      name: "button",
      type: "button",
      group: "button",
    }),
    defineField({
      name: "image",
      type: "image",
      description: "You can either provide an image or a video, but not both. To provide a video, clear this image field.",
      group: "media",
      options: {
        hotspot: true,
      },
      hidden: ({parent}) =>   {
        return !!parent?.videoBlock?.video
      },
    }),
    defineField({
      name: "videoBlock",
      type: 'videoBlock',
      title: 'Video',
      description: "You can either provide an image or a video, but not both. To provide an image, clear the video field.",
      // @ts-ignore
      group: "media",
      hidden: ({parent}) =>   {
        return !!parent?.image
      },
    }),
    defineField({
      name: "layout",
      type: "object",
      description: "The button of the call to action",
      fields: [
        defineField({
          name: "orientation",
          title: "Content Flow Direction",
          initialValue: "horizontal",
          description: "Does the CTA flow horizontally or vertically?",
          type: "string",
          options: {
            list: [
              "horizontal",
              "vertical",
            ],
            layout: "radio",
          },
        }),
        defineField({
          name: "contentAlignment",
          title: "Content Order",
          type: "string",
          initialValue: "textFirst",
          description: "In the chosen flow direction (horizontal or vertical), does body (rich text and embedded media) or main media (image or video) come first?",         
          options: {
            list: [
              {title: "Body then Main Media", value: "textFirst"},
              {title: "Main Media then Body", value: "mediaFirst"},    
            ],
            layout: "radio",
          },
        }),
      ],
      group: "designSystem",
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      image: 'image.asset',
      playbackId: 'videoBlock.video.asset.metadata.playbacks[0]._id',
      originalFilename: 'videoBlock.video.asset.originalFilename'
    },
    prepare(selection) {
      const {title, image, playbackId, originalFilename} = selection
      const posterUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg`


      return {
        title: title,
        subtitle: 'Call to Action',
        media: image ? image : playbackId ? videoPreviewImage({posterUrl, title, filename: originalFilename}) : undefined
      }
    },
  },
})
