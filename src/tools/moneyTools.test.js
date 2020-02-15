import { Expense, FixedExpenses, MainAccount } from './moneyTools';

describe('Test expense class', () => {
  test('Create class without real amount', () => {
    const newExpense = {
      name: 'Speak UP',
      predicted: 100,
    };
    const testExpense = new Expense(newExpense);
    expect(testExpense).toEqual({
      name: 'Speak UP',
      predicted: 100,
      real: 0,
      percentage: 0,
    });
  });

  test('Create class with real amount', () => {
    const newExpense = {
      name: 'Speak UP',
      predicted: 100,
      real: 50,
    };
    const testExpense = new Expense(newExpense);
    expect(testExpense).toEqual({
      name: 'Speak UP',
      predicted: 100,
      real: 50,
      percentage: 50,
    });
  });

  test('Create class with 0 amount and 0 real', () => {
    const newExpense = {
      name: 'Speak UP',
      predicted: 0,
      real: 0,
    };
    const testExpense = new Expense(newExpense);
    expect(testExpense).toEqual({
      name: 'Speak UP',
      predicted: 0,
      real: 0,
      percentage: 0,
    });
  });
});

describe('Test FixedExpenses class', () => {
  test('Create class', () => {
    const testFixedExpenses = new FixedExpenses('Wydatki stałe');
    expect(testFixedExpenses).toEqual({
      name: 'Wydatki stałe',
      expenses: [{ name: 'Portfel:', predicted: 0, real: 0, percentage: 0, type: '-' }],
      predictedSum: 0,
      realSum: 0,
      percentage: 0,
      type: ['mainAccount', 'fixedExpenses'],
    });
  });
});

describe('Test MainAccount class', () => {
  test('Create class', () => {
    const testMainAccount = new MainAccount();
    expect(testMainAccount).toEqual({
      header: {
        title: 'Konto główne',
        amountFromLastMonth: 0,
        payment: 0,
        debit: false,
        debitAmount: 0,
        amountAvailable: 0,
        amountAvailableWithoutDebit: 0,
      },
      fixedExpenses: {
        name: 'Wydatki stałe',
        expenses: [{ name: 'Portfel:', predicted: 0, real: 0, percentage: 0, type: '-' }],
        predictedSum: 0,
        realSum: 0,
        percentage: 0,
        type: ['mainAccount', 'fixedExpenses'],
        name: 'Transakcje',
      },
      transactions: {
        transactions: [],
        predictedSum: 0,
        realSum: 0,
        percentage: 0,
        type: ['mainAccount', 'fixedExpenses'],
      },
    });
  });
});
