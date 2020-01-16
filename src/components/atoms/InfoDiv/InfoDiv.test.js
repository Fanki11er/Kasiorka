import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../themes/mainTheme';
import InfoDiv from './InfoDiv';
import SummaryContext from '../../../context/SummaryContext';

test('Is editable input appearing', () => {
  const fakeTest = () => {
    return 0;
  };
  const summaryContext = {
    toggleEditSummaryModal: fakeTest,
  };
  const labelText = 'Test';
  const labelText2 = 'Test2';

  const { getByTitle, queryByTitle } = render(
    <ThemeProvider theme={theme}>
      <SummaryContext.Provider value={summaryContext}>
        <InfoDiv
          labelText={labelText}
          labelData={10}
          editable={true}
          units="tests"
          summaryContext
          chosenOption="test"
        />
        <InfoDiv
          labelText={labelText2}
          labelData={15}
          editable={false}
          units="tests"
          summaryContext
          chosenOption="test"
        />
      </SummaryContext.Provider>
    </ThemeProvider>,
  );

  expect(getByTitle(`Edytuj ${labelText}`)).toBeInTheDocument();
  expect(queryByTitle(`Edytuj ${labelText2}`)).not.toBeInTheDocument();
});
