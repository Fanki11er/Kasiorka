import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: relative;
  width: 35%;
  display: flex;
`;

const StyledCover = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-color: ${({ theme }) => theme.primary};
  width: 25%;
  height: 100%;
  z-index: 2;
`;

const StyledHiddenInput = styled.input`
  color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.smaller};
  font-weight: bold;
  background-color: transparent;
  outline: none;
  border: none;
  width: 90%;
`;

const Input = ({ defaultValue }) => {
  return (
    <StyledWrapper>
      <StyledHiddenInput type="number" defaultValue={defaultValue} />
      <StyledCover />
    </StyledWrapper>
  );
};

export default Input;
