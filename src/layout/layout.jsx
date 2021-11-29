import React from 'react';
import styles from './layout.module.css';
import { Outlet } from 'react-router-dom';
import Header from './header/header';
import NavBar from './navbar/navbar';
import Footer from './footer/footer';

const Layout = (prop) => {
    return (
        <div className={styles.layout}>
            <div className={styles.menu}>
                <NavBar />
            </div>
            <div className={styles.main}>
                <Header />
                <div className={styles.container}>
                    <Outlet />
                </div>
                <footer className={styles.footer}>
                    <Footer />
                </footer>
            </div>
        </div>
    );
};

export default Layout;