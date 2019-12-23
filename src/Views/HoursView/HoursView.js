import React, { Component } from 'react';
import styled from 'styled-components';
import HoursMonth from '../../components/organisms/HoursMonth/HoursMonth';
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

class HoursView extends Component {
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

    return (
      <StyledWrapper>
        <MenuContext.Provider value={menuContext}>
          <Menu />
        </MenuContext.Provider>

        <HoursMonth monthId={selectedMonthId}></HoursMonth>
      </StyledWrapper>
    );
  }
}

export default HoursView;
