// Page of blogs to show
/* global google */
import React from 'react';
import './css/Map.css';
import firebase from 'firebase';
import $ from 'jquery';
import MapItem from './MapItem';
import InfoWindowMap from './InfoWindow';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"


// MapPage Component
class MapPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = { mapItems: [], fileName: "", isUploading: false, uploadPicUrl: ""}
	}

	// When component mounts, get the data and set the state of 'mapItems'
	componentDidMount(){
        this.mapRef = firebase.database().ref("Locations");
		this.mapRef.on("value", (snapshot)=> {
			if(snapshot.val()){
				this.setState({mapItems:snapshot.val()});
			}
        });
		$('#map').animate({opacity: '1'});
	}
	
	handleMarkerClick(key){
		console.log($("#" + key + "label"))
		$("#" + key + "label").hidden = "false"
		$("#" + key + "marker").padding = "15px"
	}
	
	getCookie(name) {
	  var value = "; " + document.cookie;
	  var parts = value.split("; " + name + "=");
	  if (parts.length == 2) return parts.pop().split(";").shift();
	}
	
	// Render a <MapItem> element for each element in the state
    render() {
        const { compose, withProps, withStateHandlers } = require("recompose");

        const {
            withScriptjs,
            withGoogleMap,
            GoogleMap,
            Marker,
            InfoWindow,
        } = require("react-google-maps");

        const MapWithAMakredInfoWindow = compose(
            withStateHandlers(() => ({
                isOpen: false,
            }), {
                    onToggleOpen: ({ isOpen }) => () => ({
                        isOpen: !isOpen,
                    })
                }),
            withScriptjs,
            withGoogleMap
        )(props =>
		  <GoogleMap
			defaultZoom={12}
                defaultCenter={{ lat: parseFloat(this.getCookie("latLng").split(":")[0]), lng: parseFloat(this.getCookie("latLng").split(":")[1])}}
		  >
		  {Object.keys(this.state.mapItems).map((d) => {
                    return (

                   <InfoWindowMap key={d} data={this.state.mapItems[d]} />
            )
		  })}
		  </GoogleMap>
		)
		return (
			<div id='map'>
				  <MapWithAMakredInfoWindow
					  isMarkerShown = {true}
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBWO29pGSeokNJMU6U-GHUC-5TlnKs0rqE"
					  loadingElement={<div style={{ height: '100%', width: '100%' }} />}
					  containerElement={<div style={{ height: '100%', width: '100%' }} />}
					  mapElement={<div style={{ height: '100%', width: '100%' }} />}
					/>
			</div>
		);
	}
};

export default MapPage;