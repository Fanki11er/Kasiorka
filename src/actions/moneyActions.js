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
  accountActions,
} from '../tools/moneyTools';

const { add, edit, addFixed, chargeWalletAccount } = accountActions;

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
      chargeWallet(computed, month);
      calculateComputed(months, selectedMonthId, type);

      const income = getIncome(money, 'wallet');
      ActualizeMonthsTotal(months, income, 'wallet', prevYearData);
    } else {
      sumSection(section);
      actualizeComputedDataSums(month, account, type[0]);
    }

    if (type[0] !== 'wallet') {
      const payments = getPayments(hours, prevYearData);
      ActualizeMonthsTotal(months, payments, type[0], prevYearData);
    } else {
      const income = getIncome(money, type[0]);
      ActualizeMonthsTotal(months, income, type[0], prevYearData);
    }

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

    //const payments = getPayments(hours, prevYearData);
    //ActualizeMonthsTotal(months, payments, type[0], prevYearData);
    //!To function
    if (type[0] !== 'wallet') {
      const payments = getPayments(hours, prevYearData);
      ActualizeMonthsTotal(months, payments, type[0], prevYearData);
    } else {
      const income = getIncome(money, type[0]);
      ActualizeMonthsTotal(months, income, type[0], prevYearData);
    }

    dispatch({ type: 'CALCULATE_TRANSACTIONS', payload: newMoney });
  };
};
