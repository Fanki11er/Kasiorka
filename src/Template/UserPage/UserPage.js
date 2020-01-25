import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import HoursMonth from '../../Views//HoursMonth/HoursMonth';
import MoneyMonth from '../../Views/MoneyMonth/MoneyMonth';
import Menu from '../../components/organisms/Menu/Menu';
import MenuContext from '../../context/MenuContext';
import Navigation from '../../components/organisms/Navigation/Navigation';
import Footer from '../../components/atoms/Footer/Footer';
import StateIsLoaded from '../../components/atoms/StateIsLoaded/StateIsLoaded';
import EditSettings from '../../components/organisms/EditSettings/EditSettings';
import { createNewYear, monthNames, findNextYear } from '../../tools/index';
import { routes } from '../../Router/routes';
import { addNewYear as addNewYearAction } from '../../actions/dataBaseActions';
import { takeDataFromDataBase as takeDataFromDataBaseAction } from '../../actions/dataBaseActions';
import { sendHoursToDataBase as sendHoursToDataBaseAction } from '../../actions/dataBaseActions';
import { monthHoursAutoFill as monthHoursAutoFillAction } from '../../actions/hoursActions';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px 0 15px 15px;
  margin-left: 415px;
  background-color: ${({ theme }) => theme.primary};
  min-height: 100vh;
  height: auto;
  width: calc(100% - 420px);

  @media screen and (max-width: 1920px) {
    width: calc(100% - ${({ theme }) => theme.menuWidth.mediumScreen} + 7px);
    margin-left: calc(${({ theme }) => theme.menuWidth.mediumScreen} - 5px);
  }
  @media screen and (max-width: 760px) {
    margin-left: 0;
    width: 100%;
  }
`;

class UserPage extends Component {
  state = {
    selectedMonthId: new Date().getMonth(),
    selectedYear: new Date().getFullYear(),
    isSettingsModalOpened: false,
    limitOfYears: false,
  };

  componentDidMount() {
    const { selectedYear } = this.state;
    const { auth, takeDataFromDataBase } = this.props;
    takeDataFromDataBase(auth.uid, selectedYear);
    window.addEventListener('beforeunload', this.whenClosing);
  }
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.whenClosing);
  }

  componentDidUpdate() {
    this.checkAmountOfFutureYears();
  }

  selectMonthOrYear = (event, select) => {
    switch (select) {
      case 'month': {
        this.setState({
          selectedMonthId: event.target.id - 1,
        });
        break;
      }

      case 'year': {
        const { takeDataFromDataBase, sendHoursToDataBase, auth, user, isSaved } = this.props;
        const selectedYear = user.yearsList[event.target.id];
        this.setState({
          selectedYear: selectedYear,
        });
        if (!isSaved) sendHoursToDataBase(auth.uid);
        takeDataFromDataBase(auth.uid, selectedYear);
        break;
      }
      default: {
        this.setState({
          selectedYear: new Date().getFullYear(),
          selectedMonthId: 0,
        });
        break;
      }
    }
  };

  checkAmountOfFutureYears = () => {
    const presentYear = new Date().getFullYear();
    const { user } = this.props;
    const { limitOfYears } = this.state;
    const yearsList = user.yearsList;
    if (!limitOfYears && yearsList && yearsList.indexOf(presentYear) + 3 < yearsList.length) {
      this.setState({
        limitOfYears: true,
      });
    }
    if (limitOfYears && yearsList && yearsList.indexOf(presentYear) + 3 >= yearsList.length) {
      this.setState({
        limitOfYears: false,
      });
    }
  };

  addNewYear = () => {
    const { newYear, user } = this.props;
    const years = user.yearsList;
    const year = findNextYear(years);
    newYear(createNewYear(monthNames, year));
    this.checkAmountOfFutureYears();
  };

  whenClosing = event => {
    event.preventDefault();
    const { isSaved, auth, sendHoursToDataBase } = this.props;
    if (!isSaved) sendHoursToDataBase(auth.uid);
  };

  toggleSettingsModal = () => {
    this.setState(prevState => {
      return {
        isSettingsModalOpened: !prevState.isSettingsModalOpened,
      };
    });
  };

  autoFilHoursMonth = () => {
    const { selectedMonthId } = this.state;
    const { monthHoursAutoFill, userHoursSettings } = this.props;
    monthHoursAutoFill(selectedMonthId, userHoursSettings);
  };

  render() {
    const { selectedMonthId, selectedYear, isSettingsModalOpened, limitOfYears } = this.state;
    const menuContext = {
      selectedMonthId,
      selectedYear,
      selectMonthOrYear: this.selectMonthOrYear,
      addNewYear: this.addNewYear,
      toggleSettingsModal: this.toggleSettingsModal,
      autoFilHoursMonth: this.autoFilHoursMonth,
      limitOfYears,
    };

    const { pathname } = this.props.location;

    const { auth } = this.props;
    if (!auth.uid) return <Redirect to={routes.login} />;
    if (pathname === '/user') return <Redirect to={'user/hours'} />;

    return (
      <StateIsLoaded>
        <>
          <StyledWrapper>
            <Navigation />
            <MenuContext.Provider value={menuContext}>
              <Menu />
              <EditSettings isSettingsModalOpened={isSettingsModalOpened} />
            </MenuContext.Provider>

            {pathname === '/user/hours' && <HoursMonth monthId={selectedMonthId}></HoursMonth>}
            {pathname === '/user/money' && <MoneyMonth></MoneyMonth>}
            <Footer />
          </StyledWrapper>
        </>
      </StateIsLoaded>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newYear: year => dispatch(addNewYearAction(year)),
    takeDataFromDataBase: (uid, year) => dispatch(takeDataFromDataBaseAction(uid, year)),
    sendHoursToDataBase: uid => dispatch(sendHoursToDataBaseAction(uid)),
    monthHoursAutoFill: (monthId, userHoursSettings) =>
      dispatch(monthHoursAutoFillAction(monthId, userHoursSettings)),
  };
};

const mapStateToProps = state => {
  return {
    months: state.hours.months,
    auth: state.firebase.auth,
    user: state.user,
    isSaved: state.hours.isSaved,
    userHoursSettings: state.user.hoursSettings,
  };
};

UserPage.propTypes = {
  months: PropTypes.array,
  auth: PropTypes.object,
  user: PropTypes.object,
  newYear: PropTypes.func.isRequired,
  takeDataFromDataBase: PropTypes.func.isRequired,
  monthHoursAutoFill: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
