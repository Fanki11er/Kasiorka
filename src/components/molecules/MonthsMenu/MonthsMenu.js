import React from 'react';
import styled from 'styled-components';
import MonthName from '../../atoms/MonthName/MonthName';

const StyledList = styled.ul`
  list-style: none;
`;

const StyledListItem = styled.li``;

const MonthMenu = () => (
  <StyledList>
    <StyledListItem>
      <MonthName>Styczeń</MonthName>
    </StyledListItem>
    <StyledListItem>
      <MonthName>Luty</MonthName>
    </StyledListItem>
  </StyledList>
);

export default MonthMenu;
