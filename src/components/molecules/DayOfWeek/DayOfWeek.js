import React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateHours as updateHoursAction } from '../../../actions/hoursActions';
import DayName from '../../atoms/DayName/DayName';
import DayNumber from '../../atoms/DayNumber/DayNumber';
import NumberOfHours from '../../atoms/NumberOfHours/NumberOfHours';
import ArrowsButton from '../ArrowsButton/ArrowsButton';

const StyledWrapper = styled.div`
  display: flex;
  margin: 1px 0;
`;

class DayOfTheWeek extends Component {
  render() {
    const {
      dayId,
      nameOfDay,
      isSaturday,
      isSunday,
      workHours,
      updateHours,
      monthId,
      isHoliday,
      holidayDesc,
    } = this.props;
    const increase = '+';
    const decrease = '-';

    return (
      <StyledWrapper>
        <DayNumber>{dayId}</DayNumber>

        <DayName
          isSaturday={isSaturday}
          isSunday={isSunday}
          isHoliday={isHoliday}
          title={holidayDesc ? holidayDesc : null}
        >
          {nameOfDay}
        </DayName>
        <NumberOfHours>{workHours}</NumberOfHours>
        <ArrowsButton
          increaseWorkHours={() => updateHours(monthId, dayId, workHours, increase)}
          decreaseWorkHours={() => updateHours(monthId, dayId, workHours, decrease)}
        ></ArrowsButton>
      </StyledWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateHours: (monthId, dayId, workHours, action) =>
    dispatch(updateHoursAction(monthId, dayId, workHours, action)),
});

DayOfTheWeek.propTypes = {
  dayId: PropTypes.number.isRequired,
  monthId: PropTypes.number.isRequired,
  updateHours: PropTypes.func.isRequired,
  nameOfDay: PropTypes.string,
  isSaturday: PropTypes.bool,
  isSunday: PropTypes.bool,
  isHoliday: PropTypes.bool,
  workHours: PropTypes.number,
  holidayDesc: PropTypes.string,
};

DayOfTheWeek.defaultProps = {
  nameOfDay: 'NN',
  isSaturday: false,
  isSunday: false,
  workHours: 0,
};

export default connect(null, mapDispatchToProps)(DayOfTheWeek);
