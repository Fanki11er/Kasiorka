class HolidayInfo {
  constructor(dayId, monthId, description) {
    this.dayId = dayId;
    this.monthId = monthId;
    this.description = description;
  }
}

const constantPolishHolidays = [
  {
    dayId: 1,
    monthId: 0,
    description: 'Nowy Rok',
  },
  {
    dayId: 6,
    monthId: 0,
    description: 'Trzech Króli',
  },
  {
    dayId: 1,
    monthId: 4,
    description: 'Święto Pracy',
  },
  {
    dayId: 3,
    monthId: 4,
    description: 'Święto Konstytucji 3 Maja',
  },
  {
    dayId: 15,
    monthId: 7,
    description: 'Święto Wojska Polskiego',
  },
  {
    dayId: 1,
    monthId: 10,
    description: 'Wszystkich Świetych',
  },
  {
    dayId: 11,
    monthId: 10,
    description: 'Święto Niepodległości',
  },
  {
    dayId: 25,
    monthId: 11,
    description: 'Boże Narodzenie, dzień pierwszy',
  },
  {
    dayId: 26,
    monthId: 11,
    description: 'Boże Narodzenie, dzień drugi',
  },
];

const computeEasterSundayDate = year => {
  const a = year % 19;
  const b = year % 4;
  const c = year % 7;
  const d = (a * 19 + 24) % 30;
  const e = (2 * b + 4 * c + 6 * d + 5) % 7;
  const timeToEaster = d + e;
  if (d === 29 && e === 6) {
    return new Date(year, 3, 19);
  }
  if (d === 28 && e === 6) {
    return new Date(year, 3, 18);
  }
  return new Date(year, 2, 22 + timeToEaster);
};

const computeEasterMondayOrCorpusChristiDate = (easterSundayDate, kindOfHolidayToCompute) => {
  const day = easterSundayDate.getDate();
  const month = easterSundayDate.getMonth();
  const year = easterSundayDate.getFullYear();

  switch (kindOfHolidayToCompute) {
    case 'easterMonday': {
      return new Date(year, month, day + 1);
    }
    case 'corpusChristi': {
      return new Date(year, month, day + 60);
    }
    default: {
      return null;
    }
  }
};

const addDatesOfMovingHolidays = (
  target,
  easterSundayDate,
  easterMondayDate,
  corpusChristiDate,
) => {
  const easterSundayDesc = 'Niedziela Wielkanocna';
  const easterMondayDesc = 'Poniedziałek Wielkanocny';
  const corpusChristiDesc = 'Boże Ciało';
  const holidaysArray = [...target];
  holidaysArray.push(
    new HolidayInfo(easterSundayDate.getDate(), easterSundayDate.getMonth(), easterSundayDesc),
  );
  holidaysArray.push(
    new HolidayInfo(easterMondayDate.getDate(), easterMondayDate.getMonth(), easterMondayDesc),
  );
  holidaysArray.push(
    new HolidayInfo(corpusChristiDate.getDate(), corpusChristiDate.getMonth(), corpusChristiDesc),
  );
  return holidaysArray;
};

const addHolidaysToYear = (year, months, constHolidaysArr) => {
  const easterSundayDate = computeEasterSundayDate(year);
  const easterMondayDate = computeEasterMondayOrCorpusChristiDate(easterSundayDate, 'easterMonday');
  const corpusChristiDate = computeEasterMondayOrCorpusChristiDate(
    easterSundayDate,
    'corpusChristi',
  );

  const holidaysArr = addDatesOfMovingHolidays(
    constHolidaysArr,
    easterSundayDate,
    easterMondayDate,
    corpusChristiDate,
  );
  holidaysArr.map(({ dayId, monthId, description }) => {
    months[monthId].days[dayId - 1].isHoliday = true;
    months[monthId].days[dayId - 1].holidayDesc = description;
    return null;
  });
};

export {
  constantPolishHolidays,
  computeEasterSundayDate,
  computeEasterMondayOrCorpusChristiDate,
  addDatesOfMovingHolidays,
  addHolidaysToYear,
};
