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
export { autoFillHoursMonth, sumWholeMonthWorkHours };
