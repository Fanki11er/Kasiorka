import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HoursMonth from '../../Views//HoursMonth/HoursMonth';
import MoneyMonth from '../../Views/MoneyMonth/MoneyMonth';
import Menu from '../../components/organisms/Menu/Menu';
import MenuContext from '../../context/MenuContext';
import Navigation from '../../components/organisms/Navigation/Navigation';
import Footer from '../../components/atoms/Footer/Footer';
import { createNewYear, monthNames, findNextYear } from '../../tools/index';
import { addNewYear as addNewYearAction } from '../../actions/index';
import { routes } from '../../Router/routes';
import { takeDataFromDataBase as takeDataFromDataBaseAction } from '../../actions/dataBaseActions';

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
    years: ['2020'],
  };

  componentDidMount() {
    const { auth, takeDataFromDataBase } = this.props;
    takeDataFromDataBase(auth.uid, 2019);
  }

  selectMonth = event => {
    this.setState({
      selectedMonthId: event.target.id - 1,
    });
  };

  addNewYear = () => {
    const { years } = this.state;
    const { newYear } = this.props;
    const year = findNextYear(years);
    //newYear(createNewYear(monthNames, year));
  };

  render() {
    const { selectedMonthId, years } = this.state;
    const menuContext = {
      selectedMonthId,
      selectMonth: this.selectMonth,
      addNewYear: this.addNewYear,
      years,
    };

    const { pathname } = this.props.location;

    const { auth, months } = this.props;

    if (!auth.uid) return <Redirect to={routes.login} />;
    if (pathname === '/user') return <Redirect to={'user/hours'} />;

    return (
      <StyledWrapper>
        <Navigation />
        <MenuContext.Provider value={menuContext}>
          <Menu />
        </MenuContext.Provider>

        {pathname === '/user/hours' && (
          <HoursMonth monthId={selectedMonthId} months={months}></HoursMonth>
        )}
        {pathname === '/user/money' && <MoneyMonth></MoneyMonth>}
        <Footer />
      </StyledWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newYear: year => dispatch(addNewYearAction(year)),
    takeDataFromDataBase: (uid, year) => dispatch(takeDataFromDataBaseAction(uid, year)),
  };
};

const mapStateToProps = state => {
  return {
    months: state.years,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
