import React, { Component } from 'react';
import styled from 'styled-components';
import ExpensesModalContext from '../../context/ExpensesModalContext';
import MoneyAccount from '../../components/organisms/MoneyAccount/MoneyAccount';

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  margin: 0 0 20px 0;
  width: 100%;
  justify-content: space-around;
`;

class MoneyMonth extends Component {
  state = {
    isExpensesModalOpened: false,
  };

  toggleExpensesModal = () => {
    this.setState(({ isExpensesModalOpened }) => {
      return {
        isExpensesModalOpened: !isExpensesModalOpened,
      };
    });
  };

  render() {
    const expensesModalContext = {
      toggleExpensesModal: this.toggleExpensesModal,
    };
    return (
      <StyledWrapper>
        <ExpensesModalContext.Provider value={expensesModalContext}>
          <MoneyAccount />
        </ExpensesModalContext.Provider>
      </StyledWrapper>
    );
  }
}

export default MoneyMonth;
