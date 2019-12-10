import React from 'react';
import styled from 'styled-components';
import UpDownButton from '../../atoms/UpDownButton/UpDownButton';

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

export default ArrowsButton;
