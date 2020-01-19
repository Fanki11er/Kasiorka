import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import FormLabel from '../FormLabel/FormLabel';

const StyledCheckBox = styled(Field)`
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.menuBlue};
  border-radius: 10px;
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
`;

const CheckBoxInput = ({ label, name, custom, type }) => {
  return (
    <FormLabel custom={custom}>
      {label}
      <StyledCheckBox type={type} name={name} />
    </FormLabel>
  );
};

export default CheckBoxInput;
