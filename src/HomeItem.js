import React from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css';

// Returns a picture, contact information, and a bio
class HomeItem extends React.Component{
    render() {
    	//<img src={this.props.img} alt='background'/>
		return(
			<div className='home-item'>
				<div>
					<p className="hometext">{this.props.text} </p>
					<Link className='homelink' activeClassName='active' to={this.props.link}>{this.props.page}</Link>
				</div>
					
			</div>
        )
    }
};

export default HomeItem;
