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
import { createNewYear, monthNames, findNextYear } from '../../tools/index';
import { routes } from '../../Router/routes';
import { addNewYear as addNewYearAction } from '../../actions/dataBaseActions';
import { takeDataFromDataBase as takeDataFromDataBaseAction } from '../../actions/dataBaseActions';
import { sendHoursToDataBase as sendHoursToDataBaseAction } from '../../actions/dataBaseActions';
import { monthHoursAutoFill as monthHoursAutoFillAction } from '../../actions/hoursActions';
import OpenCloseMenuButton from '../../components/atoms/OpenCloseMenuButton/OpenCloseMenuButton';
import { Account } from '../../tools/moneyTools';

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

  componentDidUpdate() {
    this.checkAmountOfFutureYears();
  }

  selectMonthOrYear = ({ target }, select) => {
    switch (select) {
      case 'month': {
        this.setState({
          selectedMonthId: target.id - 1,
        });
        break;
      }

      case 'year': {
        const {
          takeDataFromDataBase,
          sendHoursToDataBase,
          auth: { uid },
          user,
          isSaved,
        } = this.props;
        const selectedYear = user.yearsList[target.id];
        this.setState({
          selectedYear: selectedYear,
        });
        if (!isSaved) sendHoursToDataBase(uid);
        takeDataFromDataBase(uid, selectedYear);
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
    const {
      newYear,
      user: { yearsList },
    } = this.props;
    const years = yearsList;
    const year = findNextYear(years);
    newYear(createNewYear(monthNames, year), new Account());
    this.checkAmountOfFutureYears();
  };

  whenClosing = event => {
    event.preventDefault();
    const {
      isSaved,
      auth: { uid },
      sendHoursToDataBase,
    } = this.props;
    if (!isSaved) sendHoursToDataBase(uid);
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
    };

    const viewsContext = {
      selectedMonthId,
    };

    const { pathname } = this.props.location;

    const {
      auth: { uid },
    } = this.props;
    if (!uid) return <Redirect to={routes.login} />;
    if (pathname === '/user') return <Redirect to={'user/hours'} />;

    return (
      <StateIsLoaded>
        <>
          <StyledWrapper>
            <OpenCloseMenuButton opened={isMenuOpened} toggleMenu={this.toggleMenu} />
            <Navigation />
            <MenuContext.Provider value={menuContext}>
              <Menu />
              <EditSettings isSettingsModalOpened={isSettingsModalOpened} />
            </MenuContext.Provider>
            <ViewsContext.Provider value={viewsContext}>
              {pathname === '/user/hours' && <HoursMonth />}
              {pathname === '/user/money' && <MoneyMonth />}
            </ViewsContext.Provider>
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

const mapStateToProps = ({ hours, firebase, user }) => {
  return {
    months: hours.months,
    auth: firebase.auth,
    user,
    isSaved: hours.isSaved,
    userHoursSettings: user.hoursSettings,
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
