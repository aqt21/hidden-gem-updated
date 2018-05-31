import React from 'react';
import $ from 'jquery';

// Returns a list item containing the experience, position I held, date, and description.
class LocationPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: '', }
	}

	
	changeEventData() {
		$('#l-title').text(this.props.data.title);
		$('#l-desc').text(this.props.data.description);
		$('#l-img').attr("src", this.props.data.imgurl);
		$('#l-address').text(this.props.data.address);
	}

	render() {
		this.changeEventData();
		console.log(this.props.data.tags);

		return (
			<div id="locationDetails">
				<div id="locationImage">
					<img id='l-img' src='' />
				</div>
				<div id='locationInfo'>
					<h4 id='l-title'> </h4>
					<p id='l-address'>  </p>
					<p id='l-desc'> </p>

				</div>
			</div>
		)
	}
};

export default LocationPopup;
