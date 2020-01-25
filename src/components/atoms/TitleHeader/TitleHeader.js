import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Dollar } from 'styled-icons/boxicons-regular';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Nunito', sans-serif;
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
      font-size: ${({ theme }) => theme.fontSize.larger};
      margin: 0 0 20px 15px;
    `}

  @media screen and (max-width: 1920px) {
    height: 100px;
    font-size: ${({ theme }) => theme.fontSizeMedium.large};
    margin: 30px auto;

    ${({ small }) =>
      small &&
      css`
        height: 55px;
        font-size: ${({ theme }) => theme.fontSizeMedium.larger};
        margin: 15px auto;
      `}
  }
`;

const StyledSpan = styled.span`
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

TitleHeader.propTypes = {
  small: PropTypes.bool,
};

export default TitleHeader;
