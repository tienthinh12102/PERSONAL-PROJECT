import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from "../Admin/Main/Dashboard/Dashboard";

const Admins = () => {
  return (
    <div>
      <React.Fragment>
        <Switch>
          <Route path="/admin">
            <Dashboard />
          </Route>
        </Switch>
      </React.Fragment>
    </div>
  );
};

export default Admins;
