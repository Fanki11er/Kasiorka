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
  margin-right: 25px;

  &:hover {
    border: 2px solid ${({ theme }) => theme.hover};
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.green};
    color: ${({ theme }) => theme.green};
  }
  @media screen and (max-width: 1920px) {
    width: 300px;
    height: 40px;
    font-size: 20px;
  }
  @media screen and (max-width: 770px) {
    padding: 0 10px;
    width: 100%;
    font-size: 20px;
    height: 40px;
    margin: 2px 0;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.smaller};
  margin-bottom: ${({ withError }) => (withError ? '0' : '40px')};
  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.smaller};
    margin-bottom: ${({ withError }) => (withError ? '0' : '20px')};
  }
  @media screen and (max-width: 770px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FormInput = ({ label, type, name, withError, focused }) => (
  <StyledLabel withError={withError}>
    {label}
    <StyledInput type={type} name={name} autoFocus={focused ? true : false} />
  </StyledLabel>
);

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  withError: PropTypes.bool,
  focused: PropTypes.bool,
};

FormInput.defaultProps = {
  label: '----',
  name: '----',
  withError: false,
  focused: false,
};

export default FormInput;
