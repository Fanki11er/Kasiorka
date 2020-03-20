class Expense {
  constructor({ name, predicted, real = 0, action = '-' }) {
    this.name = name;
    this.predicted = action === '-' ? -predicted : predicted;
    this.real = action === '-' ? -real : real;
    this.percentage = Math.abs(this.countPercentage());
    this.action = action;
    this.expenseId = new Date().getTime().toString();
    this.created = new Date().toLocaleDateString();
  }
  countPercentage() {
    return this.predicted ? ((this.real / this.predicted) * 100).toFixed() : this.real;
  }
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
    this.transactions = [new Expense({ name: 'Portfel', predicted: 0 })];
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

const accountActions = {
  edit: 'edit',
  add: 'add',
  addFixed: 'addFixed',
  chargeWalletAccount: 'chargeWallet',
};
class MoneyMonth {
  constructor(id) {
    this.id = id;
    this.accountsList = [];
    this.createAccount(Account, 'Konto główne', 'mainAccount', mainAccountSections);
    this.createAccount(Wallet, 'Portfel', 'wallet', walletSections);
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

/*const chosePayment = ({ paymentReceived, expectedPayout }) => {
  if (!paymentReceived && !expectedPayout) return 0;

  return paymentReceived > 0 ? paymentReceived : expectedPayout;
};*/

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

const chargeWallet = (computed, month) => {
  const reCharge = month.wallet.reCharge;
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

const ActualizeMonthsTotal = (months, payments, type, prevYearData) => {
  const { prevMoney } = prevYearData;
  months.forEach((month, index, months) => {
    if (index === 0) {
      month.computedData[type].monthTotal =
        month.computedData[type].realSum + payments[index] + prevMoney.monthTotal;
      month.computedData[type].monthTotalPredicted =
        month.computedData[type].predictedSum + payments[index] + prevMoney.monthTotalPredicted;
    } else {
      month.computedData[type].monthTotal =
        month.computedData[type].realSum +
        payments[index] +
        months[index - 1].computedData[type].monthTotal;
      month.computedData[type].monthTotalPredicted =
        month.computedData[type].predictedSum +
        payments[index] +
        months[index - 1].computedData[type].monthTotalPredicted;
    }
  });
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
  accountActions,
};
