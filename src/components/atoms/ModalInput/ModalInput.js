import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import FormLabel from '../../atoms/FormLabel/FormLabel';

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
  &.fireFoxNumber {
    -moz-appearance: textfield;
  }
`;

const StyledUnits = styled.div`
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  font-weight: bold;
  color: ${({ theme }) => theme.green};
`;

const ModalInput = ({ label, type, name, units, val, custom }) => {
  return (
    <FormLabel custom={custom}>
      {label}
      {type !== 'checkbox' ? (
        <StyledInput
          type={type}
          name={name}
          placeholder={val}
          maxLength={type === 'text' ? '3' : null}
          inputMode={type === 'number' ? 'numeric' : 'none'}
          className="fireFoxNumber"
        />
      ) : (
        <p></p>
      )}

      {units && <StyledUnits>{units}</StyledUnits>}
    </FormLabel>
  );
};

ModalInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  units: PropTypes.string,
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  custom: PropTypes.string,
};

export default ModalInput;
