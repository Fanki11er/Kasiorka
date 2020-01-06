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
import { createNewYear, monthNames, findNextYear } from '../../tools/index';
import { addNewYear as addNewYearAction } from '../../actions/dataBaseActions';
import { routes } from '../../Router/routes';
import { takeDataFromDataBase as takeDataFromDataBaseAction } from '../../actions/dataBaseActions';
import { sendHoursToDataBase as sendHoursToDataBaseAction } from '../../actions/dataBaseActions';

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
`;

class UserPage extends Component {
  state = {
    selectedMonthId: new Date().getMonth(),
    selectedYear: new Date().getFullYear(),
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
        //!Make it async
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

  addNewYear = () => {
    const { newYear, user } = this.props;
    const years = user.yearsList;
    const year = findNextYear(years);
    newYear(createNewYear(monthNames, year));
  };

  whenClosing = event => {
    event.preventDefault();
    const { isSaved, auth, sendHoursToDataBase } = this.props;
    if (!isSaved) sendHoursToDataBase(auth.uid);
  };

  render() {
    const { selectedMonthId, selectedYear } = this.state;
    const menuContext = {
      selectedMonthId,
      selectedYear,
      selectMonthOrYear: this.selectMonthOrYear,
      addNewYear: this.addNewYear,
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
  };
};

const mapStateToProps = state => {
  return {
    months: state.hours.months,
    auth: state.firebase.auth,
    user: state.user,
    isSaved: state.hours.isSaved,
  };
};

UserPage.propTypes = {
  months: PropTypes.array,
  auth: PropTypes.object,
  user: PropTypes.object,
  newYear: PropTypes.func.isRequired,
  takeDataFromDataBase: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
