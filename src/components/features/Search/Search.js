import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import CircularProgress from '@material-ui/core/CircularProgress';

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
      searchInProgress: false,
    };
  };

  componentDidMount() {
    if (this.props.location.state.searchVal) {
      this.sendQuery(this.props.location.state.searchVal);
    }
  }

  componentDidUpdate(prevProps) {
    console.log(this.props);
    if (this.props.location.state.searchVal !== prevProps.location.state.searchVal) {
      this.sendQuery(this.props.location.state.searchVal);
    }
  }

  sendQuery(query) {
    this.setState({searchInProgress: true})
    axios.post(`${url}/query/string`, {query})
      .then(({data}) => {
        console.log(data);
        if (data.drinkResults.drinks) {
          this.setState({
            drinkResults: data.drinkResults,
            searchPerformed: true,
            searchInProgress: false
          });
        } else {
          this.setState({
            drinkResults: {
              drinks: [],
            },
            searchPerformed: true,
            searchInProgress: false
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
                <img className='search__notfound__image' src={image} alt='Data not found'/>
                <p className='search__notfound__text'>Sorry, we couldn't find {this.props.location.state.searchVal}</p>
              </div>
            :
              this.state.searchInProgress ?
                <div className='search__loading'>
                  <CircularProgress size='80px'/>
                  <p className='search__loading_text'>Loading...</p>
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
