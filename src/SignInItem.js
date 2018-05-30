// Sign in
import React from 'react';
import $ from 'jquery';

class SignInItem extends React.Component {
	
    render() {
		return (
			<div id="signin-content">
				<h4 id='signin-title'>SIGN IN</h4>
				<div className="col s12 authenticate" id="signin-form">
					<form onSubmit={this.props.submit}>
						<div className="row" >
							<div className="input-field col s12">
								<input id="email" type="email" className="validate" />
								<label htmlFor="email">Email</label>
							</div>
							<div className="input-field col s12">
								<input id="password" type="password" className="validate" />
								<label htmlFor="password">Password</label>
							</div>

						</div>
						<button id="signin-button" className="btn btn-primary">Sign In</button>
					</form>
				</div>
			</div>
        )
    }
}

export default SignInItem;