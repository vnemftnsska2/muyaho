import React from 'react';
import styles from './layout.module.css';
import { Outlet } from 'react-router-dom';
import Header from './header/header';
import NavBar from './navbar/navbar';
import Footer from './footer/footer';

const Layout = (prop) => {
    return (
        <>
            <Header />
            <NavBar />
            <Footer />
            <Outlet />
        </>
    );
};

export default Layout;