import React from 'react';
import { store } from './store/index';

import './App.css';
import {Home} from "./components/Home/Home";
import {Dashboard} from "./components/Dashboard/Dashboard";


console.log(store.getState());

function App() {
  return (

    <div className="App">
      {/*Search bar for unauthed users who only want to search*/}
      {/*  Router which switches between components, Guard against auth routes*/}
      <Home />
      <Dashboard />
    </div>
  );
}

export default App;
