import {defineField, defineType} from 'sanity'
import {MicrophoneIcon} from '@sanity/icons'
import { snakeCaseToTitleCase } from '../../../../shared/utils/text'

export const announcement = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'object',
  groups: [
    {
      name: 'contents',
      title: 'Contents',
      default: true,
    },
    {
      name: 'image',
      title: 'Image',
    },
    {
      name: 'button',
      title: 'Button',
    },
    {
      name: 'designSystem',
      title: 'Design System',
    },
  ],
  icon: MicrophoneIcon,
  fields: [
    defineField({
      name: 'category',
      type: 'string',
      initialValue: 'press_release',
      options: {
        list: [{title: 'Press Releases', value: 'press_releases'}, {title: 'Events', value: 'events'}, {title: 'Stories', value: 'stories'}],
      },
      group: 'contents',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'contents',
    }),
    defineField({
      name: 'summary',
      title: 'Summary', 
      type: 'text',
      group: 'contents',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
      group: 'button',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'date',
      description: 'The date of the announcement.',
      type: 'date',
      group: 'contents',
    }),

  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      image: 'image.asset',
    },
    prepare(selection) {
      const {title, category, image} = selection
      return {
        title: title,
        subtitle: snakeCaseToTitleCase(category),
        media: image,
      }
    },
  }

})
