import { addCardSettings } from './updatingTools';

export const moneyVersion = 0.7;
class Expense {
  constructor({ name, predicted, real = 0, action = '-', signature = 'standard', id = false }) {
    this.name = name;
    this.predicted = action === '-' ? -predicted : predicted;
    this.real = action === '-' ? -real : real;
    this.percentage = Math.abs(this.countPercentage());
    this.action = action;
    this.expenseId = id ? id : new Date().getTime().toString();
    this.created = new Date().toLocaleDateString();
    this.signature = signature;
  }
  countPercentage() {
    return this.predicted ? ((this.real / this.predicted) * 100).toFixed() : this.real;
  }
}

class DebitExpense extends Expense {}

class FixedExpenses {
  constructor(name, path) {
    this.name = name;
    this.transactions = [];
    this.path = path;
    this.realSum = 0;
    this.predictedSum = 0;
  }
}

class Transactions {
  constructor(name, path) {
    this.transactions = [];
    this.path = path;
    this.name = name;
    this.realSum = 0;
    this.predictedSum = 0;
  }
}

class OtherAccounts extends Transactions {
  constructor(name, path) {
    super(name, path);
    this.transactions = [
      new Expense({ name: 'Zasil portfel', predicted: 0, signature: 'wallet' }),
      new DebitExpense({ name: 'Spłać kartę', predicted: 0, signature: 'debit' }),
      new Expense({ name: 'Oszczędź', predicted: 0, signature: 'saving' }),
    ];
    this.path = path;
    this.name = name;
    this.realSum = 0;
    this.predictedSum = 0;
  }
}

class Account {
  constructor(title, type, sections = []) {
    this.title = title;
    this.sections = [];
    this.type = type;
    sections && this.addSections(sections);
  }
  addSections(sections) {
    sections.forEach(({ name, classType, path }) => {
      this.addSection(name, classType, path);
    });
  }

  addSection(name, classType, path) {
    this[path] = new classType(name, [this.type, path]);
    this.sections.push(path);
  }
}

class MainAccount extends Account {
  constructor(title, type, sections) {
    super(title, type, sections);
    this.debit = 1900;
  }
}

class Wallet extends Account {
  constructor(title, type, sections) {
    super(title, type, sections);
    this.reCharge = {
      accountReal: 0,
      accountPredicted: 0,
    };
  }
}

class DebitCard extends Wallet {
  constructor(title, type, sections) {
    super(title, type, sections);
    this.interests = {
      realInterest: 0,
      predictedInterest: 0,
    };
    this.isClosed = false;
    this.cardSettings = {
      debit: 5000,
      interestRate: 0.13,
    };
  }
}
const mainAccountSections = [
  {
    path: 'fixedExpenses',
    classType: FixedExpenses,
    name: 'Wydatki stałe',
  },
  {
    path: 'transactions',
    classType: Transactions,
    name: 'Transakcje',
  },
  {
    path: 'accounts',
    classType: OtherAccounts,
    name: 'Konta',
  },
];

const walletSections = [
  {
    path: 'fixedExpenses',
    classType: FixedExpenses,
    name: 'Wydatki stałe',
  },
  {
    path: 'transactions',
    classType: Transactions,
    name: 'Transakcje',
  },
];

const debitCardSections = [
  {
    path: 'fixedExpenses',
    classType: FixedExpenses,
    name: 'Wydatki stałe',
  },
  {
    path: 'transactions',
    classType: Transactions,
    name: 'Transakcje',
  },
];

const savingAccountSections = [
  {
    path: 'transactions',
    classType: Transactions,
    name: 'Transakcje',
  },
];

const accountActions = {
  edit: 'edit',
  add: 'add',
  addFixed: 'addFixed',
  chargeWalletAccount: 'chargeWallet',
  payTheCard: 'payTheCard',
  chargeSavingAccount: 'chargeSavingAccount',
};
class MoneyMonth {
  constructor(id) {
    this.id = id;
    this.accountsList = [];
    this.createAccount(MainAccount, 'Konto główne', 'mainAccount', mainAccountSections);
    this.createAccount(Wallet, 'Portfel', 'wallet', walletSections);
    this.createAccount(DebitCard, 'Karta debetowa', 'debitCard', debitCardSections);
    this.createAccount(Wallet, 'Konto oszczędnościowe', 'savingAccount', savingAccountSections);
    this.computedData = this.createComputedData(this.accountsList, id);
  }

  createAccount(classType, title, type, sections) {
    this[type] = new classType(title, type, sections);
    this.accountsList.push(type);
  }

  createComputedData(accountsList, id) {
    const data = {};
    accountsList.forEach((account) => {
      switch (id) {
        case 1: {
          data[account] = new FirstDataObject();
          break;
        }
        case 12: {
          data[account] = new LastDataObject();
          break;
        }
        default: {
          data[account] = new RegularDataObject();
        }
      }
    });
    return data;
  }
}

class RegularDataObject {
  constructor() {
    this.realSum = 0;
    this.predictedSum = 0;
    this.monthTotal = 0;
    this.monthTotalPredicted = 0;
  }
}

class FirstDataObject extends RegularDataObject {
  constructor() {
    super();
    this.doneUpdates = [];
  }
}

class LastDataObject extends RegularDataObject {
  constructor() {
    super();
    this.fixedExpensesRegistry = [];
    this.isClosed = false;
  }
}

class Money {
  constructor() {
    this.months = this.createMoneyMonths();
    this.isSaved = true;
  }

  createMoneyMonths() {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(new MoneyMonth(i));
    }
    return months;
  }
}

const fixNumber = (number, position) => {
  if (typeof number !== 'number') {
    const newNumber = Number(number);
    return Number(newNumber.toFixed(position));
  } else return Number(number.toFixed(position));
};

const countPercentage = (predicted = 0, real) =>
  predicted !== 0 ? parseInt((real / predicted) * 100) : real;

const editTransaction = (transaction, { real, predicted, action }) => {
  transaction.real = fixNumber(
    action === '-' ? transaction.real - real : transaction.real + real,
    2,
  );
  transaction.predicted = fixNumber(
    action === '-' ? transaction.predicted - predicted : transaction.transaction + predicted,
    2,
  );
  transaction.percentage = countPercentage(transaction.predicted, transaction.real);
  return {
    real: fixNumber(transaction.real, 2),
    predicted: fixNumber(transaction.predicted, 2),
  };
};

const sumSections = (account, property) => {
  const { sections } = account;
  return sections.reduce((total, section) => (total += account[section][property]), 0);
};

const addTransaction = (section, data) => {
  const expense = new Expense(data);
  section['transactions']
    ? section['transactions'].unshift(expense)
    : (section['transactions'] = new Array(expense));
};

const addFixedTransaction = (months, path, data) => {
  let section;
  let account;
  const id = new Date().getTime().toString();
  const { type, selectedMonthId } = path;
  data.id = id;

  for (let i = selectedMonthId; i < 12; i++) {
    section = months[i][type[0]][type[1]];
    addTransaction(section, data);
    data.real = 0;
    if (i === 11) {
      account = months[i].computedData[type[0]];
      if (!account.fixedExpensesRegistry) account.fixedExpensesRegistry = [];
      account.fixedExpensesRegistry.unshift({
        action: 'addFixed',
        actionId: new Date().getTime().toString(),
        data,
        type,
        id,
      });
    }
  }
};

const deleteTransaction = (section, id) => {
  let indexOfExpense;
  section &&
    section.forEach(({ expenseId }, index) => {
      if (expenseId === id) indexOfExpense = index;
    });
  section && section.splice(indexOfExpense, 1);
};

const deleteFixedTransaction = (months, selectedMonthId, type, id) => {
  let section;
  let account;
  for (let i = selectedMonthId; i < 12; i++) {
    section = months[i][type[0]][type[1]].transactions;
    deleteTransaction(section, id);

    if (i === 11) {
      account = months[i].computedData[type[0]];
      if (!account.fixedExpensesRegistry) account.fixedExpensesRegistry = [];
      account.fixedExpensesRegistry.unshift({
        action: 'deleteFixed',
        actionId: new Date().getTime().toString(),
        id,
        type,
      });
    }
  }
};
const sumSection = (section) => {
  const { transactions } = section;

  section.realSum =
    (transactions &&
      transactions.reduce((sum, { real }) => {
        sum = fixNumber(sum + real, 2);
        return sum;
      }, 0)) ||
    0;

  section.predictedSum =
    (transactions &&
      transactions.reduce((sum, { predicted }) => {
        sum = fixNumber(sum + predicted, 2);
        return sum;
      }, 0)) ||
    0;
};

const actualizeComputedDataSums = (month, account, type) => {
  let { computedData } = month;
  computedData[type].realSum = sumSections(account, 'realSum');
  computedData[type].predictedSum = sumSections(account, 'predictedSum');
};

const choseValue = (valueReceived, valueExpected) => {
  if (!valueExpected && !valueReceived) return 0;

  return Math.abs(valueReceived) > 0 ? valueReceived : valueExpected;
};

const getPayments = (hours, prevYearData) => {
  const months = hours.months;
  const { prevPayments } = prevYearData;
  const paymentsTable = [];
  paymentsTable.push(choseValue(prevPayments.paymentReceived, prevPayments.expectedPayout));
  months.forEach(({ payments }) =>
    paymentsTable.push(choseValue(payments.paymentReceived, payments.expectedPayout)),
  );
  return paymentsTable;
};

const chargeAccount = (computed, month, account) => {
  const reCharge = month[account].reCharge;
  const { real, predicted } = computed;
  reCharge.accountReal = real;
  reCharge.accountPredicted = predicted;
};

const getIncome = (money, accountType) => {
  const months = money.months;
  const incomesTable = [];
  months.forEach((month) => {
    const charge = month[accountType].reCharge;
    incomesTable.push(-choseValue(charge.accountReal, charge.accountPredicted));
  });
  return incomesTable;
};

const ActualizeMonthsTotal = (months, payments, type, prevYearData) => {
  const { prevMoney } = prevYearData;
  let monthTotal;
  let monthTotalPredicted;

  monthTotal = prevMoney[type] ? prevMoney[type].monthTotal : 0;
  monthTotalPredicted = prevMoney[type] ? prevMoney[type].monthTotalPredicted : 0;
  months.forEach((month, index, months) => {
    if (index === 0) {
      month.computedData[type].monthTotal = fixNumber(
        month.computedData[type].realSum + payments[index] + monthTotal,
        2,
      );
      month.computedData[type].monthTotalPredicted = fixNumber(
        month.computedData[type].predictedSum + payments[index] + monthTotalPredicted,
        2,
      );
    } else {
      month.computedData[type].monthTotal = fixNumber(
        month.computedData[type].realSum +
          payments[index] +
          months[index - 1].computedData[type].monthTotal,
        2,
      );

      month.computedData[type].monthTotalPredicted = fixNumber(
        month.computedData[type].predictedSum +
          payments[index] +
          months[index - 1].computedData[type].monthTotalPredicted,
        2,
      );
    }
  });
};
const calculateComputed = (months, selectedMonthId, type) => {
  for (let i = selectedMonthId; i < 12; i++) {
    let targetSection = months[i][type[0]][type[1]];
    let targetMonth = months[i];
    let targetAccount = targetMonth[type[0]];
    sumSection(targetSection);
    actualizeComputedDataSums(targetMonth, targetAccount, type[0]);
  }
};

const comparePayments = (hours, prevYearData, money, action) => {
  const actualPayments = getPayments(hours, prevYearData);
  const prevPayments = money.payments;
  actualPayments.toString() !== prevPayments.toString() && action(actualPayments);
};

const createStats = (month, { payment }, accountName) => {
  const sections = month[accountName].sections;
  const account = month[accountName];
  const stats = {
    incomes: payment,
    expenses: 0,
  };
  sections.forEach((section) => {
    stats.expenses +=
      (account[section].transactions &&
        account[section].transactions.length &&
        account[section].transactions.reduce((total, { action, real }) => {
          action === '-' && (total += real);
          return total;
        }, 0)) ||
      0;
    stats.incomes +=
      (account[section].transactions &&
        account[section].transactions.length &&
        account[section].transactions.reduce((total, { action, real }) => {
          action === '+' && (total += real);
          return total;
        }, 0)) ||
      0;
  });
  return stats;
};

const calculateExpensesPercent = (stats) => {
  let { incomes, expenses } = stats;

  return fixNumber(Math.abs(expenses / incomes) * 100, 2);
};

const checkType = (type, hours, money, prevYearData, months, reCalc = false) => {
  switch (type[0]) {
    case 'wallet': {
      const income = getIncome(money, type[0]);
      reCalc && calculateComputed(months, 0, ['wallet', 'fixedExpenses']);
      ActualizeMonthsTotal(months, income, type[0], prevYearData);
      break;
    }

    case 'debitCard': {
      const income = getIncome(money, type[0]);

      reCalc && calculateComputed(months, 0, ['debitCard', 'fixedExpenses']);

      actualizePredictedDebit(prevYearData, months, 0);
      calculateComputed(months, 0, ['mainAccount', 'accounts']);
      const payments = getPayments(hours, prevYearData);

      ActualizeMonthsTotal(months, income, type[0], prevYearData);
      ActualizeMonthsTotal(months, payments, 'mainAccount', prevYearData);

      break;
    }
    case 'savingAccount': {
      const income = getIncome(money, type[0]);
      ActualizeMonthsTotal(months, income, type[0], prevYearData);
      break;
    }
    default: {
      const payments = getPayments(hours, prevYearData);
      reCalc && calculateComputed(months, 0, ['mainAccount', 'fixedExpenses']);
      reCalc && calculateComputed(months, 0, ['mainAccount', 'accounts']);
      ActualizeMonthsTotal(months, payments, type[0], prevYearData);

      break;
    }
  }
};

const createExtendedComputedStatus = (computedStatus, cardSettings) => {
  const status = Object.assign({}, computedStatus);
  const { debit } = cardSettings;
  status.monthTotal = fixNumber(status.monthTotal + debit, 2);
  status.monthTotalPredicted = fixNumber(status.monthTotalPredicted + debit, 2);

  return status;
};

const computeDebit = (month) => {
  const isClosed = month.debitCard.isClosed;
  if (!isClosed) {
    return month.computedData.debitCard.predictedSum;
  } else return month.computedData.debitCard.realSum;
};

const computePrevDebit = (prevMoney) => {
  const isClosed = prevMoney.debitCard.isClosed;
  if (!isClosed) return prevMoney.debitCard.predictedSum;
  else return prevMoney.debitCard.realSum;
};

const actualizeInterests = (month) => {
  const interestRate = month.debitCard.cardSettings.interestRate / 100;
  const predictedInterest = month.computedData.debitCard.predictedSum * interestRate;
  month.debitCard.interests.predictedInterest = Number(predictedInterest.toFixed(2));
};

const getPredictedDebits = (prevYearData, months) => {
  const debits = [];

  let computedDebit;
  let prevDebitCard;
  const { prevMoney } = prevYearData;
  prevDebitCard = prevMoney.debitCard ? computePrevDebit(prevMoney) : 0;
  debits.push(prevDebitCard);
  for (let i = 0; i < 12; i++) {
    actualizeInterests(months[i]);
    if (i < 11) computedDebit = computeDebit(months[i]);
    debits.push(computedDebit);
  }
  return debits;
};

const actualizePredictedDebit = (prevYearData, months, selectedMonthId) => {
  let accounts;
  let predictedDebits = getPredictedDebits(prevYearData, months);
  for (let i = selectedMonthId; i < 12; i++) {
    accounts = months[i].mainAccount.accounts.transactions;

    accounts.forEach((transaction) => {
      if (transaction.signature === 'debit') {
        transaction.predicted = predictedDebits[i];
      }
    });
  }
};

const choseInterest = (isPeriodClosed, interests) => {
  const { realInterest, predictedInterest } = interests;
  return isPeriodClosed ? realInterest : predictedInterest;
};

const createInterestData = (month) => {
  const realInterest = month.debitCard.interests.predictedInterest;
  month.debitCard.interests.realInterest = realInterest;
  return {
    real: -realInterest,
    predicted: -realInterest,
    action: '-',
    name: 'Odsetki',
  };
};
const makeCorrect = (month, section) => {
  const real = month.computedData.debitCard.realSum;
  const predicted = month.computedData.debitCard.predictedSum;
  const correct = {
    real: 0,
    predicted: 0,
    action: '-',
    name: 'Korekta',
  };
  if (real > predicted) {
    const difference = predicted - real;
    correct.predicted = -difference;
    correct.action = '+';
    addTransaction(section, correct);
  } else if (real < predicted) {
    const difference = real - predicted;
    correct.predicted = -difference;
    correct.action = '-';
    addTransaction(section, correct);
  }
};

const getRegistryLength = (account) => {
  const { fixedExpensesRegistry } = account;
  return fixedExpensesRegistry ? fixedExpensesRegistry.length : 0;
};

const getDoneRegistryLength = (month, accountName) => {
  const { computedData } = month;
  const account = computedData[accountName];
  return account.doneUpdates ? account.doneUpdates.length : 0;
};

const checkFixedExpensesRegistry = (prevYearData, money) => {
  const { prevMoney } = prevYearData;
  const { months } = money;
  const month = months[0];
  let differences = [];
  const prevMoneyArray = Object.entries(prevMoney);
  prevMoneyArray.forEach(([accountName, accountValue]) => {
    let registryLength = getRegistryLength(accountValue);
    let doneRegistryLength = getDoneRegistryLength(month, accountName);
    if (registryLength && doneRegistryLength !== registryLength) {
      differences.push(accountName);
    }
  });
  return differences;
};

const getUndoneFixedTransactions = (account, computedData) => {
  if (computedData.doneUpdates) {
    const done = computedData.doneUpdates;
    const transactions = account.filter((transaction) => {
      let transactionId = transaction.actionId;
      return !done.includes(transactionId);
    });
    return transactions;
  } else {
    return account;
  }
};

const updateDoneList = (months, path, actionId) => {
  const { type, selectedMonthId } = path;
  const { computedData } = months[selectedMonthId];
  const account = computedData[type[0]];
  if (!account.doneUpdates) account.doneUpdates = [];
  account.doneUpdates.push(actionId);
};

const makeFixedTransactionsList = (changesInFixedTransactions, prevYearData, money) => {
  let transactions = [];
  const { prevMoney } = prevYearData;
  const { months } = money;
  const data = months[0].computedData;
  changesInFixedTransactions.forEach((accountName) => {
    let account = prevMoney[accountName].fixedExpensesRegistry;
    let computedData = data[accountName];
    transactions.push(getUndoneFixedTransactions(account, computedData));
  });
  return transactions.flat(1);
};
const actualizeFixedTransactions = (prevYearData, money) => {
  const changesInFixedTransactions = checkFixedExpensesRegistry(prevYearData, money);
  const { months } = money;
  let fixedTransactionsList;
  let path;
  let adds = [];
  let deletes = [];
  if (changesInFixedTransactions.length) {
    fixedTransactionsList = makeFixedTransactionsList(
      changesInFixedTransactions,
      prevYearData,
      money,
    );
    adds = fixedTransactionsList.filter((transaction) => {
      return transaction.action === 'addFixed';
    });

    deletes = fixedTransactionsList.filter((transaction) => {
      return transaction.action === 'deleteFixed';
    });
    adds.forEach((transaction) => {
      let { type, data, actionId } = transaction;
      path = { type, selectedMonthId: 0 };
      addFixedTransaction(months, path, data);
      updateDoneList(months, path, actionId);
    });

    deletes.forEach((transaction) => {
      let { type, actionId, id } = transaction;
      path = { type, selectedMonthId: 0 };
      deleteFixedTransaction(months, 0, type, id);
      updateDoneList(months, path, actionId);
    });
  }
};

const checkIsPrevPeriodClosed = (prevMoney, selectedMonthId, months) => {
  let isClosed;
  if (selectedMonthId === 0) {
    isClosed = prevMoney.debitCard ? prevMoney.debitCard.isClosed : true;
  } else {
    isClosed = months[selectedMonthId - 1].debitCard.isClosed;
  }
  return isClosed;
};

const correctionFunction = (real, predicted) => {
  let difference = real - predicted;
  return difference;
};

const changeDebitSettings = (newMoney, data) => {
  const { account, property, newValue, selectedMonthId } = data;
  let selectedAccount;
  for (let i = selectedMonthId; i < 12; i++) {
    selectedAccount = newMoney.months[i][account];
    selectedAccount.cardSettings[property] = newValue;
  }
};

export const moneyUpdatesArray = [addCardSettings];

export {
  Expense,
  FixedExpenses,
  Money,
  editTransaction,
  Account,
  MainAccount,
  sumSection,
  sumSections,
  actualizeComputedDataSums,
  getPayments,
  ActualizeMonthsTotal,
  addTransaction,
  comparePayments,
  createStats,
  calculateExpensesPercent,
  addFixedTransaction,
  deleteFixedTransaction,
  chargeAccount,
  getIncome,
  calculateComputed,
  checkType,
  createExtendedComputedStatus,
  actualizePredictedDebit,
  choseInterest,
  createInterestData,
  makeCorrect,
  fixNumber,
  actualizeFixedTransactions,
  checkIsPrevPeriodClosed,
  correctionFunction,
  changeDebitSettings,
  accountActions,
};
