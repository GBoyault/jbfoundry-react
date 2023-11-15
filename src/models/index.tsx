import { z } from "zod"

export const hasURL = z.object({
  url: z.string().url()
});

export const fontPdfSchema = z.object({
  font_pdf_title: z.string(),
  font_pdf_file: hasURL
})

export const emailSchema = z.string().email()
export type email = z.infer<typeof emailSchema>

export const fontImageSchema = z.object({
  font_image_left: hasURL.or(z.boolean()),
  font_image_right: hasURL.or(z.boolean()),
});

export type FontImage = z.infer<typeof fontImageSchema>


export const fontACFSchema = z.object({
  font_details: z.string(),
  font_main_image: z.string().url(),
  font_presentation: z.string(),
  link_myfonts: z.string(),
  font_download: hasURL.or(z.boolean()),
  font_pdf_repeater: fontPdfSchema.array().or(z.boolean()),
  font_images_repeater: fontImageSchema.array()
})

export type FontACF = z.infer<typeof fontACFSchema>

const contactPageACFSchema = z.object({
  contact_presentation: z.string(),
  contact_phone: z.string(),
  contact_email: z.string(),
})

export const contactPageSchema = z.object({
  acf: contactPageACFSchema,
})

export interface ContactPage {
  presentation: string,
  phone: string,
  email: string,
}

export const wpPostSchema = z.object({
  ID: z.number(),
  acf: fontACFSchema,
  post_name: z.string(),
  post_title: z.string()
})

export type WPPost = z.infer<typeof wpPostSchema>

export interface Font {
  title: string
  id: number,
  slug: string,
  acf: FontACF,
}

const contentSchema = z.object({
  rendered: z.string()
})

export const commentSchema = z.object({
  id: z.number(),
  parent: z.number(),
  author: z.number(),
  author_name: z.string(),
  date: z.string(),
  content: contentSchema,
  depth: z.number().optional(),
  notValidated: z.boolean().optional()
})

export type Comment = z.infer<typeof commentSchema>

export type LinkType = {
  title: string,
  target?: '_self' | '_blank',
  url: string
}


export type InputState = {
  value: string
  isTouched: boolean
}

export type InputAction = {
  type: 'INPUT'
  value: string
} | {
  type: 'BLUR'
} | {
  type: 'RESET'
}

export type InputValidateValueFunction = (value: string) => boolean



export type CommentsPageType = {
  comments: Comment[],
  next?: number
}

export type commentPostDataType = {
  author_email: email,
  author_name: string,
  parent?: number,
  content: string,
  depth?: number
}
