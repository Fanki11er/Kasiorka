import React from 'react';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 30px;
  margin-bottom: 15px;
  width: 100%;
  height: ${({ theme }) => theme.rowHeight};
  border: 2px solid ${({ theme }) => theme.menuBlue};
  border-radius: 10px;
  position: relative;
  justify-content: space-around;
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  font-weight: bold;
  width: 55%;
`;

const StyledSpan = styled.span`
  color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.smaller};
  font-weight: bold;
  width: 35%;
  display: block;
`;

const infoDiv = ({ labelText, labelData, input }) => {
  return (
    <StyledWrapper>
      <StyledLabel>{labelText}:</StyledLabel>

      {input ? <Input defaultValue={labelData}></Input> : <StyledSpan>{labelData}</StyledSpan>}
    </StyledWrapper>
  );
};

export default infoDiv;
