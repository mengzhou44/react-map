import React, { Component } from 'react';
import _ from 'lodash';
import Map from './map';

class Restaurants extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [
                {
                    id: 1,
                    name: 'Asian Buffet',
                    latitude: 50.969647,
                    longitude: -114.06914
                },
                {
                    id: 2,
                    name: 'Wami Ootoya Japanese Cuisine',
                    latitude: 51.086565,
                    longitude: -114.128886
                }
            ],
            selected: null,
            currentLocation: {
                latitude: 50.895051,
                longitude: -114.074076
            }
        };
    }

    renderRestaurants() {
        return _.map(this.state.restaurants, restaurant => {

            let className = 'restaurants__item';

            if (this.state.selected === restaurant) {
                console.log("selected");
                className = 'restaurants__item restaurants__item--selected'
            }

            return <div
                className={className}
                key={restaurant.id}
                onMouseEnter={() => this.setState({ selected: restaurant })}
                onMouseLeave={() => this.setState({ selected: null })}
            >
                {restaurant.name}
            </div>
        })
    }



    render() {
        return <div className='restaurants'>
            <div className='restaurants__list'>
                {this.renderRestaurants()}
            </div>
            <div className='restaurants__map'>
                <Map
                    restaurants={this.state.restaurants}
                    currentLocation={this.state.currentLocation}
                    selected={this.state.selected}
                    onRestaurantSelected={key => {

                        if (key === null) {
                            this.setState({ selected: null });
                        } else {
                            console.log(this.state.restaurants);
                            var found = _.find(this.state.restaurants, restaurant => restaurant.id === parseInt(key));

                            this.setState({ selected: found });
                        }

                    }}
                />
            </div>
        </div>
    }
}

export default Restaurants; 