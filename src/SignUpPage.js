import React from 'react';
import $ from 'jquery';
import SignUpItem from './SignUpItem';
import firebase from 'firebase';
import FirebaseConfig from './Config';

class SignUpPage extends React.Component {
	signUp(event){
		event.preventDefault();
		let email = event.target.elements['email'].value;
		let password = event.target.elements['password'].value;


		//sign up
        firebase.auth().createUserWithEmailAndPassword(email, password)
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
            <div className="container" id="signin">
                <SignUpItem submit={this.signUp} />
            </div>
        )
    }
}

export default SignUpPage;