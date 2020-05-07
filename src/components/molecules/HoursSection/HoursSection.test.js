import React from 'react';
import { render } from '@testing-library/react';
import HoursSection from './HoursSection';

describe('<Hours section>', () => {
  const rendered = render(<HoursSection />);
  const { queryByTestId } = rendered;

  const placeholder = queryByTestId('test');
  test('without props is rendering placeholder', () => {
    expect(placeholder).toBeInTheDocument();
  });
});
