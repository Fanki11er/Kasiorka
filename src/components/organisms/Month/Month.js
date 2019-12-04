import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Week from '../../molecules/Week/Week';
import DayOfTheWeek from '../../molecules/DayOfWeek/DayOfWeek';

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  margin: 0 auto 0 auto;
  padding-left: 50px;
  width: 100%;
  justify-content: space-around;
`;

class Month extends Component {
  createWeek = (month, start, end) => {
    const days = [];
    month.forEach(day => {
      if (day.id >= start && day.id <= end) {
        days.push(day);
      }
    });
    return days;
  };

  render() {
    const { month } = this.props;
    return (
      <StyledWrapper>
        <Week>
          {this.createWeek(month[0].days, 1, 2).map(({ id, nameOfDay, hours, holiday }) => (
            <DayOfTheWeek
              number={id}
              name={nameOfDay}
              hours={hours}
              holiday={holiday}
              key={id}
            ></DayOfTheWeek>
          ))}
        </Week>
        <Week>
          {this.createWeek(month[0].days, 3, 4).map(({ id, nameOfDay, hours, holiday }) => (
            <DayOfTheWeek
              number={id}
              name={nameOfDay}
              hours={hours}
              holiday={holiday}
              key={id}
            ></DayOfTheWeek>
          ))}
        </Week>
      </StyledWrapper>
    );
  }
}

const mapStateToProps = ({ months }) => {
  return {
    month: months,
  };
};

export default connect(mapStateToProps)(Month);
