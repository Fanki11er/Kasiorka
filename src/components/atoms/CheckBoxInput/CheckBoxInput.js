import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from '../FormLabel/FormLabel';
import CheckBox from '../../atoms/CheckBox/CheckBox';

const CheckBoxInput = ({ label, name, custom, type, noActive }) => {
  return (
    <FormLabel custom={custom}>
      {label}
      <CheckBox type={type} name={name} className={noActive ? 'noActive' : null} />
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
