import { motion } from 'framer-motion'
import classes from './PageLoader.module.css'

type PageLoaderPropsType = {
  noAnim?: boolean
}

export const PageLoader = ({ noAnim }: PageLoaderPropsType) => {

  if (noAnim) {
    return <div className={classes.loader} />
  }

  return (
    <motion.div
      className={classes.loader}
      initial={{ scaleX: 1 }}
      animate={{ scaleX: 0, transition: { duration: 0.35 } }}
      exit={{ scaleX: 1, transition: { duration: 0.35 } }}
      style={{ originX: 0 }}
    />
  )
}