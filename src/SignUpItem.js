// Sign up
import React from 'react';
import $ from 'jquery';

class SignUpItem extends React.Component{
    render() {
        return(
			<div id="signup-content">
				<h4 id='signup-title'>SIGN UP</h4>
				<div className="col s12 authenticate" id="signin-form">
                <form onSubmit={this.props.submit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate" />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" />
                            <label htmlFor="password">Password</label>
                        </div>
                        
                    </div>
						<button id="signup-button" className="btn btn-primary">Sign Up</button>
					</form>
					</div>
            </div>
        )
    }
}

export default SignUpItem;