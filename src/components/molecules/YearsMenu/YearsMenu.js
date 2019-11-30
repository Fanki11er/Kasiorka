import React from 'react';
import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/MenuItem';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledListItem = styled.li``;

const years = ['2019', '2020'];

const YearsMenu = () => (
  <StyledList>
    {years.map(name => (
      <StyledListItem>
        <MenuItem year>{name}</MenuItem>
      </StyledListItem>
    ))}
    ;
  </StyledList>
);

export default YearsMenu;
