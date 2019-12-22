import React from 'react';
import styled from 'styled-components';
import { Pencil } from 'styled-icons/typicons/';

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
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  font-weight: bold;
`;

const StyledSpan = styled.div`
  color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.smaller};
  font-weight: bold;
  margin: 0 20px;
`;

const StyledIconPencil = styled(Pencil)`
  position: absolute;
  right: 20px;
  top: 0;
  width: 40px;
  height: 90%;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.green};

  &:hover {
    color: ${({ theme }) => theme.hover};
    width: 50px;
    height: 100%;
    cursor: pointer;
  }
`;

const StyledUnits = styled.div`
  font-size: ${({ theme }) => theme.fontSize.smaller};
  font-weight: bold;
  color: ${({ theme }) => theme.green};
  margin-right: 15px;
`;
const test = () => {
  console.log('Buziaki');
};
const infoDiv = ({ labelText, labelData, editable, units }) => {
  return (
    <StyledWrapper>
      <StyledLabel>{labelText}:</StyledLabel>
      <StyledSpan>{labelData}</StyledSpan>
      <StyledUnits>{units}</StyledUnits>
      {editable && <StyledIconPencil onClick={test} />}
    </StyledWrapper>
  );
};

export default infoDiv;
