import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './MainNav.module.css';

export default function MainNav() {
  const navigate = useNavigate();
  function navigateHandler(e) {
    e.preventDefault();
    const username = e.target[0].value;
    navigate('/user/' + username);
  }
  return (
    <nav className={styles.container}>
      <ul className={styles.container}>
        <h1>Scrummy</h1>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/savecomp">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
