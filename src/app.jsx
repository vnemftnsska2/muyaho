import React from 'react';
import styles from './app.module.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";

import Login from './components/pages/login/login';
import Layout from './layout/layout';
import Dashboard from './components/pages/dashboard/dashboard';
import Error404 from './components/pages/error_404/error_404';
import MyInfo from './components/pages/my_info/my_info';
import MyList from './components/pages/my_list/my_list';
import Leading from './components/pages/leading/leading';
import Analysis from './components/pages/anlysis/analysis';
import FreeTalk from './components/pages/free_talk/free_talk';
import Report from './components/pages/report/report';
import Setting from './components/pages/setting/setting';

const App = ({stockRepository, }) => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route element={<Layout />} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="myInfo" element={<MyInfo />} />
            <Route path="myList" element={<MyList />} />
            <Route path="leading" element={<Leading stockRepository={stockRepository}/>} />
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
