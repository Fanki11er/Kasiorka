import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: relative;
  width: ${({ long }) => (long ? '200px' : '120px')};
  display: flex;
`;

const StyledCover = styled.div`
  position: absolute;
  right: 0px;
  top: 0;
  background-color: ${({ theme }) => theme.primary};
  width: 16%;
  height: 100%;
  z-index: 2;
`;

const StyledHiddenInput = styled.input`
  color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.smaller};
  font-weight: bold;
  margin-left: 20px;
  background-color: transparent;
  outline: none;
  border: none;
  width: 90%;
`;

const Input = ({ defaultValue, long }) => {
  return (
    <StyledWrapper long={long}>
      <StyledHiddenInput type="number" defaultValue={defaultValue} />
      <StyledCover />
    </StyledWrapper>
  );
};

export default Input;
