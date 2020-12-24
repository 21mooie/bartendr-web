import React, {useState} from 'react';
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import './SearchBar.css';

function SearchBar({searchVal, setSearchVal, performSearch, show, smallScreen, showFullSearchBar, toggleFullSearchBar}) {
  return (
    <>
      {
        show ?
          <div className={`search_bar ${showFullSearchBar ? 'search_bar__full_flex' : ''}`}>
            {
              smallScreen ?
                <>
                {
                  showFullSearchBar ?
                    <div className="search_bar__small_screen search_bar__full_flex">
                      <ChevronLeftIcon
                        onClick={() => toggleFullSearchBar(false)}
                      />
                      <SearchBar
                        searchVal={searchVal}
                        setSearchVal={setSearchVal}
                        performSearch={performSearch}
                        show={true}
                      />
                    </div>
                  :
                    <SearchIcon
                      onClick={() => toggleFullSearchBar(true)}
                      style={{paddingRight: 15}}
                    />
                }
                </>
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
