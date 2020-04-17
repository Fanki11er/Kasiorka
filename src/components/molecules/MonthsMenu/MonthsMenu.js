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

const getMonthNames = (state) => {
  const monthNames = [];
  state &&
    state.map((month) => {
      monthNames.push({ monthName: month.name, monthId: month.id });
      return null;
    });
  return monthNames;
};

class MonthMenu extends Component {
  state = {
    clicked: 0,
  };

  handleClick = (event) => {
    const { selectMonthOrYear } = this.props;
    this.setState({
      clicked: event.target.id,
    });
    selectMonthOrYear(event, 'month');
  };

  componentDidMount() {
    const { selectedMonthId } = this.props;
    this.setState({
      clicked: selectedMonthId + 1,
    });
  }

  render() {
    const { monthNames, toggleMenu, isMenuOpened } = this.props;
    const { clicked } = this.state;

    const namesOfMonths = getMonthNames(monthNames);
    return (
      <StyledList>
        {namesOfMonths ? (
          namesOfMonths.map(({ monthName, monthId }) => (
            <StyledListItem key={monthId}>
              <MenuItem
                clicked={parseFloat(clicked)}
                onClick={(target) => {
                  this.handleClick(target);
                  isMenuOpened && setTimeout(toggleMenu, 400);
                }}
                id={monthId}
              >
                {monthName}
              </MenuItem>
            </StyledListItem>
          ))
        ) : (
          <StyledListItem>
            <MenuItem className="noActive">Brak</MenuItem>
          </StyledListItem>
        )}
      </StyledList>
    );
  }
}

MonthMenu.propTypes = {
  monthNames: PropTypes.array.isRequired,
  selectMonthOrYear: PropTypes.func.isRequired,
  selectedMonthId: PropTypes.number,
  toggleMenu: PropTypes.func.isRequired,
  isMenuOpened: PropTypes.bool,
};

MonthMenu.defaultProps = {
  selectedMonthId: 0,
  isMenuOpened: false,
};
const mapStateToProps = ({ hours }) => {
  return {
    monthNames: hours.months,
  };
};

export default connect(mapStateToProps)(MonthMenu);
