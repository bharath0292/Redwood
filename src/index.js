import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { registerLicense } from '@syncfusion/ej2-base';

import './ui/index.css'

registerLicense('Mgo+DSMBMAY9C3t2VVhhQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkNhWH1ccXRVQGNaVUY=');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);