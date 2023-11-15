import { Link } from 'react-router-dom';
import { Header } from '../../components/layout';
import classes from './ErrorPage.module.css';

export const ErrorPage = () => {
  return (
    <>
      <Header />
      <main className={classes.main}>
        <div className={classes.error}>
          <h2>Erreur 404</h2>
          <p>La page que vous recherchez est introuvable.</p>
          <p>
            <Link className="homelink-404" to="/">
              Retour à l'accueil
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};
