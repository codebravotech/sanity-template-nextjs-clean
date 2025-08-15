import {defineField, defineType} from 'sanity'
import {MicrophoneIcon} from '@sanity/icons'
import {thumbnailMedia} from '../../../static/page-builder-thumbnails/thumbnailMedia'

export const announcements = defineType({
  name: 'announcements',
  type: 'object',
  icon: MicrophoneIcon,
  fields: [
    defineField({name: 'heading', type: 'string'}),
    defineField({name: 'announcements', type: 'array', of: [{type: 'announcement'}]})],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({heading}) {
      return {
        title: heading,
        subtitle: 'Announcements List',
        media: thumbnailMedia('../../../static/page-builder-thumbnails/announcements.webp')
      }
    }
  },
})
