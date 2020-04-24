import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { routes } from '../../../Router/routes';
import blobImage from '../../../assets/images/blob-image.svg';
import MenuItem from '../../atoms/MenuItem/MenuItem';

const StyledWrapper = styled.section`
  margin: 30px 0;
  position: relative;
  width: 50%;
  user-select: none;

  @media screen and (max-width: 560px) {
    width: 90%;
  }
`;

const StyledBackground = styled.img`
  width: 100%;
`;
const StyledNav = styled.nav`
  width: 75%;
  position: absolute;
  display: flex;
  justify-content: space-around;
  top: 42%;
  left: 10%;
`;

const StyledButton = styled(MenuItem)`
  padding: 7px 0;
  text-align: center;
`;

const MainPageBottomSection = () => {
  const { login, register } = routes;
  return (
    <StyledWrapper>
      <StyledBackground src={blobImage} alt={'Blob'} />
      <StyledNav>
        <StyledButton as={Link} to={login}>
          Zaloguj
        </StyledButton>
        <StyledButton as={Link} to={register}>
          Rejestracja
        </StyledButton>
      </StyledNav>
    </StyledWrapper>
  );
};

export default MainPageBottomSection;
