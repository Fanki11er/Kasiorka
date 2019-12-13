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
  'Wrzesie',
  'Październik',
  'Listopad',
  'Grudzień',
];
const dayNames = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];
const selectedYear = 2019;

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
  const defaultIsHoliday = false;
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

export { createNewYear };
