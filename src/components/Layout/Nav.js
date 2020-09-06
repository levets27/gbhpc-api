import React from 'react';
import { Link } from '@reach/router';

const Nav = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/stats">Stats</Link>
    <Link to="/teams">Teams</Link>
  </nav>
);

export default Nav;
