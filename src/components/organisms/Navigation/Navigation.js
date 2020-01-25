import React from 'react';
import styled from 'styled-components';
import ViewMenu from '../../molecules/ViewMenu/ViewMenu';
import UserMenu from '../../molecules/UserMenu/UserMenu';

const StyledWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  padding: 0 70px;
  background-color: ${({ theme }) => theme.primary};

  @media screen and (max-width: 1920px) {
    height: 50px;
    padding: 0 30px;
  }
  @media screen and (max-width: 760px) {
    display: none;
  }
`;

const Navigation = () => {
  return (
    <StyledWrapper>
      <ViewMenu />
      <UserMenu />
    </StyledWrapper>
  );
};

export default Navigation;
