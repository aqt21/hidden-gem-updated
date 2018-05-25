import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter, Route, Link, Switch, BrowserRouter, Router } from 'react-router-dom';
import './css/index.css';
import HomePage from './HomePage';
import MapPage from './MapPage';
import ListPage from './ListPage';
import ModPage from './ModPage';
import ProfilePage from './ProfilePage';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import AboutPage from './AboutPage';


// Render DOM
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
  document.getElementById('root')
);
