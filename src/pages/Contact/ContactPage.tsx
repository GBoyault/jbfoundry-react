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
          </div>
          <div className={classes.col}>
            <p className={classes.label}>address</p>
            <p>
              365 rue des Durandys<br />
              71960 DAVAYÉ<br />
              France
            </p>
            {data?.phone && (
              <>
                <p className={classes.label}>phone</p>
                <p>{data.phone}</p>
              </>
            )}
            {email && (
              <>
                <p className={classes.label}>email</p>
                <p >{email}</p>
              </>
            )}
            <p className={classes.label}>conception et réalisation du site</p>
            <p>
              <a href="https://gabrielboyault.com/" target="_blank">Gabriel Boyault</a>
            </p>
            {/* <p>
            <Link to="/mentions-legales">Mentions légales</Link>
          </p> */}
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
