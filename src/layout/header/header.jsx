import React, { useRef } from 'react'; 
import styles from './header.module.css';
import { VscListSelection } from 'react-icons/vsc';

const Header = (props) => {
  const searchRef = useRef();

  return (
    <nav className={styles.header}>
      <ul className={styles.list}>
        <li>
          <button 
            className={styles.menuButton}
            disabled
          >
            <VscListSelection className={styles.menuIcon} />
          </button>
        </li>
        <li>
          <input
            type="text"
            ref={searchRef}
            className={styles.search}
          />
        </li>
        <li></li>
      </ul>
      
    </nav>
  );
};

export default Header;