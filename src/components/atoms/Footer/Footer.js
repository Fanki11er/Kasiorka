import React from 'react';
import styled from 'styled-components';
import { LinkedinBox } from 'styled-icons/remix-fill/';
import { Github } from 'styled-icons/boxicons-logos/';
import { appVersion } from '../../../tools/index';

const StyledWrapper = styled.footer`
  display: flex;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  align-self: flex-end;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 50px;

  @media screen and (max-width: 767px) {
    justify-content: center;
    padding-right: 0;
  }
`;

const StyledAuthorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledAuthor = styled.span`
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  margin: 0;
  user-select: none;
  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }
  @media screen and (max-width: 770px) {
    margin: 0px;
  }
`;

const StyledAppVersion = styled.span`
  color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.smallest};
  margin: 0px;
  user-select: none;
  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.smallest};
  }
  @media screen and (max-width: 770px) {
    margin: 0px;
  }
`;

const StyledLinkedInIcon = styled(LinkedinBox)`
  color: ${({ theme }) => theme.menuBlue};
  width: 35px;
  height: 35px;

  @media screen and (max-width: 767px) {
    width: 45px;
    height: 45px;
  }

  &:hover {
    color: ${({ theme }) => theme.hover};
  }
`;

const StyledGitHubIcon = styled(Github)`
  color: ${({ theme }) => theme.menuBlue};
  width: 35px;
  height: 35px;

  @media screen and (max-width: 767px) {
    width: 45px;
    height: 45px;
  }

  &:hover {
    color: ${({ theme }) => theme.hover};
  }
`;

const StyledLink = styled.a`
  margin: 0 20px 0 0;
  @media screen and (max-width: 767px) {
    margin: 0 35px 0 0;
  }
`;

const Footer = () => {
  return (
    <StyledWrapper>
      <StyledLink href="https://www.linkedin.com/feed/" target="_blank">
        <StyledLinkedInIcon />
      </StyledLink>
      <StyledLink href="https://github.com/Fanki11er" target="_blank">
        <StyledGitHubIcon />
      </StyledLink>
      <StyledAuthorWrapper>
        <StyledAuthor>By KDZ 2020</StyledAuthor>
        <StyledAppVersion>ver: {appVersion}</StyledAppVersion>
      </StyledAuthorWrapper>
    </StyledWrapper>
  );
};

export default Footer;
