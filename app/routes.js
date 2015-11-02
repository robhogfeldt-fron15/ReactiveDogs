

import React from 'react';
import {Route} from 'react-router';
import Router from './router';
import App from './App';
import Home from './components/Home';
import MyDogs from './components/MyDogs';
import MyEvents from './components/MyEvents';



export default (
  <Route handler={Router}>
    <Route path='/' name='app' handler={Home} />
    <Route name='setup' handler={App} />
    <Route name='mydogs' handler={MyDogs} />
    <Route name='myevents' handler={MyEvents} />
  </Route>
);
