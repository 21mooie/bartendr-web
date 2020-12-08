import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from "react-router";

import './Search.css';
import { url } from "../../../consts";
import DrinkCard from "../../common/DrinkCard/DrinkCard";


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

  componentDidMount() {
    this.sendQuery(this.props.location.state.searchVal);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.state.searchVal !== prevProps.location.state.searchVal) {
      this.sendQuery(this.props.location.state.searchVal);
    }
  }

  sendQuery(query) {
    axios.post(`${url}/query/string`, {query})
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
          {this.props.location.state.searchVal}
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

const SearchWithRouter = withRouter(Search);
export default SearchWithRouter;
