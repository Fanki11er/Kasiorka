import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Section from '../../molecules/Section/Section';
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
    const sections = [
      { start: 1, end: 8 },
      { start: 9, end: 16 },
    ];
    return (
      <StyledWrapper>
        {sections.map(({ start, end }) => (
          <Section>
            {this.createWeek(month[0].days, start, end).map(({ id, nameOfDay, hours, holiday }) => (
              <DayOfTheWeek
                number={id}
                name={nameOfDay}
                hours={hours}
                holiday={holiday}
                key={id}
              ></DayOfTheWeek>
            ))}
          </Section>
        ))}
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
