import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Lilit from './lilit/Lilit';
import { Provider } from 'react-redux';
import store from "./lilit/redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
      <App/>
      <Lilit/>
    </Provider> 
    
 
);


