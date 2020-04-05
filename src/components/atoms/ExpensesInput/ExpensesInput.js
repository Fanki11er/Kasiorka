import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import ExpensesWrapper from '../../atoms/ExpensesWrapper/ExpensesWrapper';
import ExpensesSign from '../../atoms/ExpensesSign/ExpensesSign';

const StyledInput = styled(Field)`
  min-width: 20%;
  width: 40%;
  font-size: 1.5em;
  font-weight: bold;
  color: ${({ theme }) => theme.green};
  background-color: ${({ theme }) => theme.primary};
  text-align: center;
  border: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.lighterGreen};
  }

  &:focus {
    &::placeholder {
      color: ${({ theme }) => theme.lighterGreen};
    }
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  &.fireFoxNumber {
    -moz-appearance: textfield;
  }

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.small};
  }

  @media screen and (max-width: 767px) {
    width: 45%;
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
`;

const ExpensesInput = () => {
  return (
    <ExpensesWrapper>
      <ExpensesSign>+</ExpensesSign>
      <StyledInput type={'Number'} placeholder={'Rzeczywista'} />
      <ExpensesSign>/</ExpensesSign>
      <StyledInput type={'Number'} placeholder={'Przewidywana'} />
    </ExpensesWrapper>
  );
};

export default ExpensesInput;
