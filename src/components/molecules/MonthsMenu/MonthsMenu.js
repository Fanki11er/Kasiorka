import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MenuItem from '../../atoms/MenuItem/MenuItem';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledListItem = styled.li``;

const getMonthNames = state => {
  const monthNames = [];
  state &&
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
    const { selectMonthOrYear } = this.props;
    selectMonthOrYear(event, 'month');
  };

  componentDidMount() {
    const { selectedMonthId } = this.props;
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
        {namesOfMonths ? (
          namesOfMonths.map(({ monthName, monthId }) => (
            <StyledListItem key={monthId}>
              <MenuItem clicked={parseFloat(clicked)} onClick={this.handleClick} id={monthId}>
                {monthName}
              </MenuItem>
            </StyledListItem>
          ))
        ) : (
          <StyledListItem>
            <MenuItem className="noActive">Brak</MenuItem>
          </StyledListItem>
        )}
        ;
      </StyledList>
    );
  }
}

MonthMenu.propTypes = {
  monthNames: PropTypes.array.isRequired,
  selectMonthOrYear: PropTypes.func.isRequired,
  selectedMonthId: PropTypes.number,
};

MonthMenu.defaultPropTypes = {
  selectedMonthId: 0,
};
const mapStateToProps = state => {
  return {
    monthNames: state.hours.months,
  };
};

export default connect(mapStateToProps)(MonthMenu);
