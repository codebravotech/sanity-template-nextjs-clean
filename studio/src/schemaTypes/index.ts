import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import { contactForm } from './documents/contactForm'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {blockContentTextOnly} from './objects/blockContentTextOnly'
import button from './objects/button'
import { announcement } from './objects/announcement'
import { announcements } from './objects/announcements'
import { videoBlock } from './objects/videoBlock'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  contactForm,
  // Objects
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  link,
  button,
  announcements,
  announcement,
  videoBlock
]
