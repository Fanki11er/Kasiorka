import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DayOfTheWeek from '../../molecules/DayOfWeek/DayOfWeek';
import { addDaysToSection, sections } from '../../../tools/index';

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  margin: 50px auto 0 auto;

  width: 85%;
  justify-content: space-around;
`;

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 20px;
`;

const mapStateToProps = state => {
  return {
    months: state,
  };
};

class Month extends Component {
  render() {
    const { months, monthId } = this.props;

    return (
      <StyledWrapper>
        {sections.map(({ rangeStart, rangeEnd }) => (
          <StyledSection key={rangeStart}>
            {addDaysToSection(months[monthId].days, rangeStart, rangeEnd).map(
              ({ dayId, nameOfDay, workHours, isHoliday }) => (
                <DayOfTheWeek
                  dayId={dayId}
                  nameOfDay={nameOfDay}
                  workHours={workHours}
                  isHoliday={isHoliday}
                  key={dayId}
                  monthId={monthId}
                ></DayOfTheWeek>
              ),
            )}
          </StyledSection>
        ))}
      </StyledWrapper>
    );
  }
}

export default connect(mapStateToProps)(Month);
