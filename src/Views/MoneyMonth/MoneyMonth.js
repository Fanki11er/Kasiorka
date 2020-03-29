import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpensesModalContext from '../../context/ExpensesModalContext';
import Account from '../../components/organisms/Account/Account';
import AccountModal from '../../components/molecules/AccountModal/AccountModal';
import DeleteFixedTransactionsModal from '../../components/molecules/DeleteFixedTransacionsModal/DeleteFixedTransactionsModal';
import { getPayments } from '../../tools/moneyTools';
import { actualizeMoneyWithActualPayments as actualizeMoneyWithActualPaymentsAction } from '../../actions/moneyActions';

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  margin: 0 0 20px 0;
  width: 100%;
  justify-content: space-around;
`;

const MoneyMonth = ({ actualizeMoneyWithActualPayments, hours, prevYearData }) => {
  const [isExpensesModalOpened, setIsExpensesModalOpened] = useState(false);
  const [isDeleteFixedTransactionModalOpened, setIsFixedTransactionsModalOpened] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    id: null,
    type: null,
    action: null,
  });
  const [fixedTransactionsDeleteModalInfo, setFixedTransactionsDeleteModalInfo] = useState({
    selectedMonthId: null,
    path: null,
  });

  const toggleDeleteFixedTransactionsModal = (selectedMonthId, path) => {
    setIsFixedTransactionsModalOpened(!isDeleteFixedTransactionModalOpened);
    setFixedTransactionsDeleteModalInfo({ selectedMonthId, path });
  };

  const actualPayments = getPayments(hours, prevYearData);
  actualizeMoneyWithActualPayments(actualPayments);

  const toggleExpensesModal = (id, type, action) => {
    setIsExpensesModalOpened(!isExpensesModalOpened);
    setModalInfo({ id, type, action });
  };

  const expensesModalContext = {
    toggleExpensesModal,
    toggleDeleteFixedTransactionsModal,
  };

  return (
    <StyledWrapper>
      <ExpensesModalContext.Provider value={expensesModalContext}>
        <Account accountName={'mainAccount'} />
        <Account accountName={'debitCard'} />
        <Account accountName={'wallet'} />
        <Account accountName={'savingAccount'} />
        <AccountModal isExpensesModalOpened={isExpensesModalOpened} modalInfo={modalInfo} />
        <DeleteFixedTransactionsModal
          isDeleteFixedTransactionModalOpened={isDeleteFixedTransactionModalOpened}
          modalInfo={fixedTransactionsDeleteModalInfo}
          toggleModal={toggleDeleteFixedTransactionsModal}
        />
      </ExpensesModalContext.Provider>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ hours, prevYearData }) => {
  return {
    hours,
    prevYearData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actualizeMoneyWithActualPayments: newPayments =>
      dispatch(actualizeMoneyWithActualPaymentsAction(newPayments)),
  };
};

MoneyMonth.propTypes = {
  prevYearData: PropTypes.object,
  hours: PropTypes.object,
  actualizeMoneyWithActualPayments: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoneyMonth);
