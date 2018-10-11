import React, { Component } from 'react';
import { Router, Switch, Route } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';


import Restaurants from './restaurants';

class App extends Component {


  render() {
    return (

      <Router history={createHistory()}>
        <div className='u-height-full'>
          <Switch>
            <Route exact path="/" component={Restaurants} />

          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;

