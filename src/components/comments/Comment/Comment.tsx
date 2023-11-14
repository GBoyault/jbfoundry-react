import { motion } from 'framer-motion'

import { Comment as CommentType } from "../../../models"
import classes from './Comment.module.css'

type CommentPropsType = {
  comment: CommentType
}

export const Comment = ({ comment }: CommentPropsType) => {
  const { author_name } = comment

  const content = comment.content.rendered.replace(/\n/g, "<br />")
  const date = new Date(comment.date).toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const depth = comment.depth ? comment.depth : 0

  let classNames = classes.comment
  if (comment.author > 0) {
    classNames += ' ' + classes['is-admin']
  }
  if (comment.notValidated) {
    classNames += ' ' + classes['pending']
  }


  return (
    <motion.li
      className={classNames}
      style={{ paddingLeft: `${depth * 2}rem` }}
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      <div className={classes.body}>
        <div className={classes.meta}>
          <div className={classes.author} rel="author">{author_name}</div>
          <time className={classes.date}>{date}</time>
          {comment.notValidated && (
            <div className={classes['notice-pending']}>Votre commentaire est en attente de modération. Ceci est un aperçu, votre commentaire sera visible après sa validation.</div>
          )}
        </div>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </motion.li >
  )
}