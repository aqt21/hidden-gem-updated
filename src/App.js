// Application
import React from 'react';
import './css/App.css';

import firebase from 'firebase';
import FirebaseConfig from './Config';
import { HashRouter, Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import SignOut from './SignOut';
import Materialize from "materialize-css";
import '../node_modules/materialize-css/dist/css/materialize.css';
import '../node_modules/material-design-icons/iconfont/material-icons.css';
import HomePage from './HomePage';
import MapPage from './MapPage';
import ListPage from './ListPage';
import ModPage from './ModPage';
import ProfilePage from './ProfilePage';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import AboutPage from './AboutPage';
import SubmitPage from './SubmitPage';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { checked: false, user: null, authOption: 'sign-in' }
	}

	componentWillMount() {
		firebase.initializeApp(FirebaseConfig);

		firebase.auth().onAuthStateChanged((user) => {
			if (this.state.checked !== true) {
				if (user) {
					this.setState({ user: user });
				}
			}

			//Indicate that state has been checked
			this.setState({ checked: true })
		});

	}

	signOut() {
		firebase.auth().signOut().then(() => {
			this.setState({ user: null });
		});
	}

	render() {

		// Return links and show anything inside the <App> component (children)
		return (

			<div className='App'>

				<div id='nav'>
					
					<nav>
						<div className="nav-wrapper">
							<a href="#!" className="brand-logo"><img src={require('./hg-icon.png')} /></a>
							<ul className="right hide-on-med-and-down">
								<li><Link className='link' to='/home'>Home</Link></li>
								<li><Link className='link' to='/map'>Map</Link></li>
								<li><Link className='link' to='/list'>List</Link></li>
								
							</ul>
						</div>
					</nav>

				</div>


				<div className='children'>

					<Switch>
						<Route path='/home' component={HomePage} />
						<Route path='/map' component={MapPage} />
						<Route path='/list' component={ListPage} />
						<Route path='/profile' component={ProfilePage} />
						<Route path='/sign-up' component={SignUpPage} />
						<Route path='/sign-in' component={SignInPage} />
						<Route path='/mod' component={ModPage} />
						<Route path='/about' component={AboutPage} />
						<Route path='/submit' component={SubmitPage} />
					</Switch>

				</div>

				<footer className="page-footer">
					<div className="container">
						<div className="row">
							<div className="col l6 s12">
								<h5 className="white-text">Hidden Gem</h5>
								<p className="grey-text text-lighten-4">Discover your backyard</p>
							</div>
							<div className="col l4 offset-l2 s12">
								<h5 className="white-text">Links</h5>
								<ul>
									<li><a className="grey-text text-lighten-3" href="/about">About Us</a></li>
									<li><a className="grey-text text-lighten-3" href="/submit">Submit New Location</a></li>
									<li><a className="grey-text text-lighten-3" href="/mod">Moderator Page</a></li>
									
								</ul>
							</div>
						</div>
					</div>
					<div className="footer-copyright">
						<div className="container">
							© 2018
</div>
					</div>
				</footer>

			</div>
		);
	}
}

export default App;