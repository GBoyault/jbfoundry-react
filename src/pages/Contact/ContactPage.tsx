import { useQuery } from '@tanstack/react-query';
import { fetchPageContact } from '../../services/wp-api';
import { PageLoader } from '../../components/layout';
import { FixedButtons } from '../../components/ui/FixedButtons/FixedButtons'

import classes from './ContactPage.module.css'

export const ContactPage = () => {
  const { data, isError, error } = useQuery({
    queryKey: ['contact'],
    queryFn: ({ signal }) => fetchPageContact({ signal }),
  });

  let content = <PageLoader noAnim />

  if (isError) {
    content = (
      <p>Erreur : {error.message}</p>
    )
  }

  if (data) {
    const email = data?.email.replace(' [at] ', '@').replace(' [dot] ', '.')
    const presentation = data?.presentation.replace(/\n/g, "<br />")

    content = (
      <>
        <PageLoader />
        <FixedButtons />
        <h2>Jean Boyault</h2>
        <div className={classes.container}>
          <div className={classes.col}>
            {presentation && (
              <p
                className={classes.presentation}
                dangerouslySetInnerHTML={{ __html: presentation }}
              />
            )}
            <p className={classes.label}>à propos</p>
            <p>
              À l'origine, jeanboyault.fr est un site WordPress réalisé il y a plusieurs années. Vous naviguez actuellement sur un projet de refonte technique, proposant une meilleure expérience utilisateur.
            </p>
            <p className={classes.label}>technos</p>
            <p>
              Le front est développé avec React et TypeScript, le site original sert de CMS headless grâce à l'API Rest de WordPress.
            </p>
          </div>
          <div className={classes.col}>
            <p className={classes.label}>adresse</p>
            <p>
              365 rue des Durandys<br />
              71960 DAVAYÉ<br />
              France
            </p>
            {data?.phone && (
              <>
                <p className={classes.label}>téléphone</p>
                <p>{data.phone}</p>
              </>
            )}
            {email && (
              <>
                <p className={classes.label}>e-mail</p>
                <p >{email}</p>
              </>
            )}
            <p className={classes.label}>réalisation</p>
            <p>
              <a href="https://gabrielboyault.com/" target="_blank">Gabriel Boyault</a>
            </p>
            <p className={classes.label}>code source</p>
            <p>
              <a href="https://github.com/GBoyault/jbfoundry-react/" target="_blank" rel="noopener noreferrer">github</a>
            </p>
            <p className={classes.label}>site original</p>
            <p>
              <a href="https://www.jeanboyault.fr/" target="_blank">jeanboyault.fr</a>
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={classes.contact}>
      {content}
    </div>
  )
}
