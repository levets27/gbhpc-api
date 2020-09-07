import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Home from 'Components/Home';
import StatList from 'Components/StatList';
import TeamsList from 'Components/TeamsList';
import PlayerInfo from 'Components/PlayerInfo';
import { apiUrl } from 'environment/api';

const Routes = () => (
  <ApolloProvider client={apiUrl}>
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/stats">
          <StatList />
        </Route>
        <Route path="/teams">
          <TeamsList />
        </Route>
        <Route path="/player/:id">
          <PlayerInfo />
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>
);

export default Routes;
