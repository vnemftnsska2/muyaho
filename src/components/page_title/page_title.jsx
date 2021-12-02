import React from 'react';
import styles from './page_title.module.css';

const PageTitle = ({ title }) => {
  return (
    <h1 className={styles.title}>{title}</h1>
  );
};

export default PageTitle;