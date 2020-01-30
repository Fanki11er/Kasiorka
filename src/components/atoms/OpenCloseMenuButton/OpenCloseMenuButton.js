import React from 'react';
import styled from 'styled-components';
import { ArrowForwardIos } from 'styled-icons/material';

const StyledButton = styled.button`
  width: 60px;
  height: 70px;
  position: fixed;
  z-index: 4;
  top: 30%;
  left: -2px;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  outline: none;
  background-color: ${({ theme }) => theme.menuBlue};
  border: 2px solid ${({ theme }) => theme.menuBlue};
  display: none;

  @media screen and (max-width: 770px) {
    display: initial;
  }
`;

const StyledIcon = styled(ArrowForwardIos)`
  width: 100%;
  height: 80%;
  color: ${({ theme }) => theme.primary};
  transition: transform 0.5s;
  transition-delay: 0.3s;
  transform: rotate(${({ opened }) => (opened ? `${180}deg` : 0)});
`;

const OpenCloseMenuButton = ({ opened, toggleMenu }) => {
  return (
    <StyledButton onClick={toggleMenu}>
      <StyledIcon opened={opened} />
    </StyledButton>
  );
};

export default OpenCloseMenuButton;
