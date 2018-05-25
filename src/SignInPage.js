// Sign in
import React from 'react';
import $ from 'jquery';
import SignInItem from './SignInItem';
import firebase from 'firebase';
import FirebaseConfig from './Config';

class SignInPage extends React.Component {
	signIn(event){
		event.preventDefault();

		let email = event.target.elements['email'].value;
		let password = event.target.elements['password'].value;


		//sign in
        firebase.auth().signInWithEmailAndPassword(email, password)
		.then((user) => {
            this.setState({ user: firebase.auth().currentUser});
		})
		//clear form
		event.target.reset();
        firebase.auth().onAuthStateChanged(user => {
		  if(user) {
			window.location = './#/home'; //After successful login, user will be redirected to home.html
		  }
		});
	}

    render() {
        return(
		<div id='signin'>
		<div className="container">
                <SignInItem submit={this.signIn} />
        </div>
        </div>
        )
    }
}

export default SignInPage;