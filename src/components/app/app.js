import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import ErrorBoundary from '../error-boundary';
import { SwapiServiceProvider } from '../swapi-service-context';
import { PeoplePage, PlanetPage, StarshipsPage, LoginPage, SecretPage } from '../pages';
import { StarshipDetails } from '../sw-components';


export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  render() {

    const { swapiService, isLoggedIn } = this.state;

    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={swapiService}>
          <Router>
            <div className="app" >
              <Header onServiceChange={this.onServiceChange}/>
              <RandomPlanet />

              <Switch>
                <Route path="/" exact render={() => <h2>Welcome to StarDB</h2>} />
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets" component={PlanetPage} />
                <Route path="/starships" exact component={StarshipsPage} />
                <Route path="/starships/:id" 
                  render={({match}) => {
                    const { id } = match.params;
                    return <StarshipDetails itemId={id}/>
                  }} />

                <Route 
                  path="/login" 
                  render={()=> (
                    <LoginPage 
                      isLoggedIn={isLoggedIn} 
                      onLogin={this.onLogin}/>
                  )} />

                <Route 
                  path="/secret" 
                  render={()=> (
                    <SecretPage isLoggedIn={isLoggedIn}/>
                  )}/>

                <Route render={() => <h2>Page not found</h2>} />
              </Switch>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  };
  ;
}
