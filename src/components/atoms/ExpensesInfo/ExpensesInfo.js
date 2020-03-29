import React from 'react';
import ExpensesWrapper from '../../atoms/ExpensesWrapper/ExpensesWrapper';
import ExpensesSign from '../../atoms/ExpensesSign/ExpensesSign';
import StyledInfo from '../../atoms/StyledInfo/StyledInfo';
import PropTypes from 'prop-types';

const ExpensesInfo = ({ predicted, real, percentage, units }) => {
  return (
    <ExpensesWrapper>
      <StyledInfo>
        {`${real}
         ${units}`}
      </StyledInfo>
      <ExpensesSign>/</ExpensesSign>
      <StyledInfo>
        {`${predicted}
         ${units}`}
      </StyledInfo>
      <StyledInfo>{percentage} %</StyledInfo>
    </ExpensesWrapper>
  );
};

ExpensesInfo.propTypes = {
  predicted: PropTypes.number,
  real: PropTypes.number,
  percentage: PropTypes.number,
  units: PropTypes.string,
};

export default ExpensesInfo;
