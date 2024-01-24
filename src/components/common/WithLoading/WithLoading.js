import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './WithLoading.css';

const WithLoading = (Component) => {
  return ({ isLoading, ...props }) => {
    if (!isLoading) return (<Component {...props} />);
    return (
      <div className='withLoading'>
        <div className='withLoading__content'>
          <span>Loading</span>
          <CircularProgress />
        </div>
      </div>
    );
  }
}

export default WithLoading;