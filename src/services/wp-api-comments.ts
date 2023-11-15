import {
  Comment,
  commentSchema,
  commentPostDataType,
  CommentsPageType,
} from '../models';

type fetchCommentsParams = {
  postId: number;
  pageParam: number;
  signal: AbortSignal;
};

export const fetchCommentsByPostId = async ({
  postId,
  pageParam,
  signal,
}: fetchCommentsParams): Promise<CommentsPageType> => {
  const perPage = 5;
  const url = `https://www.jeanboyault.fr/wp-json/wp/v2/comments?post=${postId}&page=${pageParam}&per_page=${perPage}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error('An error occurred while fetching the comments');
  }

  const comments = await response.json();

  const commentsValidation = commentSchema.array().safeParse(comments);
  if (!commentsValidation.success) {
    throw new Error('An error occurred while validating the comments schema');
  }

  const data: CommentsPageType = {
    comments: commentsValidation.data,
  };

  if (commentsValidation.data.length === perPage) {
    data.next = pageParam + 1;
  }

  return data;
};

type postCommentParams = {
  postId: number;
  commentData: commentPostDataType;
};

export const postCommentOnPost = async ({
  postId,
  commentData,
}: postCommentParams): Promise<Comment> => {
  let url = `https://www.jeanboyault.fr/wp-json/wp/v2/comments?post=${postId}`;

  if (commentData.parent) {
    url += `&parent=${parent}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(commentData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('An error occurred while posting the comments');
  }

  const newComment = response.json();

  const commentValidation = commentSchema.safeParse(newComment);
  if (!commentValidation.success) {
    throw new Error('An error occurred while validating the comments schema');
  }

  return commentValidation.data;
};
