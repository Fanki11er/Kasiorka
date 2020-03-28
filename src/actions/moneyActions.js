import {
  sumSection,
  actualizeComputedDataSums,
  ActualizeMonthsTotal,
  addTransaction,
  editTransaction,
  getPayments,
  addFixedTransaction,
  deleteFixedTransaction,
  chargeWallet,
  getIncome,
  calculateComputed,
  checkType,
  actualizePredictedDebit,
  createInterestData,
  makeCorrect,
  accountActions,
} from '../tools/moneyTools';

const { add, edit, addFixed, chargeWalletAccount, payTheCard } = accountActions;

export const calculateTransactions = (data, path, action) => {
  return (dispatch, getState) => {
    const { money, hours, prevYearData } = getState();
    const newMoney = Object.assign({}, money);
    const { selectedMonthId, type, id } = path;
    const months = newMoney.months;
    const month = months[selectedMonthId];
    const account = month[type[0]];
    const section = account[type[1]];
    const transaction = section.transactions[id];

    action === add && addTransaction(section, data);
    action === edit && editTransaction(transaction, data);
    action === addFixed && addFixedTransaction(months, type, data, selectedMonthId);
    if (action === addFixed) {
      calculateComputed(months, selectedMonthId, type);
    } else if (action === chargeWalletAccount) {
      const computed = editTransaction(transaction, data);
      chargeWallet(computed, month, 'wallet');
      calculateComputed(months, selectedMonthId, type);

      const income = getIncome(money, 'wallet');
      ActualizeMonthsTotal(months, income, 'wallet', prevYearData);
    } else if (action === payTheCard) {
      const computed = editTransaction(transaction, data);
      chargeWallet(computed, month, 'debitCard');
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

export const actualizeMoneyWithActualPayments = newPayments => {
  return (dispatch, getState) => {
    const { money, prevYearData } = getState();
    const months = money.months;
    ActualizeMonthsTotal(months, newPayments, 'mainAccount', prevYearData);

    dispatch({ type: 'CALCULATE_TRANSACTIONS', payload: money });
  };
};

export const deleteFixedTransactions = (id, modalInfo) => {
  return (dispatch, getState) => {
    const { money, hours, prevYearData } = getState();
    const newMoney = Object.assign({}, money);
    const { selectedMonthId, path: type } = modalInfo;
    const months = newMoney.months;
    deleteFixedTransaction(months, selectedMonthId, type, id);

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
    const interest = createInterestData(month);

    months[selectedMonthId][type[0]].isClosed = true;
    makeCorrect(month, section);
    addTransaction(section, interest);
    calculateComputed(months, selectedMonthId, ['debitCard', 'transactions']);
    actualizePredictedDebit(prevYearData, months, selectedMonthId);
    calculateComputed(months, selectedMonthId, ['mainAccount', 'accounts']);

    checkType(type, hours, newMoney, prevYearData, months);
    checkType(['mainAccount'], hours, newMoney, prevYearData, months);

    dispatch({ type: 'CALCULATE_TRANSACTIONS', payload: newMoney });
  };
};
