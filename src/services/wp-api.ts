import { QueryClient } from '@tanstack/react-query';
import {
  wpPostSchema,
  Font,
  contactPageSchema,
  ContactPage,
  Comment,
  commentSchema,
  commentPostDataType,
  CommentsPageType
} from '../models';
import { ONE_HOUR, formatFontFromAPI } from '../utils';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_HOUR
    }
  }
});

type fetchPostsParams = {
  signal: AbortSignal
}

export const fetchPosts = async ({ signal }: fetchPostsParams): Promise<Font[]> => {
  const url = 'https://www.jeanboyault.fr/wp-json/fonts/v1/post';

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the fonts')
    throw error;
  }

  const posts = await response.json();

  const postsValidation = wpPostSchema.array().safeParse(posts)

  if (!postsValidation.success) {
    const error = new Error('An error occurred while validating the fonts schema')
    throw error;
  }

  return postsValidation.data.map(post => formatFontFromAPI(post))
}


type fetchPostParams = {
  slug?: string,
  signal: AbortSignal
}

export const fetchPostBySlug = async ({ slug, signal }: fetchPostParams): Promise<Font | null> => {
  const url = `https://www.jeanboyault.fr/wp-json/fonts/v1/post/${slug}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the font')
    throw error;
  }

  const post = await response.json();

  const postsValidation = wpPostSchema.safeParse(post)
  if (!postsValidation.success) {
    const error = new Error('An error occurred while validating the font schema')
    throw error;
  }

  return formatFontFromAPI(postsValidation.data)
}


type fetchPageContactParams = {
  signal: AbortSignal
}

export const fetchPageContact = async ({ signal }: fetchPageContactParams): Promise<ContactPage> => {
  const url = 'https://jeanboyault.fr/wp-json/wp/v2/pages?slug=contact';

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the page')
    throw error;
  }

  const page = await response.json();
  const contactPageValidation = contactPageSchema.safeParse(page[0])

  if (!contactPageValidation.success) {
    const error = new Error('An error occurred while validating the contact page schema')
    throw error;
  }

  return {
    presentation: contactPageValidation.data.acf.contact_presentation,
    phone: contactPageValidation.data.acf.contact_phone,
    email: contactPageValidation.data.acf.contact_email,
  }
}


type fetchCommentsParams = {
  postId: number,
  pageParam: number,
  signal: AbortSignal
}

export const fetchCommentsByPostId = async (
  { postId, pageParam, signal }: fetchCommentsParams
): Promise<CommentsPageType> => {
  const perPage = 5
  const url = `https://www.jeanboyault.fr/wp-json/wp/v2/comments?post=${postId}&page=${pageParam}&per_page=${perPage}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the comments')
    throw error;
  }

  const comments = await response.json();

  const commentsValidation = commentSchema.array().safeParse(comments)
  if (!commentsValidation.success) {
    const error = new Error('An error occurred while validating the comments schema')
    throw error;
  }

  const data: CommentsPageType = {
    comments: commentsValidation.data
  }

  if (commentsValidation.data.length === perPage) {
    data.next = pageParam + 1
  }

  return data
}


type postCommentParams = {
  postId: number,
  commentData: commentPostDataType
}

export const postCommentOnPost = async ({ postId, commentData }: postCommentParams): Promise<Comment> => {
  let url = `https://www.jeanboyault.fr/wp-json/wp/v2/comments?post=${postId}`

  if (commentData.parent) {
    url += `&parent=${parent}`
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(commentData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while posting the comments')
    throw error;
  }

  const newComment = response.json()

  const commentValidation = commentSchema.safeParse(newComment)
  if (!commentValidation.success) {
    const error = new Error('An error occurred while validating the comments schema')
    throw error;
  }

  return commentValidation.data
}