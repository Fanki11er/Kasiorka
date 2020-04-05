import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import PropTypes from 'prop-types';
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

  &.noActive {
    pointer-events: none;
    border: 2px solid gray;
    color: gray;
    opacity: 0.5;
  }
  @media screen and (max-width: 1920px) {
    width: 25px;
    height: 25px;
    border-radius: 5px;
  }
`;

const CheckBoxInput = ({ label, name, custom, type, noActive }) => {
  return (
    <FormLabel custom={custom}>
      {label}
      <StyledCheckBox type={type} name={name} className={noActive ? 'noActive' : null} disabled />
    </FormLabel>
  );
};

CheckBoxInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  custom: PropTypes.bool,
  type: PropTypes.string.isRequired,
  noActive: PropTypes.bool,
};

CheckBoxInput.defaultProps = {
  label: '----',
  name: '----',
  custom: false,
  noActive: false,
};

export default CheckBoxInput;
