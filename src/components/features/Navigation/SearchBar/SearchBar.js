import React from 'react';
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import './SearchBar.css';

function SearchBar({searchVal, setSearchVal, performSearch, show, smallScreen}) {
  return (
    <>
      {
        show ?
          <div className="search_bar">
            {
              smallScreen ?
                <SearchIcon />
                :
                <>
                  <Input
                    placeholder="Search ..."
                    value={searchVal}
                    onChange={(event) => setSearchVal(event.target.value)}
                  />

                  <Button
                    onClick={() => performSearch()}
                  >

                    <SearchIcon />
                  </Button>
                </>
            }
          </div>
          :
          null
      }
    </>
  );
}

export default SearchBar;
