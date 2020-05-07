//? For updates-----------------------------------------------------------

//import { addVersioningToHours } from './updatingTools';
export const hoursUpdatesArray = [
  /*addVersioningToHours*/
];

//? For updates-----------------------------------------------------------

export const hoursVersion = 0.3;

export const autoFillHoursMonth = (
  month,
  {
    currency,
    salaryValue,
    saturdayWorkHours,
    sundayWorkHours,
    holidayWorkHours,
    freeDayHours,
    dayWorkHours,
  },
) => {
  month.currency = currency;
  month.salary = salaryValue;
  month.days.map((day) => {
    if (day.isSaturday) day.workHours = saturdayWorkHours;
    else if (day.isSunday) day.workHours = sundayWorkHours;
    else if (day.isHoliday) day.workHours = holidayWorkHours;
    else if (day.isFreeDay) day.workHours = freeDayHours;
    else day.workHours = dayWorkHours;
    return null;
  });
};

export const validateHoursInModal = (values, property, errors) => {
  if (values[property] === undefined) errors.error = false;
  else if (
    !/^[+]?[0-9]*$/.test(values[property]) ||
    values[property] === '' ||
    values[property] > 24 ||
    values[property] === 'e'
  ) {
    errors[property] = true;
    errors.error = true;
  }
};

export const findIndexToChange = (days, dayId) => {
  const foundIndex = days.indexOf(days.find((day) => day.dayId === dayId));
  return foundIndex;
};

export const updateWorkHours = (month, dayId, action) => {
  const days = month.days;
  const dayIndex = findIndexToChange(days, dayId);
  const workHours = days[dayIndex].workHours;

  if (action === '+' && workHours < 24) {
    days[dayIndex].workHours += 1;
  } else if (action === '-' && workHours > 0) {
    days[dayIndex].workHours -= 1;
  }
};

export const updateTotalHours = (month) => {
  const totalHours = month.days.reduce((total, { workHours }) => {
    return (total += workHours);
  }, 0);
  month.totalHours = totalHours;
};

export const computeExpectedPayout = (month) => {
  const { totalHours, salary, payments } = month;
  payments.expectedPayout = parseFloat((totalHours * salary).toFixed(2));
};

export const updateSalaryValue = (month, newSalaryValue) => (month.salary = newSalaryValue);

export const updatePaymentValue = (month, newPaymentValue) =>
  (month.payments.paymentReceived = newPaymentValue);
