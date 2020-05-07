import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../themes/mainTheme';
import { createNewYear, monthNames, User } from './index';

export const createMockedStore = (...args) => {
  const initialState = {};
  args.forEach(([property, value]) => {
    initialState[property] = value;
  });
  return initialState;
};

export const mockedHours = createNewYear(monthNames, 2020);
export const mockedUser = new User('TestUser', ['2020']);

export const withTheme = (children) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
