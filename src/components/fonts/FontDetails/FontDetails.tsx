import { Font, LinkType, hasURL, fontPdfSchema } from '../../../models';
import { FixedButtons } from '../../ui/FixedButtons/FixedButtons';
import classes from './FontDetails.module.css';
import { PDFLink } from '../PDFLink/PDFLink';
import { FontImage } from '../FontImage/FontImage';

type FontDetailsProps = {
  font?: Font | null;
};

export const FontDetails = ({ font }: FontDetailsProps) => {
  if (!font) {
    return <p>Erreur</p>;
  }

  const { title } = font;
  const {
    link_myfonts,
    font_download,
    font_presentation,
    font_pdf_repeater,
    font_images_repeater,
    font_main_image,
  } = font.acf;

  const links: LinkType[] = [];

  if (link_myfonts) {
    links.push({
      title: 'Buy on MyFonts',
      target: '_blank',
      url: link_myfonts,
    });
  }

  const fontDownloadValidation = hasURL.safeParse(font_download);
  if (fontDownloadValidation.success) {
    links.push({
      title: 'Download',
      url: fontDownloadValidation.data.url,
    });
  }

  const fontPdfValidation = fontPdfSchema.array().safeParse(font_pdf_repeater);

  return (
    <div className={classes.font}>
      <FixedButtons links={links} />

      <h2 className={classes.title}>
        <img src={font_main_image} alt={title} />
      </h2>

      <p className={classes.presentation}>{font_presentation}</p>

      {font_images_repeater.map((image, index: number) => (
        <FontImage image={image} key={index} />
      ))}

      {fontPdfValidation.success &&
        fontPdfValidation.data.map((pdf, index: number) => (
          <PDFLink
            key={index}
            link={{
              title: pdf.font_pdf_title,
              url: pdf.font_pdf_file.url,
            }}
          />
        ))}
    </div>
  );
};
