const autoFillHoursMonth = (
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

const sumWholeMonthWorkHours = (month) => {
  month.totalHours = month.days.reduce((total, day) => {
    return total + day.workHours;
  }, 0);
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
export { autoFillHoursMonth, sumWholeMonthWorkHours };
