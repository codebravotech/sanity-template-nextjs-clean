import {defineField, defineType, ValidationContext} from 'sanity'
import {EnvelopeIcon  } from '@sanity/icons'
import { thumbnailMedia } from '../../../static/page-builder-thumbnails/thumbnailMedia'

export const contactForm = defineType({
  name: 'contactForm',
  title: 'Contact Form',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'body',
      type: 'blockContentTextOnly',
    }),
    defineField({
      name: 'successMessage',
      description: 'The message that will be displayed to the user after they submit the form.',
      type: 'blockContentTextOnly',
    }),
    defineField({
      name: 'requiredFields',
      title: 'Required Customer Information',
      description: 'The contact form fields that the user must fill out to submit the form.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'grid',
        list: [
          { title: 'First Name', value: 'first_name' },
          { title: 'Last Name', value: 'last_name' },
          { title: 'Email', value: 'email' },
          { title: 'Phone Number', value: 'phone' },
          { title: 'Company Name', value: 'company' },
        ],
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'optionalFields',
      title: 'Optional Customer Information',
      description: 'The contact form fields that the user can optionally fill out.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'grid',
        list: [
          { title: 'Phone Number', value: 'phone' },
          { title: 'Company Name', value: 'company' },
          { title: 'Message', value: 'message_text' },
        ],
      },
      validation: (Rule) => Rule.custom((optionalFields: string[] | undefined, context: ValidationContext) => {
        const parent = context.parent as {requiredFields: string[]}
        const requiredFields = parent?.requiredFields
        const duplicates = optionalFields?.filter((field: string) => requiredFields.includes(field)) || []
        
        if (duplicates.length > 0) {
          return `Cannot select the same field(s) as both required and optional: ${duplicates.join(', ')}`
        }
        
        return true
      })
    })
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title,
        subtitle: 'Contact Form',
        media: thumbnailMedia('../../../static/page-builder-thumbnails/contactForm.webp')
      }
    },
  },
})
