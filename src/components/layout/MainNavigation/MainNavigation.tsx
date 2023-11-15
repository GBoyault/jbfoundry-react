import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';

export const MainNavigation = () => {
  return (
    <nav className={classes.navigation}>
      <ul>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Contact
          </NavLink>
        </li>
        <li>
          <a
            href="https://www.myfonts.com/foundry/JBFoundry"
            target="_blank"
            rel="noopener noreferrer"
          >
            MyFonts
          </a>
        </li>
      </ul>
    </nav>
  );
};
