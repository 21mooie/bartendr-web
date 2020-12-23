import React from 'react';
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import './SearchBar.css';

function SearchBar({searchVal, setSearchVal, performSearch}) {
  return (
    <div className="search_bar">
      <Input
        placeholder="Search ..."
        value={searchVal}
        onChange={(event) => setSearchVal(event.target.value)}
      />
      <Button onClick={() => performSearch()}>
        <SearchIcon />
      </Button>
    </div>
  );
}

export default SearchBar;
