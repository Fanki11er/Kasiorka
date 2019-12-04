import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../themes/mainTheme';
import { Provider } from 'react-redux';
import store from '../../store/index';
import GlobalStyle from '../../themes/GlobalStyle';
import HoursView from '../HoursView/HoursView';

function Root() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <>
          <HoursView></HoursView>
        </>
      </ThemeProvider>
    </Provider>
  );
}

export default Root;
