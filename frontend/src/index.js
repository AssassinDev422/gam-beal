import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, IndexRoute } from 'react-router';
import history from './router/history';
import App from './components/App';
import store from './store/store';

import * as authActions from './actions/auth';

import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import UsersPage from './components/pages/UsersPage';
import RestaurantsPage from './components/pages/RestaurantsPage';
import OffersPage from './components/pages/OffersPage';
import ReceiptPage from './components/pages/ReceiptPage';
import WithdrawPage from './components/pages/WithdrawalPage';
import RatingsPage from './components/pages/RatingsPage';
import OffersFormPage from './components/pages/OffersFormPage';
import PushFormPage from './components/pages/PushFormPage';
import ReceiptViewPage from './components/pages/ReceiptViewPage';
import RequestViewPage from './components/pages/RequestViewPage';
import UserViewPage from './components/pages/UserViewPage';
import RestaurantFormPage from './components/pages/RestaurantFormPage';
import NotFoundPage from './components/pages/NotFoundPage';

const requireLogin = (nextState, replaceState, cb) => {
  const {auth: {logged_in}} = store.getState();

  if (logged_in) {
    cb();
  } else {
    store.dispatch(authActions.loginThen(nextState.location.pathname));
  }
}

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>

	        <Route path="login" component={LoginPage} />

          <Route onEnter={requireLogin}>
            <IndexRoute component={HomePage} />
            <Route path="home" component={HomePage} />
            <Route path="users">
              <IndexRoute component={UsersPage}/>
              <Route path=":userID" component={UserViewPage}/>
            </Route>
            <Route path="ratings" component={RatingsPage} />
            <Route path="notifications" component={PushFormPage} />
            <Route path="restaurants">
              <IndexRoute component={RestaurantsPage}/>
              <Route path="create" component={RestaurantFormPage} />
              <Route path=":restaurantID" component={RestaurantFormPage} />
            </Route>
            <Route path="offers">
              <IndexRoute component={OffersPage}/>
              <Route path="create" component={OffersFormPage} />
              <Route path=":offerID" component={OffersFormPage} />
            </Route>
            <Route path="receipts">
              <IndexRoute component={ReceiptPage}/>
              <Route path=":receiptID" component={ReceiptViewPage} />
            </Route>
            <Route path="withdrawals">
              <IndexRoute component={WithdrawPage}/>
              <Route path=":requestID" component={RequestViewPage} />
            </Route>
          </Route>
        </Route>
        <Route path="*" component={NotFoundPage} />
      </Router>
    </Provider>
  </div>,
  document.getElementById('root')
);
