import React, { PureComponent } from 'react';
import _ from 'lodash';
import sizeMe from 'react-sizeme';

import geolib from 'geolib';

import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

import Marker from './marker';
import People from './people';
import controllable from 'react-controllables';

function createMapOptions(maps) {

    return {
        hoverDistance: 20,
        zoomControlOptions: {
            position: maps.ControlPosition.RIGHT_CENTER,
            style: maps.ZoomControlStyle.SMALL
        },
        mapTypeControlOptions: {
            position: maps.ControlPosition.TOP_RIGHT
        },
        mapTypeControl: true
    };
}


class Map extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { center: [50.903984, -114.115444], zoom: 9 }
    }

    componentDidMount() {
        this.updateZoomAndCenter();
    }

    calculateGoogleMapBounds(bounds) {
        return {
            sw: {
                lat: bounds.minLat,
                lng: bounds.minLng
            },
            ne: {
                lat: bounds.maxLat,
                lng: bounds.maxLng
            },
        }
    }


    updateZoomAndCenter() {
        if (this.props.restaurants.length === 0 ||
            this.props.currentLocation === null) {
            return;
        }

        var all = this.props.restaurants.slice(0);
        all.push(this.props.currentLocation);
        var bounds = geolib.getBounds(all);

        bounds = this.calculateGoogleMapBounds(bounds);
        const { zoom, center } = fitBounds(bounds, this.props.size);

        this.setState({ zoom, center });

    }


    _onBoundsChange = (center, zoom /* , bounds, marginBounds */) => {
        this.props.onCenterChange(center);
        this.props.onZoomChange(zoom);
    }

    _onChildClick = (key, childProps) => {
        this.props.onCenterChange([childProps.lat, childProps.lng]);
    }

    _onChildMouseEnter = (key) => {

        this.props.onRestaurantSelected(key);
        this.props.onHoverKeyChange(key);

    }

    _onChildMouseLeave = (/* key, childProps */) => {
        this.props.onRestaurantSelected(null);
        this.props.onHoverKeyChange(null);
    }

    renderMarkers() {
        return _.map(this.props.restaurants, restaurant => {
            const { id, name, latitude, longitude } = restaurant;

            if (this.props.selected !== null && this.props.selected !== undefined) {

                return (<Marker
                    key={id}
                    lat={latitude}
                    lng={longitude}
                    text={name}
                    hover={this.props.selected.id === id} />
                );

            }
            return (<Marker
                key={id}
                lat={latitude}
                lng={longitude}
                text={name}
                hover={this.props.hoverKey === id} />
            );
        });
    }

    renderCurrentLocation() {
        const { latitude, longitude } = this.props.currentLocation;

        return (<People
            lat={latitude}
            lng={longitude}
        />
        );

    }


    render() {

        return (

            <GoogleMap
                bootstrapURLKeys={{ key: 'AIzaSyB_aHCOUmc3tEEPS-CL3yffEYPGMaB2NpQ' }}
                zoom={this.state.zoom}
                center={this.state.center}
                options={createMapOptions}
                onBoundsChange={this._onBoundsChange}
                onChildClick={this._onChildClick}
                onChildMouseEnter={this._onChildMouseEnter}
                onChildMouseLeave={this._onChildMouseLeave}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => {
                    console.log('map', map)
                }}
            >
                {this.renderCurrentLocation()}
                {this.renderMarkers()}

            </GoogleMap>

        );
    }
}

export default controllable(['center', 'zoom', 'hoverKey', 'clickKey'])(sizeMe({ monitorHeight: true })(Map));

