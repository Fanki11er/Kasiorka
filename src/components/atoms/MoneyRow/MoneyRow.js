import React from 'react';
import styled from 'styled-components';
import ExpensesRow from '../../atoms/ExpenseRow/ExpenseRow';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  width: 100%;
  justify-content: ${({ predicted }) => (predicted === undefined ? 'flex-start' : 'space-around')};
  padding: 0 10px;
  margin: 10px 0 0 0;
  align-items: center;
`;

const StyledLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  color: ${({ theme }) => theme.menuBlue};
  margin-right: 10px;
  margin-left: 5px;
  justify-self: center;

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
    margin-right: 5px;
  }
`;

const StyledNumbers = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  color: ${({ theme, received, predicted }) =>
    received || predicted !== undefined ? theme.green : theme.lighterGreen};
  margin-right: 5px;
  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
`;

const StyledFlexWrapper = styled.div`
  display: flex;
`;

const MoneyRow = ({
  label,
  content: { payment, received, real, predicted, percentage, action },
  units,
  type,
  id,
  signature,
}) => {
  const formatData = (real, predicted) => {
    return `${real} ${units} / ${predicted} ${units}`;
  };
  return (
    <StyledWrapper predicted={predicted}>
      <StyledLabel>{label}:</StyledLabel>
      <StyledFlexWrapper>
        {payment !== undefined && <StyledNumbers received={received}>{payment}</StyledNumbers>}

        {predicted !== undefined && (
          <ExpensesRow
            percentage={percentage}
            id={id}
            type={type}
            text={formatData(real, predicted)}
            action={action}
            signature={signature}
          />
        )}
        {units && predicted === undefined && <StyledNumbers received={true}>{units}</StyledNumbers>}
      </StyledFlexWrapper>
    </StyledWrapper>
  );
};

MoneyRow.propTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  units: PropTypes.string,
  type: PropTypes.array,
  id: PropTypes.number,
};

export default MoneyRow;
