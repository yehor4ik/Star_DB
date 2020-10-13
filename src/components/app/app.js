import React, { Component } from 'react';

import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import ErrorBoundary from '../error-boundary';
import { SwapiServiceProvider } from '../swapi-service-context';
import { PeoplePage, PlanetPage, StarshipsPage } from '../pages';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StarshipDetails } from '../sw-components';


export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
  };

  render() {

    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div>
              <Header onServiceChange={this.onServiceChange}/>
              <RandomPlanet />
              <Route path="/" exact render={() => <h2>Welcome to StarDB</h2>} />
              <Route path="/people" component={PeoplePage} />
              <Route path="/planets" component={PlanetPage} />
              <Route path="/starships" exact component={StarshipsPage} />
              <Route path="/starships/:id" 
                render={({match}) => {
                  const { id } = match.params;
                  console.log('MATCH: ', match)
                  return <StarshipDetails itemId={id}/>
                }} />
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  };
  ;
}
