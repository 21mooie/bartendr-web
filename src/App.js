import React, {useEffect, useState} from 'react';
import {Provider} from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import './App.css';
import {ConnectedDashboard} from "./components/Dashboard/Dashboard";
import { store } from './store/index';
import {ConnectedLogin} from "./components/Login/Login";
import {ConnectedNavigation} from "./components/Navigation/Navigation";
import {ConnectedUser} from "./components/User/User";
import Drink from "./components/Drink/Drink";
import Search from "./components/Search/Search";
import LandingPage from "./components/LandingPage/LandingPage";
import NotFound from "./components/NotFound/NotFound";
import {ConnectedSignup} from "./components/Signup/Signup";
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
  const [token, setToken] = useState(false);

  useEffect(() => {
    console.log('token:', cookies.token);
    if (cookies.token) {
      setToken(cookies.token);
    }
  }, []);

  function autoLoginUser() {
    if (token) {
      return <Redirect to={{pathname: "/login", state: { token }}}/>
    }
  }

  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <ConnectedNavigation navUrls={['/dashboard', '/user', '/drink', '/search']}/>
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
