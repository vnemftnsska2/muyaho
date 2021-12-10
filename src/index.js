import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './app.jsx';

// Repository
import StockRepository from './service/stock_repository';


const stockRepository = new StockRepository();

ReactDOM.render(
  <React.StrictMode>
    <App stockRepository={stockRepository} />
  </React.StrictMode>,
  document.getElementById('root')
);