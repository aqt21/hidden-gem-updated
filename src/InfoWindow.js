import React, { Component } from 'react';
import { Marker, InfoWindow } from "react-google-maps";
import './css/InfoWindow.css';

class InfoWindowMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }

    }

    handleToggleOpen = () => {

        this.setState({ isOpen: true });
    }

    handleClicks = () => {
        this.handleToggleOpen();

    }


    render() {
        console.log(this.props)
        return (

            <Marker position={{
                lat: parseFloat(this.props.data.latitude),
                lng: parseFloat(this.props.data.longitude)
            }}
                onClick={() => this.handleClicks()}
            >

                {
                    this.state.isOpen &&

                    <InfoWindow onCloseClick={() => this.setState({ isOpen: false })}>
                        <div>
                            <h4>{this.props.data.title}</h4>
                            <img className="infoImg" src={this.props.data.imgurl} />
                            <p>{this.props.data.description}</p>
                        </div>
                    </InfoWindow>

                }

            </Marker>


        )
    }
}

export default InfoWindowMap;
