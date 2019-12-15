import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import withMenuContext from '../../../hoc/withMenuContext';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledListItem = styled.li``;

const MonthMenu = ({ monthNames, menuContext }) => (
  <StyledList>
    {monthNames.map(name => (
      <StyledListItem>
        <MenuItem onClick={menuContext} id={1}>
          {name}
        </MenuItem>
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

export default connect(mapStateToProps)(withMenuContext(MonthMenu));

/*const mapDispatchToProps = dispatch => ({
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

export default connect(null, mapDispatchToProps)(Card);*/
