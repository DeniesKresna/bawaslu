/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

import LayoutDashboard from '../Layouts/LayoutDashboard';
import LayoutEmpty from '../Layouts/LayoutEmpty';

import InventoryDetail from '../InventoryPage/InventoryDetailPage';
import Inventory from '../InventoryPage';
import HomePage from '../HomePage';
import BarcodePage from '../BarcodePage';
import UnitPage from '../UnitPage';
import RoomPage from '../RoomPage';
import GoodsTypePage from '../GoodsTypePage';
import ConditionPage from '../ConditionPage';
import PeriodInventory from '../PeriodInventoryPage';
import PeriodPage from '../PeriodPage';
import UserPage from '../UserPage';

import LoginPage from '../LoginPage';

export default function App() {

  const innerWidth = window.innerWidth;
  if(innerWidth > 600 && innerWidth < 1800){
    const zoomScale = innerWidth/1800*100;
    document.body.style.zoom = zoomScale + "%";
  }
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          {localStorage.getItem('token') !== null? <Redirect to="/admin/home" />:<Redirect to="/login" />}
        </Route>
        <Route path="/login/:path?" exact>
          <LayoutEmpty>
            <Switch>
                <Route exact path="/login" component={ LoginPage } />
            </Switch>
          </LayoutEmpty>
        </Route>
        <Route path="/admin/:path?/:path?" exact>
          <LayoutDashboard>
            <Switch>
              <Route exact path="/admin/barcode" component={ BarcodePage } />
              <Route exact path="/admin/unit" component={ UnitPage } />
              <Route exact path="/admin/room" component={ RoomPage } />
              <Route exact path="/admin/home" component={ HomePage } />
              <Route exact path="/admin/goods-type" component={ GoodsTypePage } />
              <Route exact path="/admin/condition" component={ ConditionPage } />
              <Route exact path="/admin/period" component={ PeriodPage } />
              <Route exact path="/admin/user" component={ UserPage } />
              <Route exact path="/admin/inventory" component={ Inventory } />
              <Route exact path="/admin/inventory-period" component={ PeriodInventory } />
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
