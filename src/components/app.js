import React, { Component } from 'react';
import _ from 'lodash';
import { Gmaps, Marker, InfoWindow } from 'react-gmaps';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { selected: null, restaurants:[], showInfoWindow: false };
 }

 componentDidMount() {
     this.setState({
        restaurants:  [
          {
            id: 1,
            latitude: 50.8950484,
            longitude: -114.076325,
            name: 'Phoenix Grill'
          }, 
          {
            id: 2,
            latitude: 50.968719,
            longitude: -114.068773,
            name: 'Asian Buffet'
          }
        ]
     })  
 }

 
  renderInfoWindow() {
    if (this.state.selected!==null  && this.state.showInfoWindow === true) {
        const {selected} = this.state;
        return (
            <InfoWindow
                
                lat={selected.latitude}
                lng={selected.longitude}
                content={`<p class='info-window'>${selected.name}</p>`}
                onCloseClick={() => this.setState({
                  showInfoWindow: false
              })}
            />

        );
    }
  }

  getRestaurantIcon(item) {
         if (this.state.selected !== null) {
            const {selected} = this.state; 
            if (item.id === selected.id) {
                 return '/images/restaurant-selected.png';
            }

         }

         return '/images/restaurant-unselected.png';
  }

  renderRestaurant(restaurant) {
     let  className='restaurant';
      if (this.state.selected!==null) {
            if( restaurant.id === this.state.selected.id) {
              className='restaurant restaurant--selected';
            }
      } 
       return <div 
            className={className}
            onClick= {()=> this.setState({selected: restaurant, showInfoWindow: true})}
       >
           {restaurant.name}
       </div>

  }


  renderMarkers() {
    
    return  _.map(this.state.restaurants, item=> {
         return <Marker
                            lat={item.latitude}
                            lng={item.longitude}
                            icon={this.getRestaurantIcon(item)}
                            onClick={() => {
                                this.setState({
                                    selected: item,
                                    showInfoWindow: true
                                });
                               
                            }}
         />  
    })
  }

  render() {
    return (
      <div className='box'>
         <div className='list'>
             {_.map(this.state.restaurants, this.renderRestaurant.bind(this))}

         </div>
        <Gmaps className='map'
                        params={{ key: 'AIzaSyB_aHCOUmc3tEEPS-CL3yffEYPGMaB2NpQ' }}
                        lat={50.93}
                        lng={-114.07}
                        zoom={11}
                    >

                        {this.renderMarkers()}
                        {this.renderInfoWindow()}
         </Gmaps>
       </div>
      
    );
  }
}

export default App;

