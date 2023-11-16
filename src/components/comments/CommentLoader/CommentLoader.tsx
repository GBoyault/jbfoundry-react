import { motion, Variants } from 'framer-motion';
import classes from './CommentLoader.module.css';

export const CommentLoader = () => {
  const containerVariants: Variants = {
    initial: {
      opacity: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const dotsVariants: Variants = {
    initial: {
      y: '0%',
    },
    animate: {
      y: '100%',
    },
  };

  const dots = [];
  for (let i = 0; i < 3; i++) {
    dots.push(
      <motion.span
        key={i}
        className={classes.dot}
        variants={dotsVariants}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
    );
  }

  return (
    <motion.div
      className={classes.loader}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {dots}
    </motion.div>
  );
};
