import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import ExpensesWrapper from '../../atoms/ExpensesWrapper/ExpensesWrapper';

const StyledRadioButton = styled(Field)`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.green};
  border-radius: 50%;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  transition: background-color 0.6s, border 0.6s;

  &:checked {
    background-color: ${({ theme }) => theme.green};
    border: 2px solid ${({ theme }) => theme.green};
  }

  &:hover {
    border: 3px solid ${({ theme }) => theme.hover};
  }
  &:focus {
    border: 2px solid ${({ theme }) => theme.hover};
  }

  @media screen and (max-width: 1920px) {
    width: 15px;
    height: 15px;
  }

  &.noActive {
    pointer-events: none;
    border: 2px solid gray;
    color: gray;
    opacity: 0.5;
  }
`;

const StyledLabel = styled.label`
  width: 30%;
  height: 100%;
  color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  padding: 15px;
  text-align: center;

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.small};
    padding: 7px;
  }

  &.noActive {
    pointer-events: none;
    color: gray;
    opacity: 0.5;
  }
`;

const StyledExpensesWrapper = styled(ExpensesWrapper)`
  width: 40%;
  border: none;
`;

const RadioButton = ({ name, label, checked, value, active = true }) => {
  return (
    <StyledExpensesWrapper>
      <StyledRadioButton
        type="radio"
        name={name}
        checked={checked}
        value={value}
        className={active ? null : 'noActive'}
      />
      <StyledLabel className={!active && 'noActive'}>{label}</StyledLabel>
    </StyledExpensesWrapper>
  );
};

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  value: PropTypes.string,
};

export default RadioButton;
