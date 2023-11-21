import { useRef, useState } from 'react';
import { Comment as CommentType, commentPostDataType } from '../../../models';
import { CommentList, CommentForm, CommentLoader } from '..';
import { useComments } from '../../../hooks/use-comments';

import classes from './Comments.module.css';

type CommentsPropsType = {
  postId: number;
};

export const Comments = ({ postId }: CommentsPropsType) => {
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [replyTo, setReplyTo] = useState<CommentType | null>(null);

  const {
    comments,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    hasFetchedFirstPage,
    postNewComment,
  } = useComments(postId);

  const fetchMoreHandler = async () => {
    await fetchNextPage();
    setTimeout(() => {
      loadMoreButtonRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const replyHandler = (comment: CommentType) => {
    setReplyTo(comment);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const cancelReplyHandler = () => {
    setReplyTo(null);
  };

  const submitCommentHandler = (commentData: commentPostDataType) => {
    postNewComment(commentData);
    setReplyTo(null);
  };

  let content = <CommentLoader />;

  if (isError && error) {
    content = <p>Erreur : {error.message}</p>;
  }

  if (hasFetchedFirstPage) {
    content = (
      <>
        {comments.length > 0 ? (
          <CommentList comments={comments} onReply={replyHandler} />
        ) : (
          <p style={{ textAlign: 'center' }}>
            Aucun commentaire sur cette police, soyez le premier à en écrire un
            !
          </p>
        )}
        {hasNextPage && (
          <button
            ref={loadMoreButtonRef}
            className={classes['more-button']}
            onClick={fetchMoreHandler}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Chargement...' : 'Charger plus'}
          </button>
        )}
        <CommentForm
          ref={formRef}
          replyTo={replyTo}
          onSubmit={submitCommentHandler}
          onCancelReply={cancelReplyHandler}
        />
      </>
    );
  }

  return <div className={classes.comments}>{content}</div>;
};
