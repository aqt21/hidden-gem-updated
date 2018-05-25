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
						<div className='map-details'>
							<div className='md-left'>
								<img className="infoImg" src={this.props.data.imgurl} />
							</div>
							<div className='md-right'>
								<div className='md-text'>
								<p className='md-title'>{this.props.data.title}</p>
								<p className='md-desc'>{this.props.data.description}</p>
								</div>
							</div>
                        </div>
                    </InfoWindow>
                }
            </Marker>
        )
    }
}

export default InfoWindowMap;
