import { WPPost, Font } from "../models"

export const formatFontFromAPI = (post: WPPost): Font => {
  return {
    title: post.post_title,
    id: post.ID,
    slug: post.post_name,
    acf: post.acf,
  }
}
