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

import InventoryDetail from '../InventoryPage/InventoryDetailPage';
import Inventory from '../InventoryPage';
import HomePage from '../HomePage';
import UnitPage from '../UnitPage';
import RoomPage from '../RoomPage';
import GoodsTypePage from '../GoodsTypePage';
import ConditionPage from '../ConditionPage';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/admin/:path?/:path?" exact>
          <LayoutDashboard>
            <Switch>
              <Route exact path="/admin/home" component={ HomePage } />
              <Route exact path="/admin/unit" component={ UnitPage } />
              <Route exact path="/admin/room" component={ RoomPage } />
              <Route exact path="/admin/goods-type" component={ GoodsTypePage } />
              <Route exact path="/admin/condition" component={ ConditionPage } />
              <Route exact path="/admin/inventory" component={ Inventory } />
              <Route exact path="/admin/inventory/create" component={ InventoryDetail } />
              <Route path="/admin/inventory/detail" component={ InventoryDetail } />
              <Route component={NotFoundPage} />
            </Switch>
          </LayoutDashboard>
        </Route>
      </Switch>
      <GlobalStyle />
    </div>
  );
}
