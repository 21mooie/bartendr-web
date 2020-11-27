import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import axios from 'axios';

import './Search.css';
import {url} from "../../../consts/consts";


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
      searchVal: ''
    };
  };

  sendQuery() {
    axios.post(`${url}/search`, {query: this.state.searchVal})
      .then((data) => {
        console.log(data);
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
      </div>
    )
  }
}

export default withStyles(useStyles)(Search);
