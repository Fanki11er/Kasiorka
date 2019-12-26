import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import HoursMonth from '../../Views//HoursMonth/HoursMonth';
import MoneyMonth from '../../Views/MoneyMonth/MoneyMonth';
import Menu from '../../components/organisms/Menu/Menu';
import MenuContext from '../../context/MenuContext';
import Navigation from '../../components/organisms/Navigation/Navigation';
import Footer from '../../components/atoms/Footer/Footer';
import { createNewYear, monthNames, findNextYear } from '../../tools/index';
import { addNewYear as addNewYearAction } from '../../actions/index';

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
    selectedMonthId: 11,
    years: ['2019'],
  };
  selectMonth = event => {
    this.setState({
      selectedMonthId: event.target.id - 1,
    });
  };

  addNewYear = () => {
    const { years } = this.state;
    const { newYear } = this.props;
    const year = findNextYear(years);
    newYear(createNewYear(monthNames, year));
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

    return (
      <StyledWrapper>
        <Navigation />
        <MenuContext.Provider value={menuContext}>
          <Menu />
        </MenuContext.Provider>
        {pathname === '/user/hours' && <HoursMonth monthId={selectedMonthId}></HoursMonth>}
        {pathname === '/user/money' && <MoneyMonth></MoneyMonth>}
        <Footer />
      </StyledWrapper>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    newYear: year => dispatch(addNewYearAction(year)),
  };
};

export default connect(null, mapDispatchToProps)(UserPage);
