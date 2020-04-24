import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { routes } from '../../../Router/routes';
import MenuItem from '../../atoms/MenuItem/MenuItem';

const StyledWrapper = styled.nav`
  display: flex;
  align-self: flex-end;
  margin: 20px;
  height: 30px;
  user-select: none;

  @media screen and (max-width: 560px) {
    align-self: center;
    margin: 15px;
  }
`;

const StyledButton = styled(MenuItem)`
  padding: 7px 0;
  text-align: center;
`;

const TopNavigation = () => {
  const { login, register } = routes;
  return (
    <StyledWrapper>
      <StyledButton as={Link} to={login}>
        Zaloguj
      </StyledButton>
      <StyledButton as={Link} to={register}>
        Rejestracja
      </StyledButton>
    </StyledWrapper>
  );
};

export default TopNavigation;
