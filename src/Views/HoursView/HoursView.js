import React, { Component } from 'react';
import styled from 'styled-components';
import Month from '../../components/organisms/Month/Month';
import Menu from '../../components/organisms/Menu/Menu';
import MenuContext from '../../context/MenuContext';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 30px;
  background-color: ${({ theme }) => theme.primary};
  min-height: 100vh;
  max-width: 100vw;
  max-width: 100vw;
`;

class HoursView extends Component {
  state = {
    selectedMonthId: 0,
  };

  selectMonth = event => {
    this.setState({
      selectedMonthId: event.target.id - 1,
    });
  };

  render() {
    const { selectedMonthId } = this.state;

    return (
      <StyledWrapper>
        <MenuContext.Provider value={this.selectMonth}>
          <Menu />
        </MenuContext.Provider>

        <Month monthId={selectedMonthId}></Month>
      </StyledWrapper>
    );
  }
}

export default HoursView;
