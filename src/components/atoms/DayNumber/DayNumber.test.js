import React from 'react';
import { render } from '@testing-library/react';
import { withTheme } from '../../../tools/testUtils';
import DayNumber from './DayNumber';

describe('<DayNumber />', () => {
  const { queryByText } = render(withTheme(<DayNumber>0</DayNumber>));
  test('should be in the document', () => {
    expect(queryByText(/0/i)).toBeInTheDocument();
  });
});
