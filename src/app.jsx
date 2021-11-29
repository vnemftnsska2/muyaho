import React from 'react';
import styles from './app.module.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Login from './components/login/login';
import Layout from './layout/layout';
import Dashboard from './components/dashboard/dashboard';
import Error404 from './components/error_404/error_404';
import MyInfo from './components/my_info/my_info';
import MyList from './components/my_list/my_list';
import Reading from './components/reading/reading';
import Analysis from './components/anlysis/analysis';
import FreeTalk from './components/free_talk/free_talk';
import Report from './components/report/report';
import Setting from './components/setting/setting';



const App = () => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route element={<Layout />} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="myInfo" element={<MyInfo />} />
            <Route path="myList" element={<MyList />} />
            <Route path="reading" element={<Reading />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="freeTalk" element={<FreeTalk />} />
            <Route path="report" element={<Report />} />
            <Route path="setting" element={<Setting />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
