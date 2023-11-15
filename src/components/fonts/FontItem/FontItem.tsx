import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Font } from '../../../models';
import classes from './FontItem.module.css';

type FontItemProps = {
  font: Font;
};

export const FontItem = ({ font }: FontItemProps) => {
  const url = `font/${font.slug}`;

  return (
    <motion.li
      className={classes.font}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Link to={url}>
        <img
          src={font.acf.font_main_image}
          alt={font.title}
          decoding="async"
          loading="lazy"
        />
      </Link>
      <p className={classes.baseline}>{font.acf.font_details}</p>
    </motion.li>
  );
};
