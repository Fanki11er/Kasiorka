import * as tools from './moneyTools';

describe('Test money classes', () => {
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

describe('Test MoneyMonth', () => {
  const { MoneyMonth } = tools;

  test('Test first MoneyMonth', () => {
    const month = new MoneyMonth(1);
    const {
      computedData: { wallet },
    } = month;

    expect(wallet.doneUpdates).toEqual([]);
  });

  test('Test last MoneyMonth', () => {
    const month = new MoneyMonth(12);
    const {
      computedData: { wallet },
    } = month;

    expect(wallet.fixedExpensesRegistry).toEqual([]);
    expect(wallet.isClosed).toBe(false);
  });
});
describe('fixNumber function is fixing numbers', () => {
  const { fixNumber } = tools;
  test('Shorts number to 2 places after period', () => {
    expect(fixNumber(15.7898, 2)).toBe(15.79);
  });

  test('It converts number in string to number and fixes it', () => {
    expect(fixNumber('15.7898', 2)).toBe(15.79);
  });

  test('If isNan returns 0', () => {
    expect(fixNumber('Ala', 2)).toBe(0);
  });
});
describe('Is count percentage returns correct percentage', () => {
  const { countPercentage } = tools;

  test('If predicted is 0 it returns real', () => {
    expect(countPercentage(0, 90)).toBe(90);
  });

  test('If predicted is bigger than 0 it returns computed percents', () => {
    expect(countPercentage(100, 25)).toBe(25);
  });

  test('If real is bigger than predicted it returns computed percents', () => {
    expect(countPercentage(100, 125)).toBe(125);
  });
});

describe('Adding transactions', () => {
  const { addTransaction, Expense } = tools;
  const testSection = [];

  test('Add expense to empty array', () => {
    const testData = {
      name: 'Speak UP',
      predicted: 100,
      real: 50,
      action: '-',
      id: '1',
    };
    const expense = new Expense(testData);

    addTransaction(testSection, testData);
    expect(testSection.transactions[0]).toEqual(expense);
    expect(testSection.transactions.length).toBe(1);
  });

  test('Add expense to not empty array', () => {
    const testData2 = {
      name: 'Test 2',
      predicted: 200,
      real: 150,
      action: '+',
      id: '2',
    };
    const expense2 = new Expense(testData2);

    addTransaction(testSection, testData2);
    expect(testSection.transactions[0]).toEqual(expense2);
    expect(testSection.transactions.length).toBe(2);
  });
});

describe('Test if editTransaction', () => {
  const { editTransaction, Expense } = tools;

  const testData = [
    {
      name: 'Speak UP',
      predicted: 100,
      real: 50,
      action: '-',
      id: '1',
    },
    {
      name: 'Test 2',
      predicted: 200,
      real: 150,
      action: '+',
      id: '2',
    },
  ];

  const testSection = [new Expense(testData[0]), new Expense(testData[1])];
  test('Editing transaction when action is +', () => {
    const transaction = testSection[1];
    const testObj = editTransaction(transaction, { real: 15, predicted: 15, action: '+' });
    expect(testSection[1].real).toBe(165);
    expect(testSection[1].predicted).toBe(215);
    expect(testObj).toEqual({
      real: 165,
      predicted: 215,
    });
  });

  test('Editing transaction when action is -', () => {
    const transaction = testSection[0];
    const testObj = editTransaction(transaction, { real: 15, predicted: 15, action: '-' });
    expect(testSection[0].real).toBe(-65);
    expect(testSection[0].predicted).toBe(-115);
    expect(testObj).toEqual({
      real: -65,
      predicted: -115,
    });
  });
});

describe('Fixed transactions are correctly', () => {
  const { addFixedTransaction, deleteFixedTransaction } = tools;
  const path = {
    type: ['mainAccount', 'transactions'],
    selectedMonthId: 0,
  };

  const months = [];
  for (let i = 0; i < 12; i++)
    months.push({
      mainAccount: {
        transactions: [],
      },
      computedData: {
        mainAccount: {},
      },
    });

  const testData = {
    name: 'Speak UP',
    predicted: 100,
    real: 50,
    action: '-',
    id: '1',
  };
  test('added to selected months', () => {
    addFixedTransaction(months, path, testData);

    expect(months[0].mainAccount.transactions.transactions.length).toBe(1);
    expect(months[6].mainAccount.transactions.transactions.length).toBe(1);
    expect(months[11].mainAccount.transactions.transactions.length).toBe(1);
  });

  test('added to registry', () => {
    expect(months[11].computedData.mainAccount.fixedExpensesRegistry.length).toBe(1);
  });

  test('delete from selected months', () => {
    deleteFixedTransaction(months, 6, ['mainAccount', 'transactions'], '1');
    expect(months[0].mainAccount.transactions.transactions.length).toBe(1);
    expect(months[7].mainAccount.transactions.transactions.length).toBe(0);
  });

  test('added to registry', () => {
    expect(months[11].computedData.mainAccount.fixedExpensesRegistry.length).toBe(2);
  });
});

describe('It sums section correctly', () => {
  const { sumSection, Expense } = tools;
  const section = {
    realSum: 0,
    predictedSum: 0,
    transactions: [],
  };
  const expenses = [
    {
      name: 'Test1',
      predicted: 100,
      real: 50,
      action: '-',
      id: '1',
    },
    {
      name: 'Test2',
      predicted: 100.99,
      real: 100.99,
      action: '-',
      id: '2',
    },
    {
      name: 'Test3',
      predicted: 100,
      real: 50,
      action: '+',
      id: '3',
    },
  ];
  expenses.forEach((data) => {
    section.transactions.push(new Expense(data));
  });

  test('Test', () => {
    sumSection(section);
    expect(section.realSum).toBe(-100.99);
    expect(section.predictedSum).toBe(-100.99);
  });
});

test('It sums sections correctly', () => {
  const { DebitCard, debitCardSections, addTransaction, sumSections, sumSection } = tools;
  const account = new DebitCard('Karta debetowa', 'debitCard', debitCardSections);
  const data = {
    name: 'Test2',
    predicted: 100.99,
    real: 100.99,
    action: '-',
    id: '2',
  };
  addTransaction(account.transactions, data);
  addTransaction(account.fixedExpenses, data);

  expect(account.transactions.transactions.length).toBe(1);
  expect(account.fixedExpenses.transactions.length).toBe(1);
  sumSection(account.transactions);
  sumSection(account.fixedExpenses);

  expect(sumSections(account, 'realSum')).toBe(-201.98);
  expect(sumSections(account, 'predictedSum')).toBe(-201.98);
});
