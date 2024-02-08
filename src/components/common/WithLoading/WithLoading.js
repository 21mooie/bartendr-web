import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './WithLoading.css';

const WithLoading = (Component) => {
  return ({ isLoading, initialLoad, ...props }) => {
    if (!isLoading) return (<Component {...props} />);
    if (isLoading && initialLoad) {
      return (
        <div className='withLoading'>
          <div className='withLoading__content'>
            <span>Loading</span>
            <CircularProgress />
          </div>
        </div>
      );
    }
    if (isLoading && !initialLoad) {
      return (
        <div className='withLoading'>
          <div className='withLoading__content'>
            <Component {...props} />
            <span>Loading</span>
            <CircularProgress />
          </div>
        </div>
      );
    }
  }
}

export default WithLoading;