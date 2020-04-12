import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FormLabel from '../FormLabel/FormLabel';
import CheckBox from '../../atoms/CheckBox/CheckBox';

const StyledFormLabel = styled(FormLabel)`
  border: none;
  justify-content: flex-start;
  opacity: 1;

  &.hidden {
    opacity: 0;
    user-select: none;
    cursor: auto;
  }
`;

const StyledCheckBox = styled(CheckBox)`
  margin-left: 15px;
  @media screen and (max-width: 1920px) {
    width: 20px;
    height: 20px;
    border-radius: 5px;
  }
`;

const SecondCheckBoxInput = ({ label, name, custom, type, noActive, hidden }) => {
  return (
    <StyledFormLabel custom={custom} className={hidden ? 'hidden' : null}>
      {label}
      <StyledCheckBox type={type} name={name} className={noActive ? 'noActive' : null} />
    </StyledFormLabel>
  );
};

SecondCheckBoxInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  custom: PropTypes.bool,
  type: PropTypes.string.isRequired,
  noActive: PropTypes.bool,
};

SecondCheckBoxInput.defaultProps = {
  label: '----',
  name: '----',
  custom: false,
  noActive: false,
};

export default SecondCheckBoxInput;
