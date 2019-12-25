import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.primary};
`;

const StyledInfo = styled.p`
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.hover};
`;

const MoneyMonth = () => {
  return (
    <StyledWrapper>
      <StyledInfo>I'm still building</StyledInfo>
    </StyledWrapper>
  );
};

export default MoneyMonth;
