import React from 'react';
import {Provider} from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import {ConnectedDashboard} from "./components/Dashboard/Dashboard";
import { store } from './store/index';
import Login from "./components/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import {ConnectedUser} from "./components/User/User";
import Drink from "./components/Drink/Drink";
import Search from "./components/Search/Search";
import LandingPage from "./components/LandingPage/LandingPage";
import NotFound from "./components/NotFound/NotFound";
import Signup from "./components/Signup/Signup";



console.log(store.getState());

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Navigation navUrls={['/dashboard', '/user', '/drink', '/search']}/>
          {/*Search bar for unauthed users who only want to search*/}
          {/*  Router which switches between components, Guard against auth routes*/}
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/dashboard" component={ConnectedDashboard} />
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup} />
            <Route path="/user" component={ConnectedUser} />
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
