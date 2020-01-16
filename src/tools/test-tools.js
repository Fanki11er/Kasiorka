/*import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebaseConfig from '../firebase/firebaseConfig';
import { rrfConfig } from '../firebase/firebaseConfig';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch } from 'react-router-dom';
import { theme } from '../themes/mainTheme';
import GlobalStyle from '../themes/GlobalStyle';
import store from '../store/index';

const AllTheProviders = () => {
  return <ThemeProvider theme={theme}></ThemeProvider>;
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };*/
