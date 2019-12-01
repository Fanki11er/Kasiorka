import React from 'react';
import styled from 'styled-components';
import Week from '../../molecules/Week/Week';

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  margin: 0 auto 0 auto;
  padding-left: 50px;
  width: 100%;
  justify-content: space-around;
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
