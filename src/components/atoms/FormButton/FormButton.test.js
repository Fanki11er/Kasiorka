import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../themes/mainTheme';
import FormButton from './FormButton';

test('Is prop "Green" works properly', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <FormButton>Login</FormButton>
      <FormButton green="true">Register</FormButton>
    </ThemeProvider>,
  );

  expect(getByText('Login')).toBeInTheDocument();
  expect(getByText('Login')).toHaveStyle(`
  color: ${theme.menuBlue};
  border: 2px solid ${theme.menuBlue};
  `);

  expect(getByText('Register')).toHaveStyle(`
  color: ${theme.green};
  border: 2px solid ${theme.green};
  `);
});
