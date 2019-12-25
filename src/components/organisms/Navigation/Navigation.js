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
