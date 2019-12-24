import React, { Component } from 'react';
import styled from 'styled-components';
import HoursMonth from '../../components/organisms/HoursMonth/HoursMonth';
import MoneyMonth from '../../Views/MoneyMonth/MoneyMonth';
import Menu from '../../components/organisms/Menu/Menu';
import MenuContext from '../../context/MenuContext';
import Navigation from '../../components/organisms/Navigation/Navigation';
import Footer from '../../components/atoms/Footer/Footer';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px 0 15px 15px;
  margin-left: 415px;
  background-color: ${({ theme }) => theme.primary};
  min-height: 100vh;
  height: auto;
  max-width: 100%;
`;

class UserPage extends Component {
  state = {
    selectedMonthId: 11,
  };

  selectMonth = event => {
    this.setState({
      selectedMonthId: event.target.id - 1,
    });
  };

  render() {
    const { selectedMonthId } = this.state;
    const menuContext = {
      selectedMonthId,
      selectMonth: this.selectMonth,
    };

    const { pathname } = this.props.location;

    return (
      <StyledWrapper>
        <Navigation></Navigation>
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

export default UserPage;
