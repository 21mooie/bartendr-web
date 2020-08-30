import React from 'react';
import {Provider} from "react-redux";
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import {ConnectedDashboard} from "./components/Dashboard/Dashboard";
import { store } from './store/index';
import {ConnectedLogin} from "./components/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import {ConnectedUser} from "./components/User/User";
import Drink from "./components/Drink/Drink";
import Search from "./components/Search/Search";
import LandingPage from "./components/LandingPage/LandingPage";
import NotFound from "./components/NotFound/NotFound";
import Signup from "./components/Signup/Signup";
import {history} from "./utils/history";



console.log(store.getState());
const RouteGuard = Component => ({match}) => {
  console.info("Route guard", match);
  if (!store.getState().session.authenticated) {
    //reroute
    return <Redirect to="/login"/>
  }
  return <Component match ={match} />
}

function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <Navigation navUrls={['/dashboard', '/user', '/drink', '/search']}/>
          {/*Search bar for unauthed users who only want to search*/}
          {/*  Router which switches between components, Guard against auth routes*/}
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/dashboard" component={RouteGuard(ConnectedDashboard)} />
            <Route path="/login" component={ConnectedLogin}/>
            <Route path="/signup" component={Signup} />
            <Route path="/user" component={RouteGuard(ConnectedUser)} />
            <Route path="/drink" component={Drink} />
            <Route path="/search" component={Search} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
