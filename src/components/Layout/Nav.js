import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/stats">Stats</Link>
    <Link to="/teams">Teams</Link>
    <Link to="/player/1">Steve Leach</Link>
  </nav>
);

export default Nav;
