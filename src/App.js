import React from 'react';
import {Provider} from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import './App.css';
import {ConnectedDashboard} from "./components/features/Dashboard/Dashboard";
import { store } from './store/index';
import {ConnectedLogin} from "./components/features/Login/Login";
import {ConnectedNavigation} from "./components/features/Navigation/Navigation";
import {ConnectedUser} from "./components/features/User/User";
import Drink from "./components/features/Drink/Drink";
import Search from "./components/features/Search/Search";
import LandingPage from "./components/features/LandingPage/LandingPage";
import NotFound from "./components/features/NotFound/NotFound";
import {ConnectedSignup} from "./components/features/Signup/Signup";
import * as mutations from './store/mutations';



console.log(store.getState());
const RouteGuard = Component => ({match}) => {
  console.info("Route guard", match);
  if (store.getState().session.authenticated !== mutations.AUTHENTICATED && match.path !== '/') {
    //reroute
    return <Redirect to="/login"/>
  }
  return <Component match={match} />
}

function App() {
  const [cookies, setCookie] = useCookies(['token']);

  function autoLoginUser() {
    if (cookies.token) {
      return <Redirect to={{pathname: "/login", state: { token: cookies.token }}}/>
    }
  }

  return (
    <Router>
      <Provider store={store}>
        <div className="app">
          <ConnectedNavigation showMenuPaths={['/dashboard', '/user', '/drink', '/search']}/>
          {/*Search bar for unauthed users who only want to search*/}
          {/*  Router which switches between components, Guard against auth routes*/}
          {
            autoLoginUser()
          }
          <Switch>
            <Route exact path="/" component={RouteGuard(LandingPage)} />
            <Route path="/login" component={ConnectedLogin}/>
            <Route path="/signup" component={ConnectedSignup} />
            <Route path="/dashboard" component={RouteGuard(ConnectedDashboard)} />
            <Route path="/user" component={RouteGuard(ConnectedUser)} />
            <Route path="/search" component={Search} />
            <Route path="/drink" component={Drink} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
