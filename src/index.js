import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { IndexRoute, Router } from 'react-router';
import { HashRouter, Route, Link } from 'react-router-dom';
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
        <HashRouter>
            <Route path='/' component={App}>
                <Route exact path='home' component={HomePage} />
                <Route path='home' component={HomePage}/>
                <Route path='map' component={MapPage}/>
				<Route path='list' component={ListPage}/>
				<Route path='profile' component={ProfilePage}/>
				<Route path='sign-up' component={SignUpPage}/>
				<Route path='sign-in' component={SignInPage}/>
				<Route path='mod' component={ModPage}/>
				<Route path='about' component={AboutPage}/>
            </Route>
        </HashRouter>,
  document.getElementById('root')
);
