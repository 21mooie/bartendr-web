import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import axios from 'axios';

import './Search.css';
import {url} from "../../../consts";
import DrinkCard from "../../common/DrinkCard/DrinkCard";


const useStyles = theme => ({
  input: {
    width: 350,
    color: 'white',
  }
});

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      drinkResults: {
        drinks: []
      },
    };
  };

  sendQuery() {
    axios.post(`${url}/query/string`, {query: this.state.searchVal})
      .then(({data}) => {
        console.log(data);
        if (data.drinkResults.drinks) {
          this.setState({drinkResults: data.drinkResults});
        } else {
          this.setState({drinkResults: { drinks: [] }});
        }
      });
  }


  render() {
    return (
      <div className='search'>
        <div className='search__container'>
          <Input
            className={this.props.classes.input}
            placeholder="Search ..."
            value={this.state.value}
            onChange={(event) => this.setState({searchVal: event.target.value})}
          />
          <button
            onClick={() => this.sendQuery()}
          >
            <SearchIcon />
          </button>
        </div>
        <div className='search__resultsContainer'>
          {
            this.state.drinkResults.drinks.map(drink => (
              <DrinkCard key={drink.idDrink} drink={drink}/>
            ))
          }
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles)(Search);
