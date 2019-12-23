import React, { Component } from 'react';
import styled from 'styled-components';
import HoursMonth from '../../components/organisms/HoursMonth/HoursMonth';
import MoneyMonth from '../../Views/MoneyMonth/MoneyMonth';
import Menu from '../../components/organisms/Menu/Menu';
import MenuContext from '../../context/MenuContext';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 15px 0;
  margin-left: 415px;
  background-color: ${({ theme }) => theme.primary};
  min-height: 100vh;
  max-width: 100vw;
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
        <MenuContext.Provider value={menuContext}>
          <Menu />
        </MenuContext.Provider>

        {pathname === '/user/hours' && <HoursMonth monthId={selectedMonthId}></HoursMonth>}
        {pathname === '/user/money' && <MoneyMonth></MoneyMonth>}
      </StyledWrapper>
    );
  }
}

export default UserPage;
