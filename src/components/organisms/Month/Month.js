import React from 'react';
import styled from 'styled-components';
import Week from '../../molecules/Week/Week';

const StyledWrapper = styled.div`
  display: flex;
`;

const Month = () => (
  <StyledWrapper>
    <Week></Week>
    <Week></Week>
    <Week></Week>
    <Week></Week>
  </StyledWrapper>
);

export default Month;
