import React from 'react';
import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/MenuItem';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: 20px;
`;

const StyledListItem = styled.li``;

const years = ['2019', '2020'];

const YearsMenu = () => (
  <StyledList>
    {years.map(yearName => (
      <StyledListItem key={yearName}>
        <MenuItem year clicked={0}>
          {yearName}
        </MenuItem>
      </StyledListItem>
    ))}
    ;
    <MenuItem addYearButton clicked={0}>
      Dodaj Nowy Rok
    </MenuItem>
  </StyledList>
);

export default YearsMenu;
