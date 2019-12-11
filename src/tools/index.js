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

const months = [];
const monthNames = [
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

const getDayName = (selectedYear, selectedMonth, selectedDay, dayNames) => {
  const dayInWeek = new Date(selectedYear, selectedMonth, selectedDay).getDay();

  switch (dayInWeek) {
    case 0:
      return dayNames[0];
    case 1:
      return dayNames[1];
    case 2:
      return dayNames[2];
    case 3:
      return dayNames[3];
    case 4:
      return dayNames[4];
    case 5:
      return dayNames[5];
    case 6:
      return dayNames[6];
    default:
      return 'Error';
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
      const dayName = getDayName(selectedYear, monthId, i, dayNames);
      month.days.push(new SingleDay(dayId, dayName, defaultWorkHours, defaultIsHoliday));
    }
  }

  console.log(year);
};
createNewYear(monthNames, selectedYear);
