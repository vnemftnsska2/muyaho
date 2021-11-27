import React from 'react';
import styles from './error_404.module.css';

const Error404 = (props) => {

  return (
    <div className={styles.container}>
      <h1>ERROR 404</h1>
      <h1>돈 벌기 싫으니!?</h1>
      <div className={styles.link}>
        <h2>돈 벌러 가기</h2>
      </div>
    </div>
  );
}

export default Error404;