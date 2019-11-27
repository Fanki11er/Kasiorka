import React from 'react';
import styled from 'styled-components';
import UpDownButton from '../../atoms/UpDownButton/UpDownButton';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArrowsButton = () => (
  <StyledWrapper>
    <UpDownButton upButton />
    <UpDownButton downButton />
  </StyledWrapper>
);

export default ArrowsButton;
