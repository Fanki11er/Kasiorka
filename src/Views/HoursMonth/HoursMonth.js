import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SummaryContext from '../../context/SummaryContext';
import { addDaysToSection, sections } from '../../tools/index';
import { sendHoursToDataBase as sendHoursToDataBaseAction } from '../../actions/dataBaseActions';
import DayOfTheWeek from '../../components/molecules/DayOfWeek/DayOfWeek';
import Summary from '../../components/molecules/Summary/Summary';
import EditSummaryOptions from '../../components/organisms/EditSummaryOptions/EditSummaryOptions';

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

class HoursMonth extends Component {
  state = {
    isSummaryModalOpened: false,
    chosenOption: null,
  };
  componentWillUnmount() {
    const { sendHoursToDataBase, auth, isSaved } = this.props;
    if (!isSaved) {
      sendHoursToDataBase(auth.uid);
    }
  }

  render() {
    const { hours, monthId } = this.props;
    const { isSummaryModalOpened, chosenOption } = this.state;
    const months = hours.months;
    const optionsToChose = {
      optionSalary: 'salary',
      optionPayment: 'payment',
    };
    const { optionSalary } = optionsToChose;

    const toggleEditSummaryModal = (chosenOption = optionSalary) => {
      this.setState(prevState => {
        return {
          isSummaryModalOpened: !prevState.isSummaryModalOpened,
          chosenOption,
        };
      });
    };

    const summaryContext = {
      toggleEditSummaryModal,
      monthId,
      optionsToChose,
    };

    return (
      <StyledView>
        <StyledWrapper>
          {months &&
            months.length > 0 &&
            sections.map(({ rangeStart, rangeEnd }) => (
              <StyledSection key={rangeStart}>
                {addDaysToSection(months[monthId].days, rangeStart, rangeEnd).map(
                  ({ dayId, nameOfDay, workHours, isSaturday, isSunday }) => (
                    <DayOfTheWeek
                      dayId={dayId}
                      nameOfDay={nameOfDay}
                      workHours={workHours}
                      isSaturday={isSaturday}
                      isSunday={isSunday}
                      key={dayId}
                      monthId={monthId}
                    ></DayOfTheWeek>
                  ),
                )}
              </StyledSection>
            ))}
        </StyledWrapper>
        <SummaryContext.Provider value={summaryContext}>
          <Summary monthId={monthId} />
          <EditSummaryOptions
            isSummaryModalOpened={isSummaryModalOpened}
            chosenOption={chosenOption}
            monthId={monthId}
          />
        </SummaryContext.Provider>
      </StyledView>
    );
  }
}

HoursMonth.propTypes = {
  months: PropTypes.array,
  monthId: PropTypes.number.isRequired,
};

const mapStateToProps = state => {
  return {
    hours: state.hours,
    auth: state.firebase.auth,
    isSaved: state.hours.isSaved,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendHoursToDataBase: uid => dispatch(sendHoursToDataBaseAction(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HoursMonth);
