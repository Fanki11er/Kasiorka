import React from 'react';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';

function StateIsLoaded({ children, ready }) {
  const yearsList = useSelector(state => state.user.yearsList);

  if (isEmpty(yearsList)) return <div>Loading years</div>;

  return children;
}

export default StateIsLoaded;
