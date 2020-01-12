import React from 'react';
//import { render } from '../../../tools/test-tools';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../themes/mainTheme';
import DayName from './DayName';

describe('Day name component', () => {
  test('It has correct background color', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <DayName>Pn</DayName>
        <DayName isSunday={true}>Nd</DayName>
        <DayName isSaturday={true}>So</DayName>
      </ThemeProvider>,
    );

    expect(getByText('Pn')).toHaveStyle(`background-color: ${theme.dayNameColour}`);
    expect(getByText('Nd')).toHaveStyle(`background-color: ${theme.sundayRed}`);
    expect(getByText('So')).toHaveStyle(`background-color: ${theme.saturdayYellow}`);
  });
});
