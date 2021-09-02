/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

import LayoutDashboard from '../Layouts/LayoutDashboard';

import HomePage from '../HomePage';
import UnitPage from '../UnitPage';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/admin/:path?" exact>
          <LayoutDashboard>
            <Switch>
              <Route exact path="/admin/home" component={ HomePage } />
              <Route exact path="/admin/unit" component={ UnitPage } />
              <Route component={NotFoundPage} />
            </Switch>
          </LayoutDashboard>
        </Route>
      </Switch>
      <GlobalStyle />
    </div>
  );
}
