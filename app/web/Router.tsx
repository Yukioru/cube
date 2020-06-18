import React from 'react';
import { Switch, Route } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const Router = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  );
};

export default Router;
