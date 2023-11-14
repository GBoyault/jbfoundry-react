import { LinkType } from '../../../models'
import classes from './PDFLink.module.css'

type PDFLinkProps = {
  link: LinkType
}

export const PDFLink = ({ link }: PDFLinkProps) => {
  return (
    <a
      href={link.url}
      target="_blank"
      className={classes.link}
    >
      {link.title}
    </a>
  )
}
