import {
  sumSection,
  actualizeComputedDataSums,
  ActualizeMonthsTotal,
  addTransaction,
  editTransaction,
  addFixedTransaction,
  deleteTransaction,
  deleteFixedTransaction,
  chargeAccount,
  getIncome,
  calculateComputed,
  checkType,
  actualizePredictedDebit,
  createInterestData,
  makeCorrect,
  actualizeFixedTransactions,
  changeDebitSettings,
  accountActions,
} from '../tools/moneyTools';

const {
  add,
  edit,
  addFixed,
  chargeWalletAccount,
  payTheCard,
  chargeSavingAccount,
} = accountActions;

export const calculateTransactions = (data, path, action) => {
  return (dispatch, getState) => {
    const { money, hours, prevYearData } = getState();
    const newMoney = Object.assign({}, money);
    const { selectedMonthId, type, id } = path;
    const months = newMoney.months;
    const month = months[selectedMonthId];
    const account = month[type[0]];
    const section = account[type[1]];
    let transaction;

    action === add && addTransaction(section, data);
    transaction = section.transactions && id !== null ? section.transactions[id] : null;
    action === edit && editTransaction(transaction, data);
    action === addFixed && addFixedTransaction(months, path, data);
    if (action === addFixed) {
      calculateComputed(months, selectedMonthId, type);
    } else if (action === chargeWalletAccount) {
      const computed = editTransaction(transaction, data);
      chargeAccount(computed, month, 'wallet');
      calculateComputed(months, selectedMonthId, type);

      const income = getIncome(money, 'wallet');
      ActualizeMonthsTotal(months, income, 'wallet', prevYearData);
    } else if (action === chargeSavingAccount) {
      const computed = editTransaction(transaction, data);
      chargeAccount(computed, month, 'savingAccount');
      calculateComputed(months, selectedMonthId, type);

      const income = getIncome(money, 'savingAccount');
      ActualizeMonthsTotal(months, income, 'savingAccount', prevYearData);
    } else if (action === payTheCard) {
      const computed = editTransaction(transaction, data);
      chargeAccount(computed, month, 'debitCard');
      calculateComputed(months, selectedMonthId, type);
      const income = getIncome(money, 'debitCard');
      ActualizeMonthsTotal(months, income, 'debitCard', prevYearData);
    } else {
      sumSection(section);
      actualizeComputedDataSums(month, account, type[0]);
    }
    if (type[0] === 'debitCard') {
      actualizePredictedDebit(prevYearData, months, selectedMonthId);
      calculateComputed(months, selectedMonthId, ['mainAccount', 'accounts']);
    }

    checkType(type, hours, newMoney, prevYearData, months);

    dispatch({ type: 'CALCULATE_TRANSACTIONS', payload: newMoney });
  };
};

export const actualizeMoneyWithActualPayments = (newPayments) => {
  return (dispatch, getState) => {
    const { money, prevYearData } = getState();
    const months = money.months;
    ActualizeMonthsTotal(months, newPayments, 'mainAccount', prevYearData);
    dispatch({ type: 'CALCULATE_TRANSACTIONS', payload: money });
  };
};
export const reCalculateMoney = () => {
  return (dispatch, getState) => {
    const { money, prevYearData, hours } = getState();
    const newMoney = Object.assign({}, money);
    actualizeFixedTransactions(prevYearData, newMoney);
    const months = newMoney.months;
    const accountsList = months[0].accountsList;
    accountsList.forEach((accountType) => {
      checkType([accountType, null], hours, newMoney, prevYearData, months, true);
    });
    dispatch({ type: 'RECALCULATE_MONEY', payload: newMoney });
  };
};

export const deleteFixedTransactions = (id, modalInfo) => {
  return (dispatch, getState) => {
    const { money, hours, prevYearData } = getState();
    const newMoney = Object.assign({}, money);
    const { selectedMonthId, path: type } = modalInfo;

    const months = newMoney.months;
    if (type[1] === 'fixedExpenses') deleteFixedTransaction(months, selectedMonthId, type, id);
    if (type[1] === 'transactions') {
      const section = months[selectedMonthId][type[0]][type[1]].transactions;
      deleteTransaction(section, id);
    }

    calculateComputed(months, selectedMonthId, type);
    if (type[0] === 'debitCard') {
      actualizePredictedDebit(prevYearData, months, selectedMonthId);
      calculateComputed(months, selectedMonthId, ['mainAccount', 'accounts']);
    }

    checkType(type, hours, newMoney, prevYearData, months);

    dispatch({ type: 'CALCULATE_TRANSACTIONS', payload: newMoney });
  };
};

export const closePeriod = (selectedMonthId, path) => {
  return (dispatch, getState) => {
    const { money, hours, prevYearData } = getState();
    const newMoney = Object.assign({}, money);
    const months = newMoney.months;
    const month = months[selectedMonthId];
    const account = month['debitCard'];
    const section = account['transactions'];
    const type = path;
    let interest;

    months[selectedMonthId][type[0]].isClosed = true;
    if (selectedMonthId === 11) months[selectedMonthId].computedData.debitCard.isClosed = true;
    makeCorrect(month, section);
    calculateComputed(months, selectedMonthId, ['debitCard', 'transactions']);
    actualizePredictedDebit(prevYearData, months, selectedMonthId);
    interest = createInterestData(month);
    addTransaction(section, interest);
    calculateComputed(months, selectedMonthId, ['debitCard', 'transactions']);
    actualizePredictedDebit(prevYearData, months, selectedMonthId);
    calculateComputed(months, selectedMonthId, ['mainAccount', 'accounts']);

    checkType(type, hours, newMoney, prevYearData, months);
    checkType(['mainAccount'], hours, newMoney, prevYearData, months);

    dispatch({ type: 'CALCULATE_TRANSACTIONS', payload: newMoney });
  };
};

export const setNewDebitSettings = (data) => {
  return (dispatch, getState) => {
    const { money } = getState();
    const newMoney = Object.assign({}, money);
    changeDebitSettings(newMoney, data);
    dispatch({ type: 'SET_NEW_DEBITS', payload: newMoney });
  };
};

export const canNotReCalculate = () => {
  return {
    type: 'CANT_RECALCULATE',
  };
};

export const debitCardErrOccurred = () => {
  return {
    type: 'TOO_BIG_AMOUNT_OF_DEBIT_ON_CARD',
  };
};
