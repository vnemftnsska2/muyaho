import React from 'react';
import styles from './app.module.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import Error404 from './components/error_404/error_404';



const App = () => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
