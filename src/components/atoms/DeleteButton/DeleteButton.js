import React from 'react';
import styled from 'styled-components';
//import PropTypes from 'prop-types';
import { Close } from 'styled-icons/material';

const StyledIcon = styled(Close)`
  color: ${({ theme }) => theme.sundayRed};
  width: 100%;
  margin: 10px 0;

  border: 2px solid ${({ theme }) => theme.sundayRed};
  border-radius: 10px;

  &:hover,
  :focus {
    border: 2px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.hover};
  }
  @media screen and (max-width: 1920px) {
    border-radius: 8px;
  }
`;

const StyledButton = styled.button`
  display: flex;
  width: 8%;
  height: auto;
  outline: none;
  background-color: transparent;
  border: none;
  justify-content: center;
  align-content: center;
  align-items: center;
  @media screen and (max-width: 767px) {
    width: 12%;
  }
`;

const DeleteButton = ({ id, modalInfo, deleteAction }) => {
  return (
    <StyledButton onClick={() => deleteAction(id, modalInfo)}>
      <StyledIcon />
    </StyledButton>
  );
};

export default DeleteButton;
