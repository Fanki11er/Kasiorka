class Expense {
  constructor({ name, predicted, real = 0 }) {
    this.name = name;
    this.predicted = predicted;
    this.real = real;
    this.percentage = this.countPercentage();
  }
  countPercentage() {
    return this.predicted ? (this.real / this.predicted) * 100 : 0;
  }
}

class FixedExpenses {
  constructor(name) {
    this.name = name;
    this.expenses = [];
    this.predictedSum = 0;
    this.realSum = 0;
    this.percentage = 0;
    this.addFixedExpense(new Expense({ name: 'Portfel:', predicted: 0 }));
  }
  addFixedExpense(expense) {
    this.expenses.push(expense);
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
    this.transactions = {
      transactions: [],
      sum: 0,
      percentage: 0,
    };
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

export { Expense, FixedExpenses, MainAccount, Money };
