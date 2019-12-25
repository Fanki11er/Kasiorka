import React from 'react';
import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import withMenuContext from '../../../hoc/withMenuContext';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: 20px;
`;

const StyledListItem = styled.li``;

const YearsMenu = ({ menuContext }) => (
  <StyledList>
    {menuContext.years &&
      menuContext.years.map(yearName => (
        <StyledListItem key={yearName}>
          <MenuItem year clicked={0}>
            {yearName}
          </MenuItem>
        </StyledListItem>
      ))}
    ;
  </StyledList>
);

export default withMenuContext(YearsMenu);
