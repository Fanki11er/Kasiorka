import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'react-redux-firebase';
import WaitingScreen from '../../molecules/WaitingScreen/WaitingScreen';

function StateIsLoaded({ children }) {
  const yearsList = useSelector(state => state.user.yearsList);
  const money = useSelector(state => state.money.months);

  if (isEmpty(yearsList && money)) return <WaitingScreen innerImage="sync" />;
  return children;
}

export default StateIsLoaded;
