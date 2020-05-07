import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { withTheme } from '../../../tools/testUtils';
import ArrowsButton from './ArrowsButton';

afterEach(cleanup);

describe('<ArrowsButtons />', () => {
  const increaseWorkHours = jest.fn();
  const decreaseWorkHours = jest.fn();
  const { getByTestId } = render(
    withTheme(
      <ArrowsButton increaseWorkHours={increaseWorkHours} decreaseWorkHours={decreaseWorkHours} />,
    ),
  );

  test('upButton should be in the document', () => {
    const upButton = getByTestId('up-button');

    expect(upButton).toBeInTheDocument();
    fireEvent.click(upButton);
    expect(increaseWorkHours).toBeCalledTimes(1);
  });

  test('downButton should be in the document', () => {
    render(
      withTheme(
        <ArrowsButton
          increaseWorkHours={increaseWorkHours}
          decreaseWorkHours={decreaseWorkHours}
        />,
      ),
    );
    const downButton = getByTestId('down-button');

    expect(downButton).toBeInTheDocument();
    fireEvent.click(downButton);
    expect(decreaseWorkHours).toBeCalledTimes(1);
  });
});
