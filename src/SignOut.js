// Sign out
import React from 'react';

class SignOut extends React.Component {
    render() {
        return(
            <a onClick={this.props.submit}>Sign Out</a>
        )
    }
}

export default SignOut;