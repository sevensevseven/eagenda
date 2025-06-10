import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import axios from 'axios';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://api.curiachronos.ro";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);

serviceWorkerRegistration.register();