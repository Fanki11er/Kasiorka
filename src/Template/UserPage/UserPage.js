import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import HoursMonth from '../../Views//HoursMonth/HoursMonth';
import MoneyMonth from '../../Views/MoneyMonth/MoneyMonth';
import Menu from '../../components/organisms/Menu/Menu';
import MenuContext from '../../context/MenuContext';
import ViewsContext from '../../context/ViewsContext';
import Navigation from '../../components/organisms/Navigation/Navigation';
import Footer from '../../components/atoms/Footer/Footer';
import StateIsLoaded from '../../components/atoms/StateIsLoaded/StateIsLoaded';
import EditSettings from '../../components/organisms/EditSettings/EditSettings';
import ErrorsInfoModal from '../../components/molecules/ErrorsInfoModal/ErrorsInfoModal';
import { createNewYear, monthNames, findNextYear } from '../../tools/index';
import { routes } from '../../Router/routes';
import { addNewYear as addNewYearAction } from '../../actions/dataBaseActions';
import { takeDataFromDataBase as takeDataFromDataBaseAction } from '../../actions/dataBaseActions';
import { sendHoursToDataBase as sendHoursToDataBaseAction } from '../../actions/dataBaseActions';
import { monthHoursAutoFill as monthHoursAutoFillAction } from '../../actions/hoursActions';
import { sendMoneyToDataBase as sendMoneyToDataBaseAction } from '../../actions/dataBaseActions';
import { reCalculateMoney as reCalculateMoneyAction } from '../../actions/moneyActions';
import { canNotReCalculate as canNotReCalculateAction } from '../../actions/moneyActions';
import OpenCloseMenuButton from '../../components/atoms/OpenCloseMenuButton/OpenCloseMenuButton';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px 0 15px 15px;
  margin-left: 415px;
  background-color: ${({ theme }) => theme.primary};
  min-height: 110vh;
  height: auto;
  width: calc(100% - 420px);

  @media screen and (max-width: 1920px) {
    width: calc(100% - ${({ theme }) => theme.menuWidth.mediumScreen} + 8px);
    margin-left: calc(${({ theme }) => theme.menuWidth.mediumScreen} - 5px);
  }
  @media screen and (max-width: 770px) {
    margin-left: 0;
    width: 100%;
    padding-left: 0;
  }
`;

class UserPage extends Component {
  state = {
    selectedMonthId: new Date().getMonth(),
    selectedYear: new Date().getFullYear(),
    isSettingsModalOpened: false,
    limitOfYears: false,
    isMenuOpened: false,
    isLoading: null,
    errorsOccurred: false,
  };

  componentDidMount() {
    const { selectedYear } = this.state;
    const {
      auth: { uid },
      takeDataFromDataBase,
    } = this.props;
    takeDataFromDataBase(uid, selectedYear);

    window.addEventListener('beforeunload', this.whenClosing);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.whenClosing);
  }

  componentDidUpdate(prevProps) {
    const { errors } = this.props;
    this.checkAmountOfFutureYears();
    this.testState();
    this.showErrors(prevProps, errors);
  }

  testState = () => {
    if (this.state.isLoading !== this.props.isLoading) {
      this.setState({
        isLoading: this.props.isLoading,
      });
    }
  };

  showErrors = (prevProps, errorsList) => {
    if (prevProps.errors !== errorsList) {
      this.setState({ errorsOccurred: true });
    }
  };

  closeErrorsModal = () => {
    this.setState({ errorsOccurred: false });
  };

  selectMonthOrYear = ({ target }, select) => {
    switch (select) {
      case 'month': {
        this.setState({
          selectedMonthId: target.id - 1,
        });
        break;
      }

      case 'year': {
        let intervalLoop = 0;
        const {
          takeDataFromDataBase,
          sendHoursToDataBase,
          sendMoneyToDataBase,
          reCalculateMoney,
          canNotReCalculate,
          auth: { uid },
          user,
          isSaved,
          moneyIsSaved,
        } = this.props;
        const selectedYear = user.yearsList[target.id];
        this.setState({
          selectedYear: selectedYear,
        });
        if (!isSaved) sendHoursToDataBase(uid);
        if (!moneyIsSaved) sendMoneyToDataBase(uid);
        takeDataFromDataBase(uid, selectedYear);
        const interval = setInterval(() => {
          if (this.state.isLoading === false) {
            reCalculateMoney();
            sendMoneyToDataBase(uid);
            clearInterval(interval);
          }

          if (intervalLoop > 30) {
            clearInterval(interval);
            canNotReCalculate();
          }
          intervalLoop++;
        }, 500);

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
    const {
      user: { yearsList },
    } = this.props;
    const { limitOfYears } = this.state;
    if (!limitOfYears && yearsList && yearsList.indexOf(presentYear) + 1 < yearsList.length) {
      this.setState({
        limitOfYears: true,
      });
    }
    if (limitOfYears && yearsList && yearsList.indexOf(presentYear) + 1 >= yearsList.length) {
      this.setState({
        limitOfYears: false,
      });
    }
  };

  addNewYear = () => {
    const {
      newYear,
      user: { yearsList },
    } = this.props;
    const years = yearsList;
    const year = findNextYear(years);
    newYear(createNewYear(monthNames, year));
    this.checkAmountOfFutureYears();
  };

  whenClosing = (event) => {
    event.preventDefault();
    const {
      isSaved,
      moneyIsSaved,
      auth: { uid },
      sendHoursToDataBase,
      sendMoneyToDataBase,
    } = this.props;
    if (!isSaved) sendHoursToDataBase(uid);
    if (!moneyIsSaved) sendMoneyToDataBase(uid);
  };

  toggleSettingsModal = () => {
    this.setState(({ isSettingsModalOpened }) => {
      return {
        isSettingsModalOpened: !isSettingsModalOpened,
      };
    });
  };

  autoFilHoursMonth = () => {
    const { selectedMonthId } = this.state;
    const { monthHoursAutoFill, userHoursSettings } = this.props;
    monthHoursAutoFill(selectedMonthId, userHoursSettings);
  };

  toggleMenu = () => {
    this.setState(({ isMenuOpened }) => {
      return {
        isMenuOpened: !isMenuOpened,
      };
    });
  };

  render() {
    const {
      selectedMonthId,
      selectedYear,
      isSettingsModalOpened,
      limitOfYears,
      isMenuOpened,
      errorsOccurred,
    } = this.state;

    const menuContext = {
      selectedMonthId,
      selectedYear,
      selectMonthOrYear: this.selectMonthOrYear,
      addNewYear: this.addNewYear,
      toggleSettingsModal: this.toggleSettingsModal,
      autoFilHoursMonth: this.autoFilHoursMonth,
      limitOfYears,
      isMenuOpened,
      selectedPage: this.props.location,
      toggleMenu: this.toggleMenu,
    };

    const viewsContext = {
      selectedMonthId,
    };

    const { pathname } = this.props.location;
    const { hours, money, login, user } = routes;

    const {
      auth: { uid },
      errors,
    } = this.props;
    if (!uid) return <Redirect to={login} />;
    if (pathname === user) return <Redirect to={money} />;
    if (pathname !== user && pathname !== money && pathname !== hours)
      return <Redirect to={money} />;

    return (
      <StateIsLoaded>
        <>
          <StyledWrapper>
            <OpenCloseMenuButton opened={isMenuOpened} toggleMenu={this.toggleMenu} />
            <MenuContext.Provider value={menuContext}>
              <Navigation />
              <Menu />
              <EditSettings isSettingsModalOpened={isSettingsModalOpened} />
            </MenuContext.Provider>
            <ViewsContext.Provider value={viewsContext}>
              {pathname === hours && <HoursMonth />}
              {pathname === money && <MoneyMonth />}
            </ViewsContext.Provider>
            <ErrorsInfoModal
              errors={errors}
              errorsOccurred={errorsOccurred}
              closeModal={this.closeErrorsModal}
            />
            <Footer />
          </StyledWrapper>
        </>
      </StateIsLoaded>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newYear: (year) => dispatch(addNewYearAction(year)),
    takeDataFromDataBase: (uid, year) => dispatch(takeDataFromDataBaseAction(uid, year)),
    sendHoursToDataBase: (uid) => dispatch(sendHoursToDataBaseAction(uid)),
    monthHoursAutoFill: (monthId, userHoursSettings) =>
      dispatch(monthHoursAutoFillAction(monthId, userHoursSettings)),
    sendMoneyToDataBase: (uid) => dispatch(sendMoneyToDataBaseAction(uid)),
    reCalculateMoney: () => dispatch(reCalculateMoneyAction()),
    canNotReCalculate: () => dispatch(canNotReCalculateAction()),
  };
};

const mapStateToProps = ({ hours, firebase, user, money, prevYearData, errors }) => {
  return {
    months: hours.months,
    auth: firebase.auth,
    user,
    isSaved: hours.isSaved,
    userHoursSettings: user.hoursSettings,
    moneyIsSaved: money.isSaved,
    isLoading: money.isLoading,
    errors: errors,
  };
};

UserPage.propTypes = {
  months: PropTypes.array,
  auth: PropTypes.object,
  user: PropTypes.object,
  newYear: PropTypes.func.isRequired,
  takeDataFromDataBase: PropTypes.func.isRequired,
  monthHoursAutoFill: PropTypes.func.isRequired,
  moneyIsSaved: PropTypes.bool.isRequired,
  reCalculateMoney: PropTypes.func.isRequired,
  canNotReCalculate: PropTypes.func.isRequired,
  errors: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
