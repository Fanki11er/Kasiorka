import React from 'react';
import SummaryContext from '../context/SummaryContext';

const withSummaryContext = Component => {
  return function contextComponent(props) {
    return (
      <SummaryContext.Consumer>
        {context => <Component {...props} summaryContext={context} />}
      </SummaryContext.Consumer>
    );
  };
};

export default withSummaryContext;
