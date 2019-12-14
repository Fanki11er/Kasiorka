import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/MenuItem';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledListItem = styled.li``;

const MonthMenu = ({ monthNames }) => (
  <StyledList>
    {console.log(monthNames)}
    {monthNames.map(name => (
      <StyledListItem>
        <MenuItem>{name}</MenuItem>
      </StyledListItem>
    ))}
    ;
  </StyledList>
);

const getMonthNames = state => {
  const monthNames = [];
  state.map(month => {
    monthNames.push(month.name);
  });
  return monthNames;
};

const mapStateToProps = state => {
  return {
    monthNames: getMonthNames(state),
  };
};

export default connect(mapStateToProps)(MonthMenu);

/*const mapDispatchToProps = dispatch => ({
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

export default connect(null, mapDispatchToProps)(Card);*/
