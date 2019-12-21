import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import PropTypes from 'prop-types';

const StyledInput = styled(Field)`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.menuBlue};
  font-size: 28px;
  padding: 0 20px;

  width: 400px;
  height: 60px;
  outline: none;
  border: 2px solid ${({ theme }) => theme.menuBlue};
  border-radius: 10px;
  margin-left: 50px;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.normal};
  margin-bottom: 40px;
`;

const FormInput = ({ label, type, name }) => (
  <StyledLabel>
    {label}
    <StyledInput type={type} name={name} />
  </StyledLabel>
);

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
};

FormInput.defaultProps = {
  label: 'No-Label',
  name: 'Anonymous',
};

export default FormInput;
