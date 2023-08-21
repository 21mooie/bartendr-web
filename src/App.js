import React from 'react';
import {Provider} from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import {ConnectedDashboard} from "./components/features/Dashboard/Dashboard";
import { store } from './store/store';
import {ConnectedNavigation} from "./components/features/Navigation/Navigation";
import {ConnectedUser} from "./components/features/User/User";
import SearchWithRouter from "./components/features/Search/Search";
import LandingPage from "./components/features/LandingPage/LandingPage";
import NotFound from "./components/features/NotFound/NotFound";
import {Footer} from "./components/features/Footer/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";
import Explore from "./components/features/Explore/Explore";
import ConnectedDrink from "./components/features/Drink/Drink";
import ConnectedSignup from './components/features/Signup/Signup';
import ConnectedLogin from './components/features/Login/Login';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';



console.log(`Store: ${JSON.stringify(store.getState())}`);
console.log(`You are running in  ${process.env.NODE_ENV}`);

function App() {

  return (
    <Router>
      <Provider store={store}>
        <>
          <ConnectedNavigation showMenuPaths={['/dashboard', '/user', '/drink', '/search', '/explore']}/>
          {/*Search bar for unauthed users who only want to search*/}
          {/*  Router which switches between components, Guard against auth routes*/}
          <ScrollToTop />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <ProtectedRoute path="/dashboard" component={ConnectedDashboard} />
            <Route path="/user/:username" component={ConnectedUser} />
            <Route path="/search" component={SearchWithRouter} />
            <Route path="/drink/:idDrink" component={ConnectedDrink} />
            <Route path="/ingredient" component={ConnectedDrink} />
            <Route path="/explore" component={Explore} />
            <Route path="/login" component={ConnectedLogin} />
            <Route path="/signup" component={ConnectedSignup} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </>
      </Provider>
    </Router>
  );
}

export default App;
