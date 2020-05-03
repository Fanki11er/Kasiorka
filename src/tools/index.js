export const appVersion = (1.03).toFixed(2);
export const userVersion = 0.2;

export class SingleMonth {
  constructor(id, name) {
    this.id = id + 1;
    this.name = name;
    this.days = [];
    this.totalHours = 0;
    this.currency = 'zł';
    this.payments = {
      paymentReceived: 0,
      expectedPayout: 0,
    };
    this.salary = 0;
  }
}

export class SingleDay {
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

export class SingleYear {
  constructor(yearName, hoursVersion = 0) {
    this.yearName = yearName;
    this.months = [];
    this.hoursVersion = hoursVersion;
  }
}

export class User {
  constructor(name, yearsList) {
    this.name = name;
    this.yearsList = yearsList;
    this.userVersion = userVersion;
    this.hoursSettings = {
      currency: 'zł',
      salaryValue: 0,
      dayWorkHours: 0,
      freeDayHours: 0,
      saturdayWorkHours: 0,
      sundayWorkHours: 0,
      holidayWorkHours: 0,
      workSaturdays: false,
      workSundays: false,
      workHolidays: false,
    };
    this.moneySettings = {};
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
export const dayNames = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];

export const sections = [
  { rangeStart: 1, rangeEnd: 8 },
  { rangeStart: 9, rangeEnd: 16 },
  { rangeStart: 17, rangeEnd: 24 },
  { rangeStart: 25, rangeEnd: 32 },
];

export const getMonthLength = (selectedYear, selectedMonth) => {
  const date = new Date(selectedYear, selectedMonth, 0);
  const lengthOfMonth = date.getDate();
  return lengthOfMonth;
};

export const createObj = (dayName, isSaturday, isSunday) => {
  const settings = {
    dayName,
    isSaturday,
    isSunday,
  };
  return settings;
};

export const getDayName = (selectedYear, selectedMonth, selectedDay, dayNames) => {
  const dayInWeek = new Date(selectedYear, selectedMonth, selectedDay).getDay();

  switch (dayInWeek) {
    case 0:
      return createObj(dayNames[0], false, true); //Sunday
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
      return createObj(dayNames[6], true, false); //Saturday
    default:
      return createObj('Error', false, false);
  }
};

export const createNewYear = (monthNames, selectedYear) => {
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

export const findNextYear = (years) => {
  let newYear;
  const lastYear = years.length - 1;
  if (years.length === 0) newYear = new Date().getFullYear();
  else newYear = parseFloat(years[lastYear]) + 1;
  return newYear;
};

export const copyObj = (object) => Object.assign({}, object);

export const addDaysToSection = (month, rangeStart, rangeEnd) => {
  const daysArr = [];
  month &&
    month.map((day) => {
      if (day.dayId >= rangeStart && day.dayId <= rangeEnd) {
        daysArr.push(day);
      }
      return null;
    });
  return daysArr;
};

export const checkForUpdates = (data, version, module, updatesTable) => {
  let property = 'Version';
  property = `${module}${property}`;
  if (data[property] === undefined) data[property] = 0;
  if (data[property] < version) {
    updatesTable &&
      updatesTable.forEach((update) => {
        update(data);
      });
    data[property] = version;
    return {
      data,
      updated: true,
    };
  } else return { data, updated: false };
};

export const settingsUpdatesArray = [];

export const newYearsListItem = (yearsList, yearToAdd) => {
  const key = Object.keys(yearsList).length;
  return { [key]: yearToAdd };
};
