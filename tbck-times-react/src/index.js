import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import App from './App.js';
import User from './pages/User.js'; //freaks out for some reason - it works???
import GenericNews from './pages/GenericNews.js';
import Signup from './pages/Signup.js'; //???
import Login from './pages/Login.js';
import Newsletter from './pages/NewsletterTemplate.js';
import WarriorOfTheMonth from './pages/WarriorOfTheMonth.js';
import Admin from './pages/Admin.js';
import ResearchSummary from './pages/ResearchSummary.js';
import Search from './pages/Search.js';
import HomePage from './pages/HomePage.js';
import NewsDetails from './pages/NewsDetails.js';

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
  path: '/User',
  element: <User />,
  },
  {
  path: '/Signup',
  element: <Signup />,
  },
  {
  path: '/GenericNews',
  element: <GenericNews />,
  },
  {
    path: '/Newsletter',
    element: <Newsletter />,
  },
  {
    path: '/WarriorOfTheMonth',
    element: <WarriorOfTheMonth />,
  },
  {
    path: '/Admin',
    element: <Admin />,
  },
  {
    path: '/ResearchSummary',
    element: <ResearchSummary />,
  },
  {
    path: '/Search/:searchQuery',
    element: <Search />,
  },
  {
    path: 'details/:title/:date',
    element: <NewsDetails />,
  },
  { path: '/HomePage',
    element: <NewsDetails />,
  }
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
