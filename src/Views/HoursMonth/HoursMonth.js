import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DayOfTheWeek from '../../components/molecules/DayOfWeek/DayOfWeek';
import Summary from '../../components/molecules/Summary/Summary';
import { addDaysToSection, sections } from '../../tools/index';

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  margin: 0 0 20px 0;
  width: 100%;
  justify-content: space-around;
`;

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 20px;
`;

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 0px auto 0 auto;
`;

const mapStateToProps = state => {
  //console.log(state);
  //console.log(`years`, state.years);
  return {
    months: state.years,
  };
};

class HoursMonth extends Component {
  render() {
    const { months, monthId } = this.props;

    return (
      <StyledView>
        <StyledWrapper>
          {months.length > 0 &&
            sections.map(({ rangeStart, rangeEnd }) => (
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
        <Summary />
      </StyledView>
    );
  }
}

HoursMonth.propTypes = {
  months: PropTypes.array.isRequired,
  monthId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(HoursMonth);
