import React from 'react';
import { render } from '@testing-library/react';
import Input from './testComponent';

describe('First test', () => {
  test('It works', () => {
    const { getByTestId } = render(<Input />);
    expect(getByTestId('test-input')).toBeInTheDocument();
  });
});
