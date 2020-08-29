import React from 'react';
import {Provider} from "react-redux";
import { Router, Route, Switch } from 'react-router-dom';

import './App.css';
import {ConnectedDashboard} from "./components/Dashboard/Dashboard";
import { store } from './store/index';

import {history} from "./store/history";
import Login from "./components/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import User from "./components/User/User";
import Drink from "./components/Drink/Drink";
import Search from "./components/Search/Search";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";



console.log(store.getState());

function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <Navigation />
          {/*Search bar for unauthed users who only want to search*/}
          {/*  Router which switches between components, Guard against auth routes*/}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={ConnectedDashboard}/>
            <Route path="/login" component={Login} />
            <Route path="/user" component={User} />
            <Route path="/drink" component={Drink} />
            <Route path="/search" component={Search} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
