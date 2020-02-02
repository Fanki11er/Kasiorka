import React from 'react';
import styled from 'styled-components';
import ExpensesRow from '../../atoms/ExpenseRow/ExpenseRow';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  display: flex;
  width: 95%;
  justify-content: ${({ predicted }) => (predicted === undefined ? 'flex-start' : 'space-between')};
  padding-left: 40px;
  margin: 10px 0;
  align-items: center;
`;

const StyledLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  color: ${({ theme }) => theme.menuBlue};
  margin-right: 10px;
`;

const StyledNumbers = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  color: ${({ theme, received, predicted }) =>
    received || predicted !== undefined ? theme.green : theme.lighterGreen};
  margin-right: 5px;
`;

const MoneyRow = ({
  label,
  content: { payment, received, real, predicted, percentage },
  units,
}) => {
  const formatData = (real, predicted) => {
    return `${real} ${units} / ${predicted} ${units}`;
  };

  return (
    <StyledWrapper predicted={predicted}>
      <StyledLabel>{label}</StyledLabel>
      {payment !== undefined && <StyledNumbers received={received}>{payment}</StyledNumbers>}
      {predicted !== undefined && (
        <ExpensesRow percentage={percentage} text={formatData(real, predicted)} />
      )}
      {units && predicted === undefined && <StyledNumbers received={true}>{units}</StyledNumbers>}
    </StyledWrapper>
  );
};

MoneyRow.propTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  units: PropTypes.string,
};

export default MoneyRow;
