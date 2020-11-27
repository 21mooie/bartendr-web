import React from 'react';
import {Provider} from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import {ConnectedDashboard} from "./components/features/Dashboard/Dashboard";
import { store } from './store/index';
import {ConnectedNavigation} from "./components/features/Navigation/Navigation";
import {ConnectedUser} from "./components/features/User/User";
import Drink from "./components/features/Drink/Drink";
import Search from "./components/features/Search/Search";
import LandingPage from "./components/features/LandingPage/LandingPage";
import NotFound from "./components/features/NotFound/NotFound";
import {Footer} from "./components/features/Footer/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";



console.log(`Store: ${JSON.stringify(store.getState())}`);
console.log(`You are running in  ${process.env.NODE_ENV}`);

function App() {

  return (
    <Router>
      <Provider store={store}>
        <>
          <ConnectedNavigation showMenuPaths={['/dashboard', '/user', '/drink', '/search']}/>
          {/*Search bar for unauthed users who only want to search*/}
          {/*  Router which switches between components, Guard against auth routes*/}
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <ProtectedRoute path="/dashboard" component={ConnectedDashboard} />
            <Route path="/user/:username" component={ConnectedUser} />
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
