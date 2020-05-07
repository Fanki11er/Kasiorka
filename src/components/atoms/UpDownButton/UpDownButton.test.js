import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { withTheme } from '../../../tools/testUtils';
import UpDownButton from './UpDownButton';
afterEach(cleanup);
describe('<UpDownButton />', () => {
  const { queryByRole } = render(withTheme(<UpDownButton upButton />));

  const button = queryByRole('button');

  test('should be in the document', () => {
    expect(button).toBeInTheDocument();
  });

  test('To have upArrow image', () => {
    expect(button).toHaveStyle(`background-image: url(UpArrow.svg)`);
  });
});
