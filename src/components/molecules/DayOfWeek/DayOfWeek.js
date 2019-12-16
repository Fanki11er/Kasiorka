import React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import DayName from '../../atoms/DayName/DayName';
import DayNumber from '../../atoms/DayNumber/DayNumber';
import NumberOfHours from '../../atoms/NumberOfHours/NumberOfHours';
import ArrowsButton from '../ArrowsButton/ArrowsButton';
import { connect } from 'react-redux';
import { updateHours as updateHoursAction } from '../../../actions/index';

const StyledWrapper = styled.div`
  display: flex;
  margin: 1px 0;
`;

class DayOfTheWeek extends Component {
  render() {
    const { dayId, nameOfDay, isHoliday, workHours, updateHours, monthId } = this.props;
    const increase = '+';
    const decrease = '-';

    return (
      <StyledWrapper>
        <DayNumber>{dayId}</DayNumber>
        <DayName isHoliday={isHoliday}>{nameOfDay}</DayName>
        <NumberOfHours>{workHours}</NumberOfHours>
        <ArrowsButton
          increaseWorkHours={() =>
            updateHours(monthId, dayId, nameOfDay, workHours, isHoliday, increase)
          }
          decreaseWorkHours={() =>
            updateHours(monthId, dayId, nameOfDay, workHours, isHoliday, decrease)
          }
        ></ArrowsButton>
      </StyledWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateHours: (monthId, dayId, nameOfDay, workHours, isHoliday, action) =>
    dispatch(updateHoursAction(monthId, dayId, nameOfDay, workHours, isHoliday, action)),
});

export default connect(null, mapDispatchToProps)(DayOfTheWeek);
