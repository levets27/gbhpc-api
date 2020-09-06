import React from 'react';
import { Location, Router } from '@reach/router';
import Home from './home';
import Stats from './stats';
import Teams from './teams';

const Index = () => (
  <Location>
    {({ location }) => (
      <Router location={location} className="router">
        <Home path="/" />
        <Stats path="/stats" />
        <Teams path="/teams" />
      </Router>
    )}
  </Location>
);

export default Index;
