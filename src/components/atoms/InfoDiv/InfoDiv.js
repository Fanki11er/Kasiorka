import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme }) => theme.rowHeight};
  border: 2px solid ${({ theme }) => theme.menuBlue};
  border-radius: 10px;
  padding: 0 30px;
  width: ${({ divWidth }) => divWidth};
  margin-bottom: 15px;
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  font-weight: bold;
`;

const StyledSpan = styled.span`
  color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.smaller};
  font-weight: bold;
  margin-left: 20px;
`;

const StyledInput = styled.input`
  color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.smaller};
  font-weight: bold;
  margin-left: 20px;
  background-color: transparent;
  outline: none;
  border: none;
  width: 50px;

  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.green};
    cursor: pointer;
  }
`;

const infoDiv = ({ labelText, labelData, divWidth, input }) => {
  return (
    <StyledWrapper divWidth={divWidth}>
      <StyledLabel>{labelText}:</StyledLabel>

      {input ? (
        <StyledInput type="text" defaultValue={labelData}></StyledInput>
      ) : (
        <StyledSpan>{labelData}</StyledSpan>
      )}
    </StyledWrapper>
  );
};

export default infoDiv;
