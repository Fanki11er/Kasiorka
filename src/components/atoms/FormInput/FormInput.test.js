import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../themes/mainTheme';
import FormInput from './FormInput';
import { Formik } from 'formik';

describe('Check if "withError" prop works properly', () => {
  test('Input with "withError" property have 0px margin-bottom', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Formik>
          <FormInput withError label="Hasło" type="password" name="password" />
        </Formik>
      </ThemeProvider>,
    );
    expect(getByText('Hasło')).toBeInTheDocument();
    expect(getByText('Hasło')).toHaveStyle(`
    margin-bottom: 0;
    `);
  });
  test('Input without "withError" property have 40px margin-bottom', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Formik>
          <FormInput label="Name" type="password" name="name" />
        </Formik>
      </ThemeProvider>,
    );
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Name')).toHaveStyle(`
    margin-bottom: 40px;
    `);
  });
});
