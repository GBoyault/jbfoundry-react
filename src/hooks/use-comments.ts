import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
} from '@tanstack/react-query';
import {
  fetchCommentsByPostId,
  postCommentOnPost,
  queryClient,
} from '../services';
import {
  Comment as CommentType,
  commentPostDataType,
  CommentsPageType,
} from '../models';
import { FIVE_MINUTS } from '../utils';

export const useComments = (postId: number) => {
  const {
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['comments', postId],
    queryFn: ({ signal, pageParam }) =>
      fetchCommentsByPostId({ postId, pageParam, signal }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next,
    staleTime: FIVE_MINUTS,
  });

  const { mutate } = useMutation({
    mutationFn: (comment: commentPostDataType) =>
      postCommentOnPost({ postId, commentData: comment }),
    onMutate: async (comment) => {
      const newComment: CommentType = {
        id: Date.now(),
        author: 0,
        author_name: comment.author_name,
        date: new Date().toISOString(),
        content: { rendered: comment.content },
        parent: comment.parent ? comment.parent : 0,
        notValidated: true,
      };

      await queryClient.cancelQueries({ queryKey: ['comments', { postId }] });

      const previousData = queryClient.getQueryData<
        InfiniteData<CommentsPageType> | undefined
      >(['comments', postId]);

      if (previousData) {
        const nextData = { ...previousData };
        nextData.pages[0].comments.unshift(newComment);
        queryClient.setQueryData(['comments', postId], { ...nextData });
      }

      return { previousData };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<InfiniteData<CommentsPageType> | undefined>(
          ['comments', postId],
          context.previousData
        );
      }
    },
    onSettled: () => {
      /**
       * No cache invalidating on purpose!
       *
       * A new wordpress comment is not automatically published, it must be validated by an administrator
       *
       * Calling 'queryClient.invalidateQueries' here would delete the new comment preview, removing the advantage of optimistic update
       */
      // queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  });

  const comments: CommentType[] = [];

  if (data) {
    for (const page of data.pages) {
      comments.push(...page.comments);
    }
  }

  return {
    comments,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    hasFetchedFirstPage: typeof data !== 'undefined',
    postNewComment: mutate,
  };
};
