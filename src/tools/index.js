class SingleMonth {
  constructor(id, name) {
    this.id = id + 1;
    this.name = name;
    this.days = [];
  }
}

class SingleDay {
  constructor(dayId, nameOfDay, workHours, isHoliday) {
    this.dayId = dayId;
    this.nameOfDay = nameOfDay;
    this.workHours = workHours;
    this.isHoliday = isHoliday;
  }
}

class SingleYear {
  constructor(yearName) {
    this.yearName = yearName;
    this.months = [];
  }
}

export const monthNames = [
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

const createObj = (dayName, isHoliday) => {
  const settings = {
    dayName,
    isHoliday,
  };
  return settings;
};

const getDayName = (selectedYear, selectedMonth, selectedDay, dayNames) => {
  const dayInWeek = new Date(selectedYear, selectedMonth, selectedDay).getDay();

  switch (dayInWeek) {
    case 0:
      return createObj(dayNames[0], true);
    case 1:
      return createObj(dayNames[1], false);
    case 2:
      return createObj(dayNames[2], false);
    case 3:
      return createObj(dayNames[3], false);
    case 4:
      return createObj(dayNames[4], false);
    case 5:
      return createObj(dayNames[5], false);
    case 6:
      return createObj(dayNames[6], false);
    default:
      return createObj('Error', false);
  }
};

const createNewYear = (monthNames, selectedYear) => {
  const year = new SingleYear(selectedYear);
  const defaultWorkHours = 0;
  //TODO: Wrzucić w funkcję
  monthNames.forEach((name, index) => {
    year.months.push(new SingleMonth(index, name));
  });

  for (const month of year.months) {
    const thisMonthLength = getMonthLength(selectedYear, month.id);
    //TODO: Wrzucić w funkcję
    for (let i = 1; i <= thisMonthLength; i++) {
      const dayId = i;
      const monthId = month.id - 1;
      const dayNameObj = getDayName(selectedYear, monthId, dayId, dayNames);
      const { dayName, isHoliday } = dayNameObj;
      month.days.push(new SingleDay(dayId, dayName, defaultWorkHours, isHoliday));
    }
  }

  return year;
};

//Month------------------------------------------------------

const addDaysToSection = (month, rangeStart, rangeEnd) => {
  const daysArr = [];
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

const findIndexToChange = (startValue, dayId) => {
  const foundIndex = startValue.indexOf(startValue.find(day => day.dayId === dayId));
  return foundIndex;
};

//Reducer---------------------------------------------------------

export { createNewYear, addDaysToSection, sections };
export { replaceDayValue, findIndexToChange }; //Reducer
