import React from 'react';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';

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

const infoDiv = ({ labelText, labelData, divWidth, input, long }) => {
  return (
    <StyledWrapper divWidth={divWidth}>
      <StyledLabel>{labelText}:</StyledLabel>

      {input ? (
        <Input type="text" defaultValue={labelData} long={long}></Input>
      ) : (
        <StyledSpan>{labelData}</StyledSpan>
      )}
    </StyledWrapper>
  );
};

export default infoDiv;
