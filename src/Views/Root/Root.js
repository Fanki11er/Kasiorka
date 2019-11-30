import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../themes/mainTheme';
import GlobalStyle from '../../themes/GlobalStyle';
import HoursView from '../HoursView/HoursView';

function Root() {
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <>
          <HoursView></HoursView>
        </>
      </ThemeProvider>
    </div>
  );
}

export default Root;
