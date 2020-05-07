import {
  autoFillHoursMonth,
  updateWorkHours,
  findIndexToChange,
  updateTotalHours,
  computeExpectedPayout,
  updateSalaryValue,
  updatePaymentValue,
} from './hoursTools';
import { SingleMonth, SingleDay, User } from './index';

const testMonth = new SingleMonth(0, 'Styczeń');
const nextTestMonth = new SingleMonth(1, 'Luty');

testMonth.days.push(new SingleDay(1, 'Pn', 0, false, false));
testMonth.days.push(new SingleDay(2, 'Nd', 0, false, true));
testMonth.days.push(new SingleDay(3, 'Sd', 0, true, false));
nextTestMonth.days.push(new SingleDay(1, 'Pn', 0, false, false));
nextTestMonth.days.push(new SingleDay(2, 'Nd', 0, false, true));
nextTestMonth.days.push(new SingleDay(3, 'Sd', 5, true, false));
const user = new User('TestUser', [2020]);
user.hoursSettings.salaryValue = 15;
user.hoursSettings.dayWorkHours = 9;
user.hoursSettings.workSaturdays = true;
user.hoursSettings.saturdayWorkHours = 5;
user.hoursSettings.currency = '$';

test('Test before fill', () => {
  expect(testMonth.currency).toBe('zł');
  expect(testMonth.salary).toBe(0);
  expect(testMonth.days[0].workHours).toBe(0);
  expect(testMonth.days[1].workHours).toBe(0);
  expect(testMonth.days[2].workHours).toBe(0);
});

test('After auto fill', () => {
  autoFillHoursMonth(testMonth, user.hoursSettings);
  expect(testMonth.currency).toBe('$');
  expect(testMonth.days[2].workHours).toBe(5);
  expect(testMonth.days[0].workHours).toBe(9);
  expect(testMonth.days[1].workHours).toBe(0);
  expect(testMonth.salary).toBe(15);
});

test('is Summing hours correctly', () => {
  updateTotalHours(testMonth);
  expect(testMonth.totalHours).toBe(14);
});

test('It founds correct index', () => {
  const month = [
    { dayId: 0, test: 0 },
    { dayId: 1, test: 1 },
  ];

  expect(findIndexToChange(month, 1)).toBe(1);
  expect(findIndexToChange(month, 1)).not.toBe(0);
});

describe('updateWorkHours', () => {
  const months = [testMonth, nextTestMonth];
  const month = months[1];

  test('is adding hour correctly', () => {
    const dayId = 2;
    const action = '+';
    updateWorkHours(month, dayId, action);
    const day = findIndexToChange(month.days, dayId);
    expect(month.days[day].workHours).toBe(1);
  });
  test('is removing hour correctly when there is more than 0', () => {
    const dayId = 3;
    const action = '-';
    updateWorkHours(month, dayId, action);
    const day = findIndexToChange(month.days, dayId);
    expect(month.days[day].workHours).toBe(4);
  });

  test('is not removing hour  when there is  0', () => {
    const dayId = 1;
    const action = '-';
    updateWorkHours(month, dayId, action);
    const day = findIndexToChange(month.days, dayId);
    expect(month.days[day].workHours).toBe(0);
  });
});

test('updateTotalHours is updating total correctly', () => {
  const months = [testMonth, nextTestMonth];
  const month = months[1];
  updateTotalHours(month);
  expect(month.totalHours).toBe(5);
});

describe('expectedPayout', () => {
  const month = {
    payments: {
      expectedPayout: 0,
    },
    salary: 16.64,
    totalHours: 180,
  };
  test('is count correctly', () => {
    computeExpectedPayout(month);
    expect(month.payments.expectedPayout).toBeCloseTo(2995.2);
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
