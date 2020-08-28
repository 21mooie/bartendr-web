import React from 'react';
import {Provider} from "react-redux";

import './App.css';
import {Home} from "./components/Home/Home";
import {ConnectedDashboard} from "./components/Dashboard/Dashboard";
import { store } from './store/index';



console.log(store.getState());

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/*Search bar for unauthed users who only want to search*/}
        {/*  Router which switches between components, Guard against auth routes*/}
        <Home />
        <ConnectedDashboard />
      </div>
    </Provider>
  );
}

export default App;
