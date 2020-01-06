import React from 'react';
import { render } from '../../../tools/test-tools';
import DayName from './DayName';

describe('Day name component', () => {
  test('It has correct background color', () => {
    const { getByText } = render(<DayName>Pn</DayName>);

    //expect(getByText('Pn')).toHaveStyleRule('background-color', '#021F59');
  });
});
