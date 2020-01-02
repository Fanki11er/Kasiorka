import React, { Component } from 'react';
import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: 20px;
`;

const StyledListItem = styled.li``;

class YearsMenu extends Component {
  state = {
    clicked: 0,
  };

  componentDidMount() {
    const { selectedYear, yearsList } = this.props;
    const selectYear = this.clickedYear(selectedYear, yearsList);

    this.setState({
      clicked: selectYear,
    });
  }

  clickedYear = (selectedYear, yearsList) => {
    return yearsList.indexOf(selectedYear);
  };

  handleClick = event => {
    this.setState({
      clicked: event.target.id,
    });
    const { selectMonthOrYear } = this.props;
    selectMonthOrYear(event, 'year');
  };
  render() {
    const { yearsList } = this.props;
    const { clicked } = this.state;

    return (
      <StyledList>
        {yearsList && yearsList.length > 0 ? (
          yearsList.map((yearName, yearId) => (
            <StyledListItem key={yearName}>
              <MenuItem year clicked={parseFloat(clicked)} onClick={this.handleClick} id={yearId}>
                {yearName}
              </MenuItem>
            </StyledListItem>
          ))
        ) : (
          <StyledListItem>
            <MenuItem year className="noActive">
              Brak
            </MenuItem>
          </StyledListItem>
        )}
        ;
      </StyledList>
    );
  }
}

YearsMenu.propTypes = {
  yearsList: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    yearsList: state.user.yearsList,
  };
};

export default connect(mapStateToProps)(YearsMenu);
