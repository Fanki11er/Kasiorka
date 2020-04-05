import React from 'react';
import ExpensesModalContext from '../context/ExpensesModalContext';

const withExpensesModalContext = Component => {
  return function contextComponent(props) {
    return (
      <ExpensesModalContext.Consumer>
        {context => <Component {...props} expensesModalContext={context} />}
      </ExpensesModalContext.Consumer>
    );
  };
};

export default withExpensesModalContext;
