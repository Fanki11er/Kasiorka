import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../themes/mainTheme';
import GlobalStyle from '../../themes/GlobalStyle';
import DayNumber from '../../components/atoms/DayNumber/DayNumber';
import DayName from '../../components/atoms/DayName/DayName';
import NumberOfHours from '../../components/atoms/NumberOfHours/NumberOfHours';
import ArrowsButton from '../../components/molecules/ArrowsButton/ArrowsButton';

function Root() {
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <>
          <DayNumber>10</DayNumber>
          <DayName>PN</DayName>
          <DayName holiday>ND</DayName>
          <NumberOfHours>0</NumberOfHours>
          <ArrowsButton />
        </>
      </ThemeProvider>
    </div>
  );
}

export default Root;
