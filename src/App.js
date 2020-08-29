import React from 'react';
import {Provider} from "react-redux";

import './App.css';
import {Home} from "./components/Home/Home";
import {ConnectedDashboard} from "./components/Dashboard/Dashboard";
import { store } from './store/index';
import { Router, Route } from 'react-router-dom';
import {history} from "./store/history";
import Login from "./components/Login/Login";
import {Navigation} from "./components/Navigation/Navigation";



console.log(store.getState());

function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <Navigation />
          {/*Search bar for unauthed users who only want to search*/}
          {/*  Router which switches between components, Guard against auth routes*/}
          <Route exact path="/" render={() => ( <Home /> ) } />
          <Route path="/dashboard" render={() => (<ConnectedDashboard />)}/>
          <Route path="/login" render={() => (<Login />)} />
        </div>
      </Provider>
    </Router>
  );
}

export default App;
