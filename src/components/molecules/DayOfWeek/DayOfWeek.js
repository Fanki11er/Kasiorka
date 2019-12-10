import React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import DayName from '../../atoms/DayName/DayName';
import DayNumber from '../../atoms/DayNumber/DayNumber';
import NumberOfHours from '../../atoms/NumberOfHours/NumberOfHours';
import ArrowsButton from '../ArrowsButton/ArrowsButton';
import { connect } from 'react-redux';
import { increaseHours as increaseHoursAction } from '../../../actions/index';

const StyledWrapper = styled.div`
  display: flex;
  margin: 1px 0;
`;

class DayOfTheWeek extends Component {
  render() {
    const { number, name, holiday, hours, increaseHours } = this.props;

    /* const up = hours => {
      hours++;
      increaseHours(number, name, hours, holiday);
    };*/

    return (
      <StyledWrapper>
        <DayNumber>{number}</DayNumber>
        <DayName holiday={holiday}>{name}</DayName>
        <NumberOfHours>{hours}</NumberOfHours>
        <ArrowsButton
          dayId={number}
          nameOfDay={name}
          hours={hours}
          holiday={holiday}
          onClickAction={() => increaseHours(number, name, hours, holiday)}
        ></ArrowsButton>
      </StyledWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  increaseHours: (dayId, nameOfDay, hours, holiday) =>
    dispatch(increaseHoursAction(dayId, nameOfDay, hours, holiday)),
});

export default connect(null, mapDispatchToProps)(DayOfTheWeek);
