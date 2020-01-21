import { autoFillHoursMonth, sumWholeMonthWorkHours } from './hoursTools';
import { SingleMonth, SingleDay, User } from './index';

const testMonth = new SingleMonth(0, 'Styczeń');

testMonth.days.push(new SingleDay(1, 'Pn', 0, false, false));
testMonth.days.push(new SingleDay(2, 'Nd', 0, false, true));
testMonth.days.push(new SingleDay(3, 'Sd', 0, true, false));
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
  sumWholeMonthWorkHours(testMonth);
  expect(testMonth.totalHours).toBe(14);
});
