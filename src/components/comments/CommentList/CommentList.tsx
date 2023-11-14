import { Comment as CommentType } from '../../../models'
import { Comment } from '..'
import { sortCommentByThread } from '../../../utils'
import classes from './CommentList.module.css'
type CommentListPropsType = {
  comments: CommentType[]
}

export const CommentList = ({ comments }: CommentListPropsType) => {
  const sorted = sortCommentByThread(comments)

  return (
    <ul className={classes['comment-list']}>
      {sorted.map(comment => (
        <Comment
          key={comment.id}
          comment={comment} />
      ))}
    </ul>
  )
}