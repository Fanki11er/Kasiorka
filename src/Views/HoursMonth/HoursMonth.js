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
import withViewsContext from '../../hoc/withViewsContext';

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
  @media screen and (max-width: 1920px) {
    margin: 20px 15px;
  }
`;

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 0px auto 0 auto;
  @media screen and (max-width: 767px) {
    align-items: center;
    margin: 0 10px;
    width: 95%;
  }
`;

class HoursMonth extends Component {
  state = {
    isSummaryModalOpened: false,
    chosenOption: null,
    autoSaveInProgress: false,
    timeout: null,
  };

  componentDidUpdate() {
    this.autoSave();
  }

  autoSave() {
    const {
      isSaved,
      auth: { uid },
      sendHoursToDataBase,
    } = this.props;
    const { autoSaveInProgress } = this.state;

    const check = () => {
      if (!isSaved) sendHoursToDataBase(uid);
      this.setState(({ autoSaveInProgress }) => {
        return {
          autoSaveInProgress: !autoSaveInProgress,
        };
      });
    };

    if (!isSaved && !autoSaveInProgress) {
      this.setState(({ autoSaveInProgress }) => {
        return {
          autoSaveInProgress: !autoSaveInProgress,
        };
      });
      this.setState({ timeout: setTimeout(check, 1500) });
    }
  }

  componentWillUnmount() {
    const {
      sendHoursToDataBase,
      auth: { uid },
      isSaved,
    } = this.props;
    const { timeout } = this.state;

    if (!isSaved) {
      sendHoursToDataBase(uid);
    }

    clearTimeout(timeout);
  }

  render() {
    const {
      hours: { months },
      viewsContext: { selectedMonthId: monthId },
    } = this.props;
    const { isSummaryModalOpened, chosenOption } = this.state;

    const optionsToChose = {
      optionSalary: 'salary',
      optionPayment: 'payment',
    };
    const { optionSalary } = optionsToChose;

    const toggleEditSummaryModal = (chosenOption = optionSalary) => {
      this.setState(({ isSummaryModalOpened }) => {
        return {
          isSummaryModalOpened: !isSummaryModalOpened,
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
                  ({
                    dayId,
                    nameOfDay,
                    workHours,
                    isSaturday,
                    isSunday,
                    isHoliday,
                    holidayDesc,
                  }) => (
                    <DayOfTheWeek
                      dayId={dayId}
                      nameOfDay={nameOfDay}
                      workHours={workHours}
                      isSaturday={isSaturday}
                      isSunday={isSunday}
                      isHoliday={isHoliday}
                      holidayDesc={holidayDesc}
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
};

const mapStateToProps = ({ hours, firebase }) => {
  return {
    hours,
    auth: firebase.auth,
    isSaved: hours.isSaved,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendHoursToDataBase: uid => dispatch(sendHoursToDataBaseAction(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withViewsContext(HoursMonth));
