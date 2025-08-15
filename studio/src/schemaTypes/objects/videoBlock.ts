import {defineType, defineField} from 'sanity'
import {defineVideoField} from 'sanity/media-library'

import {VideoIcon} from '@sanity/icons'
import videoPreviewImage from './VideoPreviewImage'

export const videoBlock = defineType({
  name: 'videoBlock',
  type: 'object',
  icon: VideoIcon,
  fields: [
    defineVideoField({
      name: 'video'
    }),
    defineField({
      name: 'settings',
      type: 'object',
      options: {
        collapsible: true,
        columns: 2
      },
      fields: [
        defineField({
          name: 'loop',
          type: 'boolean',
          initialValue: false
        }),
        defineField({
          name: 'muted',
          type: 'boolean',
          initialValue: false
        }),
        defineField({
          name: 'autoPlay',
          type: 'boolean',
          initialValue: true,
          description: 'Autoplay is allowed when the video is muted',
          hidden: ({parent}) => !parent?.muted
        }),
        defineField({
          name: 'title',
          type: 'string',
        }),
      ]
    }),
  ],
  preview: {
    select: {
      title: 'settings.title',
      playbackId: 'video.asset.metadata.playbacks[0]._id',
      originalFilename: 'video.asset.originalFilename'
    },
    prepare(selection) {
      const { title, playbackId, originalFilename} = selection
      const posterUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg`

      return {
        title,
        subtitle: 'Video Block',
        media: videoPreviewImage({posterUrl, title, filename: originalFilename})
      }
    },
  },
})
