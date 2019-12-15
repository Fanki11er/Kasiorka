import React, { Component } from 'react';
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

class MonthMenu extends Component {
  state = {
    clicked: 0,
  };
  handleClick = event => {
    this.setState({
      clicked: event.target.id,
    });
    const { menuContext } = this.props;
    menuContext(event);
  };

  render() {
    const { monthNames } = this.props;
    const { clicked } = this.state;
    const names = getMonthNames(monthNames);
    return (
      <StyledList>
        {names.map(({ monthName, monthId }) => (
          <StyledListItem>
            <MenuItem clicked={clicked} onClick={this.handleClick} id={monthId}>
              {monthName}
            </MenuItem>
          </StyledListItem>
        ))}
        ;
      </StyledList>
    );
  }
}

const getMonthNames = state => {
  const monthNames = [];
  state.map(month => {
    monthNames.push({ monthName: month.name, monthId: month.id });
  });
  return monthNames;
};
const mapStateToProps = state => {
  return {
    monthNames: state,
  };
};

export default connect(mapStateToProps)(withMenuContext(MonthMenu));

/*const mapDispatchToProps = dispatch => ({
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

export default connect(null, mapDispatchToProps)(Card);


const mapStateToProps = state => {
  return {
    monthNames: getMonthNames(state),
  };
};
*/
