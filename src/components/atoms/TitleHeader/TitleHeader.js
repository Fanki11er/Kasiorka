import React from 'react';
import styled from 'styled-components';
import { Dollar } from 'styled-icons/boxicons-regular';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 50px auto;
  height: 150px;
`;

const StyledSpan = styled.span`
  @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap&subset=latin-ext');
  font-family: 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.large};
  letter-spacing: 20px;
  &:last-child {
    margin-left: 20px;
  }
`;

const StyledIcon = styled(Dollar)`
  width: 15%;
  height: 100%;
  color: ${({ theme }) => theme.green};
`;

const TitleHeader = () => (
  <StyledHeader>
    <StyledSpan>Ka</StyledSpan>
    <StyledIcon />
    <StyledSpan>iorka</StyledSpan>
  </StyledHeader>
);

export default TitleHeader;
