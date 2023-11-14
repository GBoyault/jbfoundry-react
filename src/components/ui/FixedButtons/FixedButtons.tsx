import { Link } from 'react-router-dom';
import { LinkType } from '../../../models';
import { motion } from 'framer-motion';
import classes from './FixedButtons.module.css'


type FixedButtonsProps = {
  links?: LinkType[],
}

export const FixedButtons = ({ links }: FixedButtonsProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      },
    }
  }

  const item = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <motion.ul
      className={classes.buttons}
      variants={container}
      initial='hidden'
      animate='show'
      whileHover='hover'
    >
      {links && links?.map((link, index) => (
        <motion.li
          className={classes.button}
          key={index}
          variants={item}
        >
          <a
            href={link.url}
            target="_blank"
            rel={link.target === '_blank' ? 'noopener noreferrer' : ''}
          >
            {link.title}
          </a>
        </motion.li>
      ))}

      <motion.li
        className={classes.button}
        variants={item}
        key='back-button'
      >
        <Link to="../">back</Link>
      </motion.li>
    </motion.ul >

  )
}
