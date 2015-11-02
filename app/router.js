import React from 'react';
import {RouteHandler} from 'react-router';
import Navbar from './components/common/header';

class Router extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <RouteHandler />
      </div>
    );
  }
}

export default Router;
