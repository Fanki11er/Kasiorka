import React from 'react';
import styled from 'styled-components';
import ExpensesSign from '../../atoms/ExpensesSign/ExpensesSign';

const StyledWrapper = styled.div`
  border: none;
  border-top: 2px solid orange;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 15px;
  flex-flow: wrap row;

  @media screen and (max-width: 1920px) {
    min-height: 40px;
    padding: 0 5px;
  }
`;

const StyledLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  color: ${({ theme }) => theme.menuBlue};
  margin-right: 10px;

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
`;
const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  height: 100%;
  color: ${({ theme, minus }) => (minus ? theme.sundayRed : theme.green)};
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  padding: 0 10px;
  justify-content: center;

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
`;
const SumInfo = ({ expenses, units }) => {
  const real = expenses ? expenses.reduce((total, { real }) => (total += real), 0) : 0;
  const predicted = expenses
    ? expenses.reduce((total, { predicted }) => (total += predicted), 0)
    : 0;
  const percentage = predicted !== 0 ? parseInt((real / predicted) * 100) : real;
  return (
    <StyledWrapper>
      <StyledLabel>Suma:</StyledLabel>
      <StyledInfo minus={real < 0 ? true : false}>{`${real} ${units}`} </StyledInfo>
      <ExpensesSign>/</ExpensesSign>
      <StyledInfo minus={predicted < 0 ? true : false}>{`${predicted} ${units}`}</StyledInfo>
      <StyledInfo>{percentage}%</StyledInfo>
    </StyledWrapper>
  );
};

export default SumInfo;
