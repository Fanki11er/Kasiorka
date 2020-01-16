import React from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import WaitingScreen from '../../molecules/WaitingScreen/WaitingScreen';

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) return <WaitingScreen innerImage="padlock" />;
  return children;
}

export default AuthIsLoaded;
