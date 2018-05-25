// Page of information about me
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './css/Home.css';
import firebase from 'firebase';
import Materialize from "materialize-css";

// HomePage Component
class HomePage extends React.Component{
    constructor(props) {
        super(props);
		this.state = {address:""};
	}

	// When component mounts, get the data and set the state of 'homeItem'
	componentDidMount(){
        this.homePageRef = firebase.database().ref('homePage');
		//get data from Firebase
		
		this.homePageRef.on('value', (snapshot) => {
			if(snapshot.val()){
				this.setState({aboutUs:snapshot.val()});
			}
		});
		
		$('#home').animate({opacity: '1'});
		
       
	}

	createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
			var expires = "; expires=" + date.toGMTString();
		}
		else {
			var expires = "";
		}
		document.cookie = name + "=" + value + expires + "; path=/";
    }

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    handleChange = (address) => {
        this.setState({ address })
    }

    handleSelect = (address) => {
        var latAndLng = ""
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.createCookie("latLng", latLng.lat + ":" + latLng.lng))
            .catch(error => console.error('Error', error))
    }

    setChips() {
        $('.chips').material_chip();
        $('.chips-autocomplete').material_chip({
            autocompleteOptions: {
                data: {
                    'Waterfall': null,
                    'Restaurant': null,
                    'Art': null,
                    'Outdoors': null,
                    'Indoors': null,
                    '24 hours': null,
                    'Family': null
                },
                limit: Infinity,
                minLength: 1
            }
        });
    }
	// Render a <HomeItem> element
	render() {
        this.setChips();
		return (
			<div id='home'>	
				<div className='container' id='search-box'>
					<h1 id="homeHeader"> Hidden Gem </h1>
					<p id="homeDescription"> Discover your backyard </p>
					
					<form>
						<div className="input-field">
                            <PlacesAutocomplete
                                value={this.state.address}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                                    <div>
                                        <input
                                            {...getInputProps({
                                                placeholder: 'Search Places ...',
                                                className: 'location-search-input'
                                            })}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                    <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>

                            
                        </div>
                        <div className="chips chips-autocomplete"></div>
						<div id="homeWrapper">
							<a className="waves-effect waves-light btn" id="homeBtn" ><Link className='link' activeClassName='active' to='map'>Find your Hidden Gems</Link></a>
						</div>
					</form>
				</div>
			</div>
		);
	}
};

export default HomePage;
