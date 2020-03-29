class Expense {
  constructor({ name, predicted, real = 0, action = '-', signature = 'standard' }) {
    this.name = name;
    this.predicted = action === '-' ? -predicted : predicted;
    this.real = action === '-' ? -real : real;
    this.percentage = Math.abs(this.countPercentage());
    this.action = action;
    this.expenseId = new Date().getTime().toString();
    this.created = new Date().toLocaleDateString();
    this.signature = signature;
  }
  countPercentage() {
    return this.predicted ? ((this.real / this.predicted) * 100).toFixed() : this.real;
  }
}

class DebitExpense extends Expense {
  /*constructor({ name, predicted, real = 0, action = '-' }) {
    super({ name, predicted, real, action });
    this.signature = 'debit';
  }*/
}

class FixedExpenses {
  constructor(name, path /*transactionsList = []*/) {
    this.name = name;
    this.transactions = [];
    this.path = path;
    //this.transactionsList = transactionsList;
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
      new Expense({ name: 'Zasil portfel:', predicted: 0, signature: 'wallet' }),
      new DebitExpense({ name: 'Spłać kartę:', predicted: 0, signature: 'debit' }),
    ];
    this.path = path;
    this.name = name;
    this.realSum = 0;
    this.predictedSum = 0;
  }
}

class Account {
  constructor(title, type, sections = []) {
    /* if (new.target === Account) {
      throw new Error('Account is an abstract class');
    }*/
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

const accountActions = {
  edit: 'edit',
  add: 'add',
  addFixed: 'addFixed',
  chargeWalletAccount: 'chargeWallet',
  payTheCard: 'payTheCard',
};
class MoneyMonth {
  constructor(id) {
    this.id = id;
    this.accountsList = [];
    this.createAccount(Account, 'Konto główne', 'mainAccount', mainAccountSections);
    this.createAccount(Wallet, 'Portfel', 'wallet', walletSections);
    this.createAccount(DebitCard, 'Karta debetowa', 'debitCard', debitCardSections);
    this.computedData = this.createComputedData(this.accountsList);
  }

  createAccount(classType, title, type, sections) {
    this[type] = new classType(title, type, sections);
    this.accountsList.push(type);
  }

  createComputedData(accountsList) {
    const data = {};
    accountsList.forEach(account => {
      data[account] = new DataObject();
    });
    return data;
  }
}

class DataObject {
  constructor() {
    this.realSum = 0;
    this.predictedSum = 0;
    this.monthTotal = 0;
    this.monthTotalPredicted = 0;
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

const countPercentage = (predicted = 0, real) =>
  predicted !== 0 ? parseInt((real / predicted) * 100) : real;

const editTransaction = (transaction, { real, predicted, action }) => {
  transaction.real = action === '-' ? transaction.real - real : transaction.real + real;
  transaction.predicted =
    action === '-' ? transaction.predicted - predicted : transaction.transaction + predicted;
  transaction.percentage = countPercentage(transaction.predicted, transaction.real);
  return {
    real: transaction.real,
    predicted: transaction.predicted,
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

const addFixedTransaction = (months, type, data, selectedMonthId) => {
  let section;
  let account;

  for (let i = selectedMonthId; i < 12; i++) {
    section = months[i][type[0]][type[1]];
    addTransaction(section, data);
    data.real = 0;
    if (i === 11) {
      account = months[i][type[0]];
      if (!account.fixedExpensesRegistry) account.fixedExpensesRegistry = [];
      account.fixedExpensesRegistry.unshift({
        action: 'addFixed',
        data,
        type,
      });
    }
  }
};

const deleteTransaction = (section, id) => {
  let indexOfExpense;
  section.forEach(({ expenseId }, index) => {
    if (expenseId === id) indexOfExpense = index;
  });
  section.splice(indexOfExpense, 1);
};

const deleteFixedTransaction = (months, selectedMonthId, type, id) => {
  let section;
  let account;
  for (let i = selectedMonthId; i < 12; i++) {
    section = months[i][type[0]][type[1]].transactions;
    deleteTransaction(section, id);

    if (i === 11) {
      account = months[i][type[0]];
      if (!account.fixedExpensesRegistry) account.fixedExpensesRegistry = [];
      account.fixedExpensesRegistry.unshift({
        action: 'deleteFixed',
        id,
        type,
      });
    }
  }
};

const sumSection = section => {
  const { transactions } = section;
  section.realSum =
    transactions &&
    transactions.reduce((sum, { real }) => {
      sum += real;
      return sum;
    }, 0);

  section.predictedSum =
    transactions &&
    transactions.reduce((sum, { predicted }) => {
      sum += predicted;
      return sum;
    }, 0);
};

const actualizeComputedDataSums = (month, account, type) => {
  let { computedData } = month;
  computedData[type].realSum = sumSections(account, 'realSum');
  computedData[type].predictedSum = sumSections(account, 'predictedSum');
};

const choseValue = (valueReceived, valueExpected) => {
  if (!valueExpected && !valueReceived) return 0;

  return valueReceived > 0 ? valueReceived : valueExpected;
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

const chargeWallet = (computed, month, account) => {
  const reCharge = month[account].reCharge;
  const { real, predicted } = computed;
  reCharge.accountReal = real;
  reCharge.accountPredicted = predicted;
};

const getIncome = (money, accountType) => {
  const months = money.months;
  const incomesTable = [];
  months.forEach(month => {
    const charge = month[accountType].reCharge;
    incomesTable.push(-choseValue(charge.accountReal, charge.accountPredicted));
  });
  return incomesTable;
};

const fixNumber = (number, position) => {
  if (typeof number !== 'number') {
    const newNumber = Number(number);
    return Number(newNumber.toFixed(position));
  } else return Number(number.toFixed(position));
};

const ActualizeMonthsTotal = (months, payments, type, prevYearData) => {
  const { prevMoney } = prevYearData;
  months.forEach((month, index, months) => {
    if (index === 0) {
      month.computedData[type].monthTotal = fixNumber(
        month.computedData[type].realSum + payments[index] + prevMoney.monthTotal,
        2,
      );

      month.computedData[type].monthTotalPredicted = fixNumber(
        month.computedData[type].predictedSum + payments[index] + prevMoney.monthTotalPredicted,
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
  sections.forEach(section => {
    stats.expenses +=
      account[section].transactions.length &&
      account[section].transactions.reduce((total, { action, real }) => {
        action === '-' && (total += real);
        return total;
      }, 0);
    stats.incomes +=
      account[section].transactions.length &&
      account[section].transactions.reduce((total, { action, real }) => {
        action === '+' && (total += real);
        return total;
      }, 0);
  });

  return stats;
};

const calculateExpensesPercent = stats => {
  const { incomes, expenses } = stats;

  return Math.abs(expenses / incomes) * 100;
};

const checkType = (type, hours, money, prevYearData, months) => {
  switch (type[0]) {
    case 'wallet': {
      const income = getIncome(money, type[0]);
      ActualizeMonthsTotal(months, income, type[0], prevYearData);
      break;
    }

    case 'debitCard': {
      const income = getIncome(money, type[0]);
      ActualizeMonthsTotal(months, income, type[0], prevYearData);
      break;
    }
    default: {
      const payments = getPayments(hours, prevYearData);
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

const computeDebit = month => {
  const isClosed = month.debitCard.isClosed;
  if (!isClosed) {
    return month.computedData.debitCard.predictedSum;
  } else return month.computedData.debitCard.realSum;
};

const actualizeInterests = month => {
  const interestRate = month.debitCard.cardSettings.interestRate / 100;
  const predictedInterest = month.computedData.debitCard.predictedSum * interestRate;
  month.debitCard.interests.predictedInterest = Number(predictedInterest.toFixed(2));
  /*const realInterest = month.computedData.debitCard.realSum * interestRate;
  month.debitCard.interests.realInterest = Number(realInterest.toFixed(2));*/
};

const getPredictedDebits = (prevYearData, months) => {
  const debits = [];

  let computedDebit;
  const {
    prevMoney: { debitCardPredicted },
  } = prevYearData;

  debits.push(debitCardPredicted);
  for (let i = 0; i < 11; i++) {
    actualizeInterests(months[i]);
    computedDebit = computeDebit(months[i]);

    debits.push(computedDebit);
  }

  return debits;
};

const actualizePredictedDebit = (prevYearData, months, selectedMonthId) => {
  let accounts;
  let predictedDebits = getPredictedDebits(prevYearData, months);
  for (let i = selectedMonthId; i < 12; i++) {
    accounts = months[i].mainAccount.accounts.transactions;

    accounts.forEach(transaction => {
      if (transaction instanceof DebitExpense) {
        transaction.predicted = predictedDebits[i];
      }
    });
  }
};

const choseInterest = (isPeriodClosed, interests) => {
  const { realInterest, predictedInterest } = interests;
  return isPeriodClosed ? realInterest : predictedInterest;
};

const createInterestData = month => {
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

export {
  Expense,
  FixedExpenses,
  Money,
  editTransaction,
  Account,
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
  chargeWallet,
  getIncome,
  calculateComputed,
  checkType,
  createExtendedComputedStatus,
  actualizePredictedDebit,
  choseInterest,
  createInterestData,
  makeCorrect,
  fixNumber,
  accountActions,
};
