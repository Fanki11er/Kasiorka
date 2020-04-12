import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpensesModalContext from '../../context/ExpensesModalContext';
import Account from '../../components/organisms/Account/Account';
import AccountModal from '../../components/molecules/AccountModal/AccountModal';
import DeleteFixedTransactionsModal from '../../components/molecules/DeleteFixedTransacionsModal/DeleteFixedTransactionsModal';
import DebitModal from '../../components/molecules/DebitModal/DebitModal';
import { getPayments } from '../../tools/moneyTools';
import { actualizeMoneyWithActualPayments as actualizeMoneyWithActualPaymentsAction } from '../../actions/moneyActions';
import { sendMoneyToDataBase as sendMoneyToDataBaseAction } from '../../actions/dataBaseActions';

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  margin: 0 0 20px 0;
  width: 100%;
  justify-content: space-around;
`;

const MoneyMonth = ({
  actualizeMoneyWithActualPayments,
  hours,
  prevYearData,
  auth,
  isSaved,
  sendMoneyToDataBase,
}) => {
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
  const [autoSaveInProgress, setAutoSaveStatus] = useState(false);
  const [isDebitModalOpened, setIsDebitModalOpened] = useState(false);
  const [debitModalInfo, setDebitModalInfo] = useState({
    account: null,
    property: null,
    amount: null,
  });

  const toggleDeleteFixedTransactionsModal = (selectedMonthId, path) => {
    setIsFixedTransactionsModalOpened(!isDeleteFixedTransactionModalOpened);
    setFixedTransactionsDeleteModalInfo({ selectedMonthId, path });
  };

  useEffect(() => {
    let actualPayments = getPayments(hours, prevYearData);
    actualizeMoneyWithActualPayments(actualPayments);
  }, []);

  const toggleExpensesModal = (id, type, action) => {
    setIsExpensesModalOpened(!isExpensesModalOpened);
    setModalInfo({ id, type, action });
  };

  const toggleDebitModal = ([account, property], amount) => {
    setDebitModalInfo({ account, property, amount });
    setIsDebitModalOpened(!isDebitModalOpened);
  };

  const expensesModalContext = {
    toggleExpensesModal,
    toggleDeleteFixedTransactionsModal,
    toggleDebitModal,
  };

  const autoSave = (isSaved, auth, callback) => {
    const { uid } = auth;

    const check = () => {
      if (!isSaved) {
        callback(uid);
      }

      setAutoSaveStatus(false);
    };

    if (!isSaved && !autoSaveInProgress) {
      setAutoSaveStatus(!autoSaveInProgress);
      setTimeout(check, 1500);
    }
  };
  useEffect(() => {
    autoSave(isSaved, auth, sendMoneyToDataBase);
  });

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
        <DebitModal isDebitModalOpened={isDebitModalOpened} modalInfo={debitModalInfo} />
      </ExpensesModalContext.Provider>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ hours, prevYearData, firebase, money }) => {
  return {
    hours,
    prevYearData,
    auth: firebase.auth,
    isSaved: money.isSaved,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actualizeMoneyWithActualPayments: (newPayments) =>
      dispatch(actualizeMoneyWithActualPaymentsAction(newPayments)),
    sendMoneyToDataBase: (uid) => dispatch(sendMoneyToDataBaseAction(uid)),
  };
};

MoneyMonth.propTypes = {
  prevYearData: PropTypes.object.isRequired,
  hours: PropTypes.object.isRequired,
  actualizeMoneyWithActualPayments: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  isSaved: PropTypes.bool.isRequired,
  sendMoneyToDataBase: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoneyMonth);
