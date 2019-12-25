import React from 'react';
import styled from 'styled-components';
import UpDownButton from '../../atoms/UpDownButton/UpDownButton';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArrowsButton = ({ increaseWorkHours, decreaseWorkHours }) => (
  <StyledWrapper>
    <UpDownButton upButton onClick={increaseWorkHours} />
    <UpDownButton downButton onClick={decreaseWorkHours} />
  </StyledWrapper>
);

ArrowsButton.propTypes = {
  increaseWorkHours: PropTypes.func.isRequired,
  decreaseWorkHours: PropTypes.func.isRequired,
};

export default ArrowsButton;
