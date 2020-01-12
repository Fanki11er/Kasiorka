import {
  SingleMonth,
  SingleDay,
  SingleYear,
  getMonthLength,
  createObj,
  getDayName,
  dayNames,
  monthNames,
  createNewYear,
  addDaysToSection,
  replaceDayValue,
  findIndexToChange,
  findNextYear,
  updateTotalHours,
  newYearsListItem,
  updateSalaryValue,
} from './index';

test('Create Single Month', () => {
  expect(new SingleMonth(0, 'Styczeń')).toEqual({
    id: 1,
    name: 'Styczeń',
    days: [],
    totalHours: 0,
    currency: 'zł',
    paymentReceived: 0,
    salary: 0,
  });
});

test('Create Single Day', () => {
  expect(new SingleDay(0, 'PN', 0, true)).toEqual({
    dayId: 0,
    nameOfDay: 'PN',
    workHours: 0,
    isHoliday: true,
  });
});

test('Create Single Year', () => {
  expect(new SingleYear(2019)).toEqual({
    yearName: 2019,
    months: [],
  });
});

test('Check month length is correct', () => {
  expect(getMonthLength(2019, 2)).toBe(28);
});

test('Is it creating settings object properly', () => {
  expect(createObj('PO', true)).toEqual({
    dayName: 'PO',
    isHoliday: true,
  });
});

test('It returns properly the name of the day and is it a holiday', () => {
  expect(getDayName(2019, 11, 22, dayNames)).toEqual({
    dayName: 'Nd',
    isHoliday: true,
  });

  expect(getDayName(2019, 11, 23, dayNames)).toEqual({
    dayName: 'Pn',
    isHoliday: false,
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

test('is replacing correct value ', () => {
  const month = [
    { dayId: 0, test: 0 },
    { dayId: 1, test: 1 },
  ];
  const newValue = { dayId: 1, test: 7 };
  expect(replaceDayValue(month, newValue, findIndexToChange)).toEqual([
    { dayId: 0, test: 0 },
    { dayId: 1, test: 7 },
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
