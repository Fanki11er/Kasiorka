import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { LeftArrowCircle } from 'styled-icons/boxicons-regular';

const StyledButton = styled.button`
  position: absolute;
  top: 30px;
  right: 50px;
  width: 60px;
  color: ${({ theme }) => theme.menuBlue};
  background-color: transparent;
  outline: none;
  border: none;

  &:hover,
  :focus {
    color: ${({ theme }) => theme.hover};

    cursor: pointer;
    @media screen and (max-width: 1920px) {
      width: 45px;
    }
  }
  @media screen and (max-width: 1920px) {
    width: 40px;
  }

  @media screen and (max-width: 560px) {
    right: 10px;
    top: 10px;
  }
`;

const ButtonIcon = styled(LeftArrowCircle)`
  width: 100%;
`;

const BackButton = () => {
  return (
    <StyledButton as={Link} to="/" title={'Powrót do strony głównej'}>
      <ButtonIcon />
    </StyledButton>
  );
};

export default BackButton;
