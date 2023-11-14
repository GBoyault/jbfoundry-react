import { FontImage as FontImageType, hasURL } from '../../../models'
import Fancybox from '../../ui/Fancybox/Fancybox'
import classes from './FontImage.module.css'

type SingleImageProps = {
  url: string
}

const SingleImage = ({ url }: SingleImageProps) => {
  return (
    <Fancybox>
      <a
        className={classes.img}
        href={url}
        target="_blank"
        data-fancybox="gallery"
      >
        <img
          src={url}
          alt=""
          decoding="async"
          loading="lazy"
        />
      </a >
    </Fancybox>
  )
}


type FontImageProps = {
  image: FontImageType
}

export const FontImage = ({ image }: FontImageProps) => {
  const leftValidation = hasURL.safeParse(image.font_image_left);
  const rightValidation = hasURL.safeParse(image.font_image_right);

  if (leftValidation.success && rightValidation.success) {
    return (
      <div className={classes.container}>
        <div className={classes.col}>
          <SingleImage url={leftValidation.data.url} />
        </div>
        <div className={classes.col}>
          <SingleImage url={rightValidation.data.url} />
        </div>
      </div>
    )
  }

  if (leftValidation.success) {
    return <SingleImage url={leftValidation.data.url} />
  }
}