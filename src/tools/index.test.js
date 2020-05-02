import {
  SingleMonth,
  SingleDay,
  getMonthLength,
  createObj,
  getDayName,
  dayNames,
  monthNames,
  createNewYear,
  addDaysToSection,
  replaceWorkHoursValue,
  findIndexToChange,
  findNextYear,
  updateTotalHours,
  newYearsListItem,
  updateSalaryValue,
  updatePaymentValue,
  expectedPayout,
  checkForUpdates,
} from './index';

test('Create Single Month', () => {
  expect(new SingleMonth(0, 'Styczeń')).toEqual({
    id: 1,
    name: 'Styczeń',
    days: [],
    totalHours: 0,
    currency: 'zł',
    payments: {
      paymentReceived: 0,
      expectedPayout: 0,
    },
    salary: 0,
  });
});

test('Create Single Day', () => {
  expect(new SingleDay(0, 'So', 0, true, false)).toEqual({
    dayId: 0,
    nameOfDay: 'So',
    workHours: 0,
    isFreeDay: false,
    isSaturday: true,
    isSunday: false,
    isHoliday: false,
  });
});

test('Check month length is correct', () => {
  expect(getMonthLength(2019, 2)).toBe(28);
});

test('Is it creating settings object properly', () => {
  expect(createObj('SO', true, false)).toEqual({
    dayName: 'SO',
    isSaturday: true,
    isSunday: false,
  });
});

test('It returns properly the name of the day and is it a holiday', () => {
  expect(getDayName(2019, 11, 22, dayNames)).toEqual({
    dayName: 'Nd',
    isSaturday: false,
    isSunday: true,
  });

  expect(getDayName(2019, 11, 23, dayNames)).toEqual({
    dayName: 'Pn',
    isSaturday: false,
    isSunday: false,
  });
});

test('Check if month has 12 months, and the month has at least 28 days', () => {
  const newYear = createNewYear(monthNames, 2019);
  expect(newYear.months.length).toBe(12);
  expect(newYear.months[1].days.length).toBe(28);
  expect(newYear.months[2].days.length).not.toBe(28);
});

test('Splitting days to a sections', () => {
  const month = [{ dayId: 0 }, { dayId: 1 }, { dayId: 2 }, { dayId: 3 }, { dayId: 4 }];

  expect(addDaysToSection(month, 0, 3).length).toBe(4);
});

test('is replacing correct workHours value ', () => {
  const month = [
    { dayId: 0, workHours: 0 },
    { dayId: 1, workHours: 1 },
  ];
  const newValue = 7;
  const dayId = 1;
  replaceWorkHoursValue(month, dayId, findIndexToChange, newValue);
  expect(month).toEqual([
    { dayId: 0, workHours: 0 },
    { dayId: 1, workHours: 7 },
  ]);
});

test('It founds correct index', () => {
  const month = [
    { dayId: 0, test: 0 },
    { dayId: 1, test: 1 },
  ];

  expect(findIndexToChange(month, 1)).toBe(1);
  expect(findIndexToChange(month, 1)).not.toBe(0);
});

test('It returns next year after last in table or return current year if there is no years', () => {
  const years = ['2019', '2020'];
  const emptyYears = [];
  const thisYear = new Date().getFullYear();
  expect(findNextYear(emptyYears)).toBe(thisYear);
  expect(findNextYear(years)).toBe(2021);
});

test('Is adding totalHours properly', () => {
  const testObj = [
    {
      id: 1,
      totalHours: 5,
    },
    {
      id: 2,
      totalHours: 0,
    },
  ];
  expect(updateTotalHours(testObj[1], '+')).toEqual({
    id: 2,
    totalHours: 1,
  });

  expect(updateTotalHours(testObj[0], '-')).toEqual({
    id: 1,
    totalHours: 4,
  });

  expect(updateTotalHours(testObj[0])).toEqual({
    id: 1,
    totalHours: 4,
  });
});

test('Find last item on the list', () => {
  const list = ['2019', '2020', '2021'];

  expect(newYearsListItem(list, 2022)).toEqual({
    3: 2022,
  });
});

test('Update salary value', () => {
  const testObj = {
    months: [
      {
        id: 1,
        salary: 0,
      },

      {
        id: 2,
        salary: 0,
      },
    ],
  };
  updateSalaryValue(testObj.months[1], 15);

  expect(testObj).toEqual({
    months: [
      {
        id: 1,
        salary: 0,
      },

      {
        id: 2,
        salary: 15,
      },
    ],
  });
});

test('Update payment value', () => {
  const testObj = {
    months: [
      {
        id: 1,
        payments: {
          paymentReceived: 0,
        },
      },

      {
        id: 2,
        payments: {
          paymentReceived: 0,
        },
      },
    ],
  };
  updatePaymentValue(testObj.months[1], 1500);

  expect(testObj).toEqual({
    months: [
      {
        id: 1,
        payments: {
          paymentReceived: 0,
        },
      },

      {
        id: 2,
        payments: {
          paymentReceived: 1500,
        },
      },
    ],
  });
});

describe('expectedPayout', () => {
  const month = {
    payments: {
      expectedPayout: 0,
    },
  };
  const totalHours = 180;
  const salary = 16.64;
  test('is count correctly', () => {
    expectedPayout(month, totalHours, salary);
    expect(month.payments.expectedPayout).toBeCloseTo(2995.2);
  });
});

describe('checkForUpdates', () => {
  const data = {
    testProp1Version: 1.5,
  };

  test('Create new version if there is no version property', () => {
    checkForUpdates(data, 2.2, 'testProp2', []);
    expect(data.testProp2Version).toBe(2.2);
  });
  test('Update existing property', () => {
    checkForUpdates(data, 2.2, 'testProp1', []);
    expect(data.testProp1Version).toBe(2.2);
  });
});
