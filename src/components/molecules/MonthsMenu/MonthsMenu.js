import React from 'react';
import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/MenuItem';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledListItem = styled.li``;

const monthsNames = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];

const MonthMenu = () => (
  <StyledList>
    {monthsNames.map(name => (
      <StyledListItem>
        <MenuItem>{name}</MenuItem>
      </StyledListItem>
    ))}
    ;
  </StyledList>
);

const mapDispatchToProps = dispatch => ({});

export default MonthMenu;

/*const mapDispatchToProps = dispatch => ({
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

export default connect(null, mapDispatchToProps)(Card);*/
