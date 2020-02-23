import React, { Component } from 'react';
import styled from 'styled-components';
import ExpensesModalContext from '../../context/ExpensesModalContext';
import MainAccount from '../../components/organisms/MainAccount/MainAccount';
import AccountModal from '../../components/molecules/AccountModal/AccountModal';

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
    modalInfo: {
      id: null,
      type: null,
      action: null,
    },
  };

  componentDidMount() {}

  toggleExpensesModal = (id, type, action) => {
    this.setState(({ isExpensesModalOpened }) => {
      return {
        isExpensesModalOpened: !isExpensesModalOpened,
        modalInfo: {
          id,
          type,
          action,
        },
      };
    });
  };

  render() {
    const { isExpensesModalOpened, modalInfo } = this.state;

    const expensesModalContext = {
      toggleExpensesModal: this.toggleExpensesModal,
    };

    return (
      <StyledWrapper>
        <ExpensesModalContext.Provider value={expensesModalContext}>
          <MainAccount />
          <AccountModal isExpensesModalOpened={isExpensesModalOpened} modalInfo={modalInfo} />
        </ExpensesModalContext.Provider>
      </StyledWrapper>
    );
  }
}

export default MoneyMonth;
