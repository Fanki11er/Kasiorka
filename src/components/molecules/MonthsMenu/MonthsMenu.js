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

const mapStateToProps = state => {
  return {
    monthNames: state,
  };
};

const getMonthNames = state => {
  const monthNames = [];
  state.map(month => {
    monthNames.push({ monthName: month.name, monthId: month.id });
    return null;
  });
  return monthNames;
};

class MonthMenu extends Component {
  state = {
    clicked: 0,
  };

  handleClick = event => {
    this.setState({
      clicked: event.target.id,
    });
    const { menuContext } = this.props;
    const { selectMonth } = menuContext;
    selectMonth(event);
  };

  componentDidMount() {
    const { menuContext } = this.props;
    const { selectedMonthId } = menuContext;
    this.setState({
      clicked: selectedMonthId + 1,
    });
  }

  render() {
    const { monthNames } = this.props;
    const { clicked } = this.state;

    const namesOfMonths = getMonthNames(monthNames);
    return (
      <StyledList>
        {namesOfMonths.map(({ monthName, monthId }) => (
          <StyledListItem key={monthId}>
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

export default connect(mapStateToProps)(withMenuContext(MonthMenu));
