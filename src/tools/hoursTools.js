const autoFillHoursMonth = (month, userSettings) => {
  month.currency = userSettings.currency;
  month.salary = userSettings.salaryValue;
  month.days.map(day => {
    if (day.isSaturday) day.workHours = userSettings.saturdayWorkHours;
    else if (day.isSunday) day.workHours = userSettings.sundayWorkHours;
    else if (day.isHoliday) day.workHours = userSettings.holidayWorkHours;
    else if (day.isFreeDay) day.workHours = userSettings.freeDayHours;
    else day.workHours = userSettings.dayWorkHours;
    return null;
  });
};

const sumWholeMonthWorkHours = month => {
  month.totalHours = month.days.reduce((total, day) => {
    return total + day.workHours;
  }, 0);
};
export { autoFillHoursMonth, sumWholeMonthWorkHours };
