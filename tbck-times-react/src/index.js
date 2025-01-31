import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import App from './App.js';
import Login from './pages/Login.js';
import GenericNews from './pages/GenericNews.js';
import Newsletter from './pages/NewsletterTemplate.js';

const router = createBrowserRouter([
  {
  path: '/',
  element: <App />,
  },
  {
  path: '/Login',
  element: <Login />,
  },
  {
    path: '/GenericNews',
    element: <GenericNews />,
  },
  {
    path: '/Newsletter',
    element: <Newsletter />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
