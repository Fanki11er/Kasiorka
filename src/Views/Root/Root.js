import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../themes/mainTheme';
import GlobalStyle from '../../themes/GlobalStyle';
import DayNumber from '../../components/atoms/DayNumber/DayNumber';

function Root() {
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <>
          <DayNumber>10</DayNumber>
        </>
      </ThemeProvider>
    </div>
  );
}

export default Root;
