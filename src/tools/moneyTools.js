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
  constructor(name) {
    this.name = name;
    this.expenses = [];
    this.predictedSum = 0;
    this.realSum = 0;
    this.percentage = 0;
    this.type = ['mainAccount', 'fixedExpenses'];
    this.addFixedExpense(new Expense({ name: 'Portfel:', predicted: 0, action: '-' }));
  }
  addFixedExpense(expense) {
    this.expenses.push(expense);
  }
}

class Transactions {
  constructor(name, type) {
    this.transactions = [];
    this.predictedSum = 0;
    this.realSum = 0;
    this.percentage = 0;
    this.type = type;
    this.name = name;
  }
}

class MainAccount {
  constructor() {
    this.header = {
      title: 'Konto główne',
      amountFromLastMonth: 0,
      payment: 0,
      debit: false,
      debitAmount: 0,
      amountAvailable: 0,
      amountAvailableWithoutDebit: 0,
    };
    this.fixedExpenses = new FixedExpenses('Wydatki stałe');
    this.transactions = new Transactions('Tranzakcje', ['mainAccount', 'transactions']);
  }
}

class MoneyMonth {
  constructor(id) {
    this.id = id;
    this.mainAccount = new MainAccount();
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

const editExpenseInState = (month, { real, predicted, action }) => {
  month.real = action === '-' ? month.real - real : month.real + real;
  month.predicted = action === '-' ? month.predicted - predicted : month.predicted + predicted;
  month.percentage = countPercentage(month.predicted, month.real);
};

export { Expense, FixedExpenses, MainAccount, Money, editExpenseInState };
