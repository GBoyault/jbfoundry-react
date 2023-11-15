import { useRef, useState } from "react"
import { InfiniteData, useInfiniteQuery, useMutation } from "@tanstack/react-query"
import { fetchCommentsByPostId, postCommentOnPost, queryClient } from "../../../services/wp-api"
import { CommentList, CommentForm } from ".."
import { Comment as CommentType, commentPostDataType, CommentsPageType } from "../../../models"
import { FIVE_MINUTS } from "../../../utils"
import classes from './Comments.module.css'

type CommentsPropsType = {
  postId: number
}

export const Comments = ({ postId }: CommentsPropsType) => {
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [replyTo, setReplyTo] = useState<CommentType | null>(null)

  const {
    data, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['comments', postId],
    queryFn: ({ signal, pageParam }) => fetchCommentsByPostId({ postId, pageParam, signal }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next,
    staleTime: FIVE_MINUTS
  })

  const { mutate } = useMutation({
    mutationFn: (comment: commentPostDataType) => postCommentOnPost({ postId, commentData: comment }),
    onMutate: async (comment) => {
      const newComment: CommentType = {
        id: Date.now(),
        author: 0,
        author_name: comment.author_name,
        date: new Date().toISOString(),
        content: { rendered: comment.content },
        parent: comment.parent ? comment.parent : 0,
        notValidated: true
      }

      await queryClient.cancelQueries({ queryKey: ['comments', { postId }] })

      const previousData = queryClient.getQueryData<InfiniteData<CommentsPageType> | undefined>(['comments', postId])

      if (previousData) {
        const nextData = { ...previousData }
        nextData.pages[0].comments.unshift(newComment)
        queryClient.setQueryData(['comments', postId], { ...nextData })
      }

      return { previousData }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<InfiniteData<CommentsPageType> | undefined>(['comments', postId], context.previousData)
      }
    },
    onSettled: () => {
      /**
       * Volontairement pas d'invalidation du cache !
       * Un commentaire WP n'est pas publié automatiquement à l'envoi, il doit être validé par un modérateur
       * 
       * queryClient.invalidateQueries masquerait l'aperçu du nouveau commentaire et annulerait l'intérêt de l'optimistic update
       */
      // queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    }
  })


  const fetchMoreHandler = async () => {
    await fetchNextPage()
    setTimeout(() => {
      loadMoreButtonRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 200)
  }

  const replyHandler = (comment: CommentType) => {
    setReplyTo(comment)
    formRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const cancelReplyHandler = () => {
    setReplyTo(null)
  }

  const submitCommentHandler = (commentData: commentPostDataType) => {
    mutate(commentData)
    setReplyTo(null)
  }

  let content = <p>Loading comments...</p>;

  if (isError) {
    content = (
      <p>Erreur : {error.message}</p>
    )
  }

  if (data) {
    const comments: CommentType[] = []

    for (const page of data.pages) {
      comments.push(...page.comments)
    }

    content = (
      <>
        <CommentList
          comments={comments}
          onReply={replyHandler}
        />
        {hasNextPage && (
          <button
            ref={loadMoreButtonRef}
            className={classes['more-button']}
            onClick={fetchMoreHandler}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Chargement...'
              : 'Charger plus'
            }
          </button>
        )}
        <CommentForm
          ref={formRef}
          replyTo={replyTo}
          onSubmit={submitCommentHandler}
          onCancelReply={cancelReplyHandler}
        />
      </>
    )
  }

  return (
    <div className={classes.comments}>
      {content}
    </div>
  )
}