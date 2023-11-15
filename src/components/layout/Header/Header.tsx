import { Link } from 'react-router-dom';
import { MainNavigation } from '../MainNavigation/MainNavigation';

import classes from './Header.module.css';

export const Header = () => {
  return (
    <header className={classes.header}>
      <h1>
        <Link to="/">Jean Boyault</Link>
      </h1>
      <MainNavigation />
    </header>
  );
};
