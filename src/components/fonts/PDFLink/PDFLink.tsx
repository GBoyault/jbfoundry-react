import { LinkType } from '../../../models'
import Fancybox from '../../ui/Fancybox/Fancybox'
import classes from './PDFLink.module.css'

type PDFLinkProps = {
  link: LinkType,
}

const fancyboxAllowedExtensions = ['pdf', 'jpg', 'jpeg', 'png']

export const PDFLink = ({ link }: PDFLinkProps) => {
  const extension = link.url.split('.').pop()
  const hasFancyboxExtension = extension && fancyboxAllowedExtensions.includes(extension)

  const linkContent = (
    <a
      href={link.url}
      target="_blank"
      className={classes.link}
      data-fancybox="pdfs"
    >
      {link.title}
    </a>
  )

  return hasFancyboxExtension
    ? <Fancybox>{linkContent}</Fancybox>
    : linkContent
}
