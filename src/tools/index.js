class SingleMonth {
  constructor(id, name) {
    this.id = id + 1;
    this.name = name;
    this.days = [];
    this.totalHours = 0;
    this.currency = 'zł';
    this.paymentReceived = 0;
    this.salary = 0;
  }
}

class SingleDay {
  constructor(dayId, nameOfDay, workHours, isSaturday, isSunday) {
    this.dayId = dayId;
    this.nameOfDay = nameOfDay;
    this.workHours = workHours;
    this.isSaturday = isSaturday;
    this.isSunday = isSunday;
    this.isHoliday = false;
    this.isFreeDay = false;
  }
}

class SingleYear {
  constructor(yearName) {
    this.yearName = yearName;
    this.months = [];
  }
}

const monthNames = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];
const dayNames = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];

const sections = [
  { rangeStart: 1, rangeEnd: 8 },
  { rangeStart: 9, rangeEnd: 16 },
  { rangeStart: 17, rangeEnd: 24 },
  { rangeStart: 25, rangeEnd: 32 },
];

const getMonthLength = (selectedYear, selectedMonth) => {
  const date = new Date(selectedYear, selectedMonth, 0);
  const lengthOfMonth = date.getDate();
  return lengthOfMonth;
};

const createObj = (dayName, isSaturday, isSunday) => {
  const settings = {
    dayName,
    isSaturday,
    isSunday,
  };
  return settings;
};

const getDayName = (selectedYear, selectedMonth, selectedDay, dayNames) => {
  const dayInWeek = new Date(selectedYear, selectedMonth, selectedDay).getDay();

  switch (dayInWeek) {
    case 0:
      return createObj(dayNames[0], false, true);
    case 1:
      return createObj(dayNames[1], false, false);
    case 2:
      return createObj(dayNames[2], false, false);
    case 3:
      return createObj(dayNames[3], false, false);
    case 4:
      return createObj(dayNames[4], false, false);
    case 5:
      return createObj(dayNames[5], false, false);
    case 6:
      return createObj(dayNames[6], true, false);
    default:
      return createObj('Error', false, false);
  }
};

const createNewYear = (monthNames, selectedYear) => {
  const year = new SingleYear(selectedYear);
  const defaultWorkHours = 0;
  monthNames.forEach((name, index) => {
    year.months.push(new SingleMonth(index, name));
  });
  for (const month of year.months) {
    const thisMonthLength = getMonthLength(selectedYear, month.id);
    for (let i = 1; i <= thisMonthLength; i++) {
      const dayId = i;
      const monthId = month.id - 1;
      const dayNameObj = getDayName(selectedYear, monthId, dayId, dayNames);
      const { dayName, isSaturday, isSunday } = dayNameObj;
      month.days.push(new SingleDay(dayId, dayName, defaultWorkHours, isSaturday, isSunday));
    }
  }

  return year;
};

const findNextYear = years => {
  let newYear;
  const lastYear = years.length - 1;
  if (years.length === 0) newYear = new Date().getFullYear();
  else newYear = parseFloat(years[lastYear]) + 1;
  return newYear;
};

//Month------------------------------------------------------

const addDaysToSection = (month, rangeStart, rangeEnd) => {
  const daysArr = [];
  month &&
    month.map(day => {
      if (day.dayId >= rangeStart && day.dayId <= rangeEnd) {
        daysArr.push(day);
      }
      return null;
    });
  return daysArr;
};
//Month-----------------------------------------------------------
//
//Reducer---------------------------------------------------------
const replaceDayValue = (prevValue, newValue, indexToChange) => {
  const startValue = prevValue;
  const dayId = newValue.dayId;
  const index = indexToChange(startValue, dayId);
  startValue.splice(index, 1, newValue);
  return startValue;
};

const updateTotalHours = (monthToUpdate, actionPerformed) => {
  let value = monthToUpdate.totalHours;
  if (actionPerformed === '+') {
    value++;
    monthToUpdate.totalHours = value;
    return monthToUpdate;
  }
  if (actionPerformed === '-') {
    value--;
    monthToUpdate.totalHours = value;
    return monthToUpdate;
  }
  if (!actionPerformed) return monthToUpdate;
};

const findIndexToChange = (startValue, dayId) => {
  const foundIndex = startValue.indexOf(startValue.find(day => day.dayId === dayId));
  return foundIndex;
};

const updateSalaryValue = (month, newSalaryValue) => {
  return (month.salary = newSalaryValue);
};

const updatePaymentValue = (month, newPaymentValue) => {
  return (month.paymentReceived = newPaymentValue);
};
//Reducer---------------------------------------------------------
//Actions---------------------------------------------------------
const newYearsListItem = (yearsList, yearToAdd) => {
  const key = Object.keys(yearsList).length;
  return { [key]: yearToAdd };
};

//Actions---------------------------------------------------------

export { createNewYear, findNextYear, addDaysToSection, sections };
export {
  replaceDayValue,
  findIndexToChange,
  updateTotalHours,
  updateSalaryValue,
  updatePaymentValue,
}; //Reducer
export { newYearsListItem }; //Actions
export {
  SingleMonth,
  SingleDay,
  SingleYear,
  getMonthLength,
  createObj,
  getDayName,
  dayNames,
  monthNames,
}; //For tests
