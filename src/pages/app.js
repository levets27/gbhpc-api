import React from 'react';
import { Location, Router } from '@reach/router';
import Home from '../components/Home';
import StatList from '../components/StatList';
import TeamsList from '../components/TeamsList';
import PlayerInfo from '../components/PlayerInfo';
import { apiUrl } from '../environment/api';

const Index = () => (
  <ApolloProvider client={apiUrl}>
    <Location>
      {({ location }) => (
        <Router location={location} basepath="/app" className="router">
          <Home path="/" />
          <StatList path="/stats" />
          <TeamsList path="/teams" />
          <PlayerInfo path="/player/:id" />
        </Router>
      )}
    </Location>
  </ApolloProvider>
);

export default Index;
