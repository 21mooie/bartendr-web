import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from "react-router";

import './Search.css';
import { url } from "../../../consts";
import DrinkCard from "../../common/DrinkCard/DrinkCard";
import image from "../../../images/undraw_wine_tasting_30vw.svg";


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      drinkResults: {
        drinks: []
      },
      searchPerformed: false,
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
          this.setState({
            drinkResults: data.drinkResults,
            searchPerformed: true
          });
        } else {
          this.setState({
            drinkResults: {
              drinks: [],
            },
            searchPerformed: true
          });
        }
      });
  }


  render() {
    return (
      <div className='search'>
        <div>
          {

            this.state.drinkResults.drinks.length === 0 && this.state.searchPerformed ?
              <div className='search__emptyResultsContainer'>
                <img className='search__notfound__image' src={image} />
                <p className='search__notfound__text'>Sorry, we couldn't find {this.props.location.state.searchVal}</p>
              </div>
            :
              <div className='search__resultsContainer'>
                {
                  this.state.drinkResults.drinks.map(drink => (
                    <DrinkCard key={drink.idDrink} drink={drink}/>
                  ))
                }
              </div>
          }
        </div>
      </div>
    )
  }
}

const SearchWithRouter = withRouter(Search);
export default SearchWithRouter;
