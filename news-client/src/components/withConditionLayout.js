import React from 'react';

import Loader from './Loader';
import Error from './Error';

const withConditionLayout = Component => {
  return props => {
    if (props.error) {
      return <Error message={props.error?.message} />;
    }

    if (props.isLoading) {
      return <Loader />;
    }

    return <Component {...props} />;
  };
};

export default withConditionLayout;
