import React from 'react';
import styled from 'styled-components';
import ViewMenu from '../../molecules/ViewMenu/ViewMenu';
import UserMenu from '../../molecules/UserMenu/UserMenu';

const StyledWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 75%;
  height: 100px;
  background-color: ${({ theme }) => theme.primary};
  position: absolute;
  top: 0;
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
