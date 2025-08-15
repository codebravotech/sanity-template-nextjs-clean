import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'button',
  type: 'object',
  description: 'The button of the call to action',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'page',
      title: 'Links to',
      type: 'reference',
      to: [{type: 'page'}],
    }),
  ],
})
