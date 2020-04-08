import React from 'react';
import styled from 'styled-components';
import { appVersion } from '../../../tools/index';

const StyledWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  align-self: flex-end;
  justify-content: flex-end;
  align-items: flex-end;
`;

const StyledAuthor = styled.span`
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  margin: 0 100px;
  user-select: none;
  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
  @media screen and (max-width: 770px) {
    margin: 0 45px;
  }
`;

const StyledAppVersion = styled.span`
  color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.smallest};
  margin: 0 100px;
  user-select: none;
  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.smallest};
  }
  @media screen and (max-width: 770px) {
    margin: 0 45px;
  }
`;

const Footer = () => {
  return (
    <StyledWrapper>
      <StyledAuthor>By KDZ 2020</StyledAuthor>
      <StyledAppVersion>ver: {appVersion}</StyledAppVersion>
    </StyledWrapper>
  );
};

export default Footer;
