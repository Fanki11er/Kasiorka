import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import UserName from '../../atoms/UserName/UserName';

const StyledWrapper = styled.div`
  display: flex;
  flex-basis: 300px;
  justify-content: space-between;
`;

const StyledLogOut = styled(MenuItem)`
  padding-top: 10px;
  text-align: center;
  width: 150px;
`;

const UserMenu = () => {
  return (
    <StyledWrapper>
      <UserName>Krzysiek</UserName>
      <StyledLogOut as={Link} to="/" clicked={0}>
        Wyloguj
      </StyledLogOut>
    </StyledWrapper>
  );
};

export default UserMenu;
