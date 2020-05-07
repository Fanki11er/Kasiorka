import React from 'react';
import { render } from '@testing-library/react';
import { withTheme } from '../../../tools/testUtils';
import NumberOfHours from './NumberOfHours';

describe('<NumberOfHours />', () => {
  const { queryByText } = render(withTheme(<NumberOfHours>0</NumberOfHours>));
  test('should be in the document', () => {
    expect(queryByText(/0/i)).toBeInTheDocument();
  });
});
