import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { store } from './store/index';

console.log(store.getState());

function App() {
  const clickMe = () => {
    console.log('i was clicked');
  }
  return (

    <div className="App">
      <div className="hello">
      <p>Hello this is my cocktail app.</p>
      {/*Search bar for unauthed users who only want to search*/}
      <Button variant="contained" color="primary" onClick={() => clickMe()}>
        Log in
      </Button>
      <Button variant="contained" color="primary">
        Sign up
      </Button>
      </div>
    </div>

  );
}

export default App;
