import React from 'react';
import styled, { css } from 'styled-components';
import { Dollar } from 'styled-icons/boxicons-regular';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;

  margin: 50px auto;
  height: 150px;
  font-size: ${({ theme }) => theme.fontSize.large};
  letter-spacing: 20px;
  &:last-of-type {
    margin-left: 20px;
  }

  ${({ small }) =>
    small &&
    css`
      height: 80px;
      letter-spacing: 5px;
      font-size: 3em;
      margin: 0 0 20px 15px;
    `}
`;

const StyledSpan = styled.span`
  @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap&subset=latin-ext');
  font-family: 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.menuBlue};
`;

const StyledIcon = styled(Dollar)`
  height: 100%;
  color: ${({ theme }) => theme.green};
  margin-right: 2%;
`;

const TitleHeader = ({ small }) => (
  <StyledHeader small={small}>
    <StyledSpan>Ka</StyledSpan>
    <StyledIcon />
    <StyledSpan>iorka</StyledSpan>
  </StyledHeader>
);

export default TitleHeader;
