import React from 'react';
import '../styles/AroundMarker.css';
import { Marker, InfoWindow } from 'react-google-maps';


export class AroundMarker extends React.Component {
    state = {
        showInfo: false,
    }

    onToggleOpen = () => {
        this.setState((prevState)=> {
            return {
                showInfo: ! prevState.showInfo,
            };
        });
    }
    render() {
        const { location, url, user, message } = this.props.post;
        return (
            <Marker
                position={{ lat: location.lat, lng: location.lon }}
                onClick={this.onToggleOpen}
                onMouseOver={this.onToggleOpen}
                onMouseOut={this.onToggleOpen}
            >
                {this.state.showInfo ? (
                    <InfoWindow>
                        <div>
                            <img className='around-marker-image' src={url}/>
                            <p>{`${user}: ${message}`}</p>
                        </div>
                    </InfoWindow>
                ) : null}

            </Marker>
        );
    }
}
