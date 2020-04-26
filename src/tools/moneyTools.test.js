import * as tools from './moneyTools';

describe('Test expense class', () => {
  const { Expense } = tools;
  const id = new Date().toLocaleDateString();
  test('Create class without real amount', () => {
    const newExpense = {
      name: 'Speak UP',
      predicted: 100,
      id,
    };
    const testExpense = new Expense(newExpense);
    expect(testExpense).toEqual({
      name: 'Speak UP',
      predicted: -100,
      real: -0,
      percentage: 0,
      action: '-',
      signature: 'standard',
      expenseId: id,
      created: id,
    });
  });
  test('Create class with real amount', () => {
    const newExpense = {
      name: 'Speak UP',
      predicted: 100,
      real: 50,
      action: '+',
      id,
    };
    const testExpense = new Expense(newExpense);
    expect(testExpense).toEqual({
      name: 'Speak UP',
      predicted: 100,
      real: 50,
      percentage: 50,
      action: '+',
      signature: 'standard',
      expenseId: id,
      created: id,
    });
  });

  describe('Test FixedExpenses class', () => {
    const { FixedExpenses } = tools;
    test('Create class', () => {
      const testFixedExpenses = new FixedExpenses('Wydatki stałe', 'fixedExpenses', []);
      expect(testFixedExpenses).toEqual({
        name: 'Wydatki stałe',
        transactions: [],
        path: 'fixedExpenses',
        realSum: 0,
        predictedSum: 0,
      });
    });
  });
  describe('Test MainAccount class', () => {
    const { FixedExpenses, MainAccount } = tools;
    const fixedExpensesTestSection = new FixedExpenses('Wydatki stałe', 'fixedExpenses');
    const testSections = [
      {
        path: 'fixedExpenses',
        classType: FixedExpenses,
        name: 'Wydatki stałe',
      },
    ];

    test('Create class', () => {
      const testMainAccount = new MainAccount('Konto główne', 'mainAccount', testSections);
      fixedExpensesTestSection.path = [testMainAccount.type, testSections[0].path];
      expect(testMainAccount).toEqual({
        title: 'Konto główne',
        sections: [testSections[0].path],

        [testSections[0].path]: fixedExpensesTestSection,
        cardSettings: {
          debit: 0,
        },
        type: testMainAccount.type,
      });
    });
  });

  describe('Account test', () => {
    const { Account } = tools;
    const account = new Account('Konto', 'test');

    test('Create plain account', () => {
      expect(account).toEqual({
        title: 'Konto',
        sections: [],

        type: 'test',
      });
    });
  });

  describe('Test transactions class', () => {
    const { Transactions } = tools;
    const transactions = new Transactions('Transakcje', 'transactions');
    test('Transactions class is correct', () => {
      expect(transactions).toEqual({
        name: 'Transakcje',
        path: 'transactions',
        transactions: [],
        realSum: 0,
        predictedSum: 0,
      });
    });
  });

  describe('Test Wallet class', () => {
    const { Wallet } = tools;
    const wallet = new Wallet('Portfel', 'wallet');

    test('New Wallet', () => {
      expect(wallet).toEqual({
        reCharge: {
          accountReal: 0,
          accountPredicted: 0,
        },
        title: 'Portfel',
        sections: [],
        type: 'wallet',
        sections: [],
      });
    });
  });

  describe('Test DebitCard class', () => {
    const { DebitCard } = tools;
    const debitCard = new DebitCard('Karta debetowa', 'debitCard');

    test('New DebitCard', () => {
      expect(debitCard).toEqual({
        reCharge: {
          accountReal: 0,
          accountPredicted: 0,
        },
        title: 'Karta debetowa',
        sections: [],
        type: 'debitCard',
        sections: [],
        interests: {
          realInterest: 0,
          predictedInterest: 0,
        },
        isClosed: false,
        cardSettings: {
          debit: 5000,
          interestRate: 0.13,
        },
      });
    });
  });
});
