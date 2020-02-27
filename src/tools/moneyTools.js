class Expense {
  constructor({ name, predicted, real = 0, action = '-' }) {
    this.name = name;
    this.predicted = action === '-' ? -predicted : predicted;
    this.real = action === '-' ? -real : real;
    this.percentage = Math.abs(this.countPercentage());
    this.action = action;
  }
  countPercentage() {
    return this.predicted ? ((this.real / this.predicted) * 100).toFixed() : this.real;
  }
}

class FixedExpenses {
  constructor(name, path, transactions = []) {
    this.name = name;
    this.transactions = transactions;
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

/*class MainAccount extends Account {
  constructor(title, type, sections) {
    super(title, type, sections);
  }
}*/
const mainAccountSections = [
  /*{
    path: 'fixedExpenses',
    classType: FixedExpenses,
    name: 'Wydatki stałe',
  },*/
  {
    path: 'transactions',
    classType: Transactions,
    name: 'Transakcje',
  },
];
class MoneyMonth {
  constructor(id) {
    this.id = id;
    this.accountsList = [];
    this.createAccount(Account, 'Konto główne', 'mainAccount', mainAccountSections);
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
};

const sumSections = (account, property) => {
  const { sections } = account;
  return sections.reduce((total, section) => (total += account[section][property]), 0);
};

const addTransaction = (section, data) => {
  section['transactions']
    ? section['transactions'].unshift(new Expense(data))
    : (section['transactions'] = new Array(new Expense(data)));
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

const chosePayment = ({ paymentReceived, expectedPayout }) => {
  if (!paymentReceived && !expectedPayout) return 0;

  return paymentReceived > 0 ? paymentReceived : expectedPayout;
};

const getPayments = (hours, prevYearData) => {
  const months = hours.months;
  const { prevPayments } = prevYearData;
  const paymentsTable = [];
  paymentsTable.push(chosePayment(prevPayments));
  months.forEach(({ payments }) => paymentsTable.push(chosePayment(payments)));
  return paymentsTable;
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
    stats.expenses =
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
};
