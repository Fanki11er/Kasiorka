import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { initGA, pageView } from '../../tools/reactGaSetup';
import SummaryContext from '../../context/SummaryContext';
import HoursSection from '../../components/molecules/HoursSection/HoursSection';
import { sendHoursToDataBase as sendHoursToDataBaseAction } from '../../actions/dataBaseActions';
import { sendMoneyToDataBase as sendMoneyToDataBaseAction } from '../../actions/dataBaseActions';
import Summary from '../../components/molecules/Summary/Summary';
import EditSummaryOptions from '../../components/organisms/EditSummaryOptions/EditSummaryOptions';
import withViewsContext from '../../hoc/withViewsContext';

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

  componentDidMount() {
    initGA();
    pageView();
  }

  componentDidUpdate() {
    const {
      isSaved,
      auth: { uid },
      sendHoursToDataBase,
      sendMoneyToDataBase,
      moneyIsSaved,
    } = this.props;
    this.autoSave(isSaved, uid, sendHoursToDataBase);
    this.autoSave(moneyIsSaved, uid, sendMoneyToDataBase);
  }

  autoSave(isSaved, uid, saveFunc) {
    const { autoSaveInProgress } = this.state;

    const check = () => {
      if (!isSaved) saveFunc(uid);
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
      isSummaryModalOpened,
      monthId,
      optionsToChose,
    };
    return (
      <StyledView>
        <HoursSection months={months} monthId={monthId} />

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

const mapStateToProps = ({ hours, firebase, money }) => {
  return {
    hours,
    auth: firebase.auth,
    isSaved: hours.isSaved,
    moneyIsSaved: money.isSaved,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendHoursToDataBase: (uid) => dispatch(sendHoursToDataBaseAction(uid)),
    sendMoneyToDataBase: (uid) => dispatch(sendMoneyToDataBaseAction(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withViewsContext(HoursMonth));
