import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.footer`
  display: flex;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  align-self: flex-end;
  justify-content: flex-end;
  align-items: center;
`;

const StyledAuthor = styled.span`
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  margin: 0 100px;
  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
`;

const Footer = () => {
  return (
    <StyledWrapper>
      <StyledAuthor>By KDZ 2020</StyledAuthor>
    </StyledWrapper>
  );
};

export default Footer;
