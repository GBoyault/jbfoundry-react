import { Outlet } from 'react-router-dom';
import { Header } from '../../components/layout';
import classes from './RootPage.module.css';

export const RootPage = () => {
  return (
    <>
      <Header />
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
};
