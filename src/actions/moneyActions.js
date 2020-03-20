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
      for (let i = selectedMonthId; i < 12; i++) {
        let targetSection = months[i][type[0]][type[1]];
        let targetMonth = months[i];
        let targetAccount = targetMonth[type[0]];
        sumSection(targetSection);
        actualizeComputedDataSums(targetMonth, targetAccount, type[0]);
      }
    } else if (action === chargeWalletAccount) {
      const computed = editTransaction(transaction, data);
      chargeWallet(computed, month);
      for (let i = selectedMonthId; i < 12; i++) {
        let targetSection = months[i][type[0]][type[1]];
        let targetMonth = months[i];
        let targetAccount = targetMonth[type[0]];
        sumSection(targetSection);
        actualizeComputedDataSums(targetMonth, targetAccount, type[0]);
      }
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
    const month = months[selectedMonthId];
    deleteFixedTransaction(months, selectedMonthId, type, id);

    for (let i = selectedMonthId; i < 12; i++) {
      let targetSection = months[i][type[0]][type[1]];
      let targetMonth = months[i];
      let targetAccount = targetMonth[type[0]];
      sumSection(targetSection);
      actualizeComputedDataSums(targetMonth, targetAccount, type[0]);
    }
    //const payments = getPayments(hours, prevYearData);
    //ActualizeMonthsTotal(months, payments, type[0], prevYearData);

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
