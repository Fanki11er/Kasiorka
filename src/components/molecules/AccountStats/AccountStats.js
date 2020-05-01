import React from 'react';
import styled from 'styled-components';
import StyledInfo from '../../atoms/StyledInfo/StyledInfo';
import ExpenseSign from '../../atoms/ExpensesSign/ExpensesSign';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const StyledLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  color: ${({ theme, green }) => (green ? theme.green : theme.menuBlue)};
  min-width: 45%;
  user-select: none;
  text-align: center;
  margin: 5px 0;

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
`;

const StyledStatsWrapper = styled.div`
  min-width: 60%;
  height: 23px;
  background-color: red;
  border: 1px solid ${({ theme }) => theme.menuBlue};
  border-radius: 5px;
  background-color: transparent;
  align-self: center;
  margin: 5px 20px 0;
`;

const StyledProgress = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.lightGreen};
  border-radius: 5px;
  animation-name: goIn;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  position: relative;

  @keyframes goIn {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
  &:after {
    position: absolute;
    content: '';
    background-color: ${({ expensesPercents, theme }) =>
      expensesPercents > 70 || expensesPercents < 0 ? theme.sundayRed : theme.hover};
    height: 100%;
    left: 0;
    top: 0;
    width: ${({ expensesPercents }) => `${expensesPercents}%`};
    transition: background-color 1s 1s, width 2s 0.5s;
    border-radius: 5px;
    max-width: 100%;
  }
`;

const StyledStatus = styled.div`
  width: 100%;
  display: flex;
  flex-flow: wrap row;
  align-items: center;
  min-width: 60%;
  flex-grow: 1;
  justify-content: center;
`;

const Info = styled(StyledInfo)`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  color: ${({ theme, minus }) => (minus ? theme.sundayRed : theme.green)};
  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
`;

const StyledFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 60%;
  flex-grow: 1;
  justify-content: center;
`;

const AccountStats = ({ label, expensesPercents, stats, units }) => {
  const { incomes, expenses } = stats;
  return (
    <StyledWrapper>
      <StyledLabel>{'Statystyki:'}</StyledLabel>
      <StyledStatus>
        <StyledLabel green={true}>{label}</StyledLabel>
        <StyledFlexWrapper>
          <Info minus={expenses < 0 ? true : false}>{`${expenses} ${units}`}</Info>
          <ExpenseSign>/</ExpenseSign>
          <Info>{`${incomes} ${units}`}</Info>
        </StyledFlexWrapper>
      </StyledStatus>
      <StyledStatsWrapper>
        <StyledProgress expensesPercents={expensesPercents} />
      </StyledStatsWrapper>
    </StyledWrapper>
  );
};

AccountStats.propTypes = {
  label: PropTypes.string,
  expensesPercents: PropTypes.number,
  units: PropTypes.string,
  stats: PropTypes.shape({
    incomes: PropTypes.number,
    expenses: PropTypes.number,
  }),
};

AccountStats.defaultProps = {
  label: '----',
  units: 'zł',
  expensesPercents: 0,
  stats: {
    incomes: 0,
    expenses: 0,
  },
};

export default AccountStats;
