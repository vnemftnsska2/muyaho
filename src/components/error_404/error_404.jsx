import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './error_404.module.css';

const Error404 = (props) => {
  const navigator = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ERROR 404</h1>
      <h1 className={styles.title}>돈 벌기 싫으니!?</h1>
      <Link to='/' className={styles.link}>
        <h2 className={styles.sub}>돈 벌러 가기</h2>
      </Link>
    </div>
  );
}

export default Error404;