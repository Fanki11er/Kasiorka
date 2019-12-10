import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DayOfTheWeek from '../../molecules/DayOfWeek/DayOfWeek';

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  margin: 0 auto 0 auto;
  padding-left: 50px;
  width: 100%;
  justify-content: space-around;
`;

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 20px;
`;

class Month extends Component {
  addDaysToSection = (month, rangeStart, rangeEnd) => {
    const daysArr = [];
    month.map(day => {
      if (day.dayId >= rangeStart && day.dayId <= rangeEnd) {
        daysArr.push(day);
      }
    });
    return daysArr;
  };

  render() {
    const { month, monthName } = this.props;
    const sections = [
      { rangeStart: 1, rangeEnd: 8 },
      { rangeStart: 9, rangeEnd: 16 },
      { rangeStart: 17, rangeEnd: 24 },
      { rangeStart: 25, rangeEnd: 32 },
    ];
    return (
      <StyledWrapper>
        {sections.map(({ rangeStart, rangeEnd }) => (
          <StyledSection key={rangeStart}>
            {this.addDaysToSection(month, rangeStart, rangeEnd).map(
              ({ dayId, nameOfDay, workHours, isHoliday }) => (
                <DayOfTheWeek
                  dayId={dayId}
                  nameOfDay={nameOfDay}
                  workHours={workHours}
                  isHoliday={isHoliday}
                  key={dayId}
                ></DayOfTheWeek>
              ),
            )}
          </StyledSection>
        ))}
      </StyledWrapper>
    );
  }
}
const mapStateToProps = state => {
  return {
    month: state['styczeń'],
  };
};

export default connect(mapStateToProps)(Month);
