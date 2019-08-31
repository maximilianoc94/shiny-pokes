import React from 'react';
import { Link } from '@reach/router';
import styles from './header.module.scss';


function NavItem({ name, href }) {
  return (
    <Link className={styles.link} to={href}>
      {name}
      <div className={styles.line} />
    </Link>
  );
}

function Header() {
  return (
    <header
      className={styles.header}
    >
      <nav className={styles.wrapper}>
        <div className={styles.tittle}>
          {'Shiny Pokemons'}
        </div>
        <div className={styles.navWrapper}>
          <NavItem name="Tabla" href="/" />
          <NavItem name="Contacto" href="/contacto/" />
        </div>
      </nav>
    </header>
  );
}

export default Header;
