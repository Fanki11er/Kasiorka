import { Expense, FixedExpenses, MainAccount, Account } from './moneyTools';

describe('Test expense class', () => {
  /*  test('Create class without real amount', () => {
    const newExpense = {
      name: 'Speak UP',
      predicted: 100,
    };
    const testExpense = new Expense(newExpense);
    expect(testExpense).toEqual({
      name: 'Speak UP',
      predicted: -100,
      real: -0,
      percentage: 0,
      action: '-',
    });
  });*/
  /*test('Create class with real amount', () => {
    const newExpense = {
      name: 'Speak UP',
      predicted: 100,
      real: 50,
      action: '+',
    };
    const testExpense = new Expense(newExpense);
    expect(testExpense).toEqual({
      name: 'Speak UP',
      predicted: 100,
      real: 50,
      percentage: 50,
      action: '+',
    });
  });*/
  /*test('Create class with 0 amount and 0 real', () => {
    const newExpense = {
      name: 'Speak UP',
      predicted: 0,
      real: 0,
    };
    const testExpense = new Expense(newExpense);
    expect(testExpense).toEqual({
      name: 'Speak UP',
      predicted: -0,
      real: -0,
      percentage: 0,
      action: '-',
    });
  });
});*/
  /*describe('Test FixedExpenses class', () => {
  test('Create class', () => {
    const testFixedExpenses = new FixedExpenses('Wydatki stałe', 'fixedExpenses', []);
    expect(testFixedExpenses).toEqual({
      name: 'Wydatki stałe',
      expenses: [],
      path: 'fixedExpenses',
    });
  });
});*/
  /*describe('Test MainAccount class', () => {
  const sections = [
    {
      path: 'fixedExpenses',
      classType: FixedExpenses,
      name: 'Wydatki stałe',
    },
  ];
  test('Create class', () => {
    const testMainAccount = new MainAccount('Konto główne', 'mainAccount', sections);
    expect(testMainAccount).toEqual({
      header: {
        title: 'Konto główne',

        payment: 0,
        debit: false,
        debitAmount: 0,
        realAmountAvailable: 0,
        predictedAmountAvailable: 0,
        realSum: 0,
        predictedSum: 0,
      },
      fixedExpenses: {
        name: 'Wydatki stałe',
        expenses: [],
        path: ['mainAccount', 'fixedExpenses'],
      },
      type: 'mainAccount',
    });
  });
});*/
  /*describe.skip('Account test', () => {
  const mainAccount = new Account('Konto', 'test');

  test('Create plain account', () => {
    expect(mainAccount).toEqual({
      header: {
        title: 'Konto',
        realAmountAvailable: 0,
        predictedAmountAvailable: 0,
        realSum: 0,
        predictedSum: 0,
      },
      type: 'test',
    });
  });*/
  /*test('Add fixedExpenses Property', () => {
    mainAccount.addSection('Wydatki stałe', FixedExpenses, 'fixedExpenses');
    expect(mainAccount).toEqual({
      header: {
        title: 'Konto',
        realAmountAvailable: 0,
        predictedAmountAvailable: 0,
        realSum: 0,
        predictedSum: 0,
      },
      type: 'test',
      fixedExpenses: {
        name: 'Wydatki stałe',
        expenses: [],
        predictedSum: 0,
        realSum: 0,
        percentage: 0,
        path: ['test', 'fixedExpenses'],
      },
    });
  });*/
});

describe('Main account class test', () => {
  /*test('Plain mainAccount', () => {
    const main = new MainAccount('Konto główne', 'mainAccount');
    expect(main).toEqual({
      header: {
        title: 'Konto główne',
        payment: 0,
        debit: false,
        debitAmount: 0,
        realAmountAvailable: 0,
        predictedAmountAvailable: 0,
        realSum: 0,
        predictedSum: 0,
      },
      type: 'mainAccount',
    });
  });
*/
  /*test('mainAccount with one section', () => {
    const sections = [
      {
        path: 'fixedExpenses',
        classType: FixedExpenses,
        name: 'Wydatki stałe',
      },
    ];
    const main = new MainAccount('Konto główne', 'mainAccount', sections);
    expect(main).toEqual({
      header: {
        title: 'Konto główne',
        payment: 0,
        debit: false,
        debitAmount: 0,
        realAmountAvailable: 0,
        predictedAmountAvailable: 0,
        realSum: 0,
        predictedSum: 0,
      },
      fixedExpenses: {
        name: 'Wydatki stałe',
        expenses: [],
        path: ['mainAccount', 'fixedExpenses'],
      },
      type: 'mainAccount',
    });
  });*/
});
