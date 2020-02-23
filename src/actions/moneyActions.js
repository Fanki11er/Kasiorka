import {
  sumSection,
  actualizeComputedDataSums,
  getPayments,
  ActualizeMonthsTotal,
  addTransaction,
  editTransaction,
} from '../tools/moneyTools';

export const calculateTransactions = (data, path, action) => {
  return (dispatch, getState) => {
    const { money, hours, prevYearData } = getState();
    const { selectedMonthId, type, id } = path;
    const months = money.months;
    const month = months[selectedMonthId];
    const account = month[type[0]];
    const section = account[type[1]];
    const transaction = section.transactions[id];

    action === 'add' && addTransaction(section, data);
    action === 'edit' && editTransaction(transaction, data);
    sumSection(section);
    actualizeComputedDataSums(month, account, type[0]);
    const payments = getPayments(hours, prevYearData);
    ActualizeMonthsTotal(months, payments, type[0], prevYearData);

    dispatch({ type: 'CALCULATE_TRANSACTIONS', payload: money });
  };
};

export const reCalculateTransactions = type => {
  return (dispatch, getState) => {
    const { money, hours, prevYearData } = getState();
    const months = money.months;
    const payments = getPayments(hours, prevYearData);

    ActualizeMonthsTotal(months, payments, type[0], prevYearData);
    dispatch({ type: 'CALCULATE_TRANSACTIONS', payload: money });
  };
};
