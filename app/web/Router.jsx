import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import Home from './pages/Home';

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  );
};

export default Router;
