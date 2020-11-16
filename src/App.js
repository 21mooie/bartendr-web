import React from 'react';
import {Provider} from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import {ConnectedDashboard} from "./components/features/Dashboard/Dashboard";
import { store } from './store/index';
import {ConnectedNavigation} from "./components/features/Navigation/Navigation";
import {ConnectedUser} from "./components/features/User/User";
import Drink from "./components/features/Drink/Drink";
import Search from "./components/features/Search/Search";
import LandingPage from "./components/features/LandingPage/LandingPage";
import NotFound from "./components/features/NotFound/NotFound";
import * as mutations from './store/mutations';
import {Footer} from "./components/features/Footer/Footer";
import { useAuth0 } from "@auth0/auth0-react";



console.log(`Store: ${JSON.stringify(store.getState())}`);
console.log(`You are running in  ${process.env.NODE_ENV}`);
const RouteGuard = Component => ({match}) => {
  // console.info("Route guard", match);
  // if (store.getState().session.authenticated !== mutations.AUTHENTICATED && match.path !== '/') {
  //   //reroute
  //   return <Redirect to="/"/>
  // }
  return <Component match={match} />
}

function App() {
  const { isAuthenticated } = useAuth0();

  function autoLoginUser() {
    console.log(`isAuthenticated: ${isAuthenticated}`);
    if (isAuthenticated) {
      return <Redirect to="/user"/>
    }
  }

  return (
    <Router>
      <Provider store={store}>
        <>
          <ConnectedNavigation showMenuPaths={['/dashboard', '/user', '/drink', '/search']}/>
          {/*Search bar for unauthed users who only want to search*/}
          {/*  Router which switches between components, Guard against auth routes*/}
          {
            autoLoginUser()
          }
          <Switch>
            <Route exact path="/" component={RouteGuard(LandingPage)} />
            <Route path="/dashboard" component={RouteGuard(ConnectedDashboard)} />
            <Route path="/user" component={RouteGuard(ConnectedUser)} />
            <Route path="/search" component={Search} />
            <Route path="/drink" component={Drink} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </>
      </Provider>
    </Router>
  );
}

export default App;
