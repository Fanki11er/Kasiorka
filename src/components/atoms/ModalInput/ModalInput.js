import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

const StyledInput = styled(Field)`
  min-width: 15%;
  width: 20%;
  font-size: 1.5em;
  font-weight: bold;
  color: ${({ theme }) => theme.green};
  background-color: ${({ theme }) => theme.primary};
  text-align: end;
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
`;

const StyledUnits = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  font-weight: bold;
  color: ${({ theme }) => theme.green};
`;

const StyledLabel = styled.label`
  min-width: 550px;
  width: 70%;
  height: 65px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  display: flex;
  justify-content: space-around;
  font-weight: bold;
  border: 2px solid ${({ theme }) => theme.menuBlue};
  border-radius: 10px;
  padding: 15px 20px;
  align-items: center;
`;

const ModalInput = ({ label, type, name, units, val }) => {
  return (
    <StyledLabel>
      {label}
      <StyledInput type={type} name={name} placeholder={val} />
      <StyledUnits>{units}</StyledUnits>
    </StyledLabel>
  );
};

export default ModalInput;
