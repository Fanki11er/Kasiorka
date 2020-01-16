import {
  computeEasterSundayDate,
  computeEasterMondayOrCorpusChristiDate,
  addDatesOfMovingHolidays,
} from './holidayTools';

describe('Is correct computing easter sunday date', () => {
  test('Is correct computing date of easterSunday', () => {
    let easterSunday = computeEasterSundayDate(2020);
    expect(easterSunday.getDate()).toBe(12);
    expect(easterSunday.getMonth()).toBe(3);

    easterSunday = computeEasterSundayDate(2008);
    expect(easterSunday.getDate()).toBe(23);
    expect(easterSunday.getMonth()).toBe(2);

    easterSunday = computeEasterSundayDate(2024);
    expect(easterSunday.getDate()).toBe(31);
    expect(easterSunday.getMonth()).toBe(2);
  });

  test('Is it sunday', () => {
    const easter = computeEasterSundayDate(2024);
    expect(easter.getDay()).toBe(0);
  });
});

describe('Is correct computing easter monday date', () => {
  test('Is correct computing date of easterMonday', () => {
    let easterSunday = computeEasterSundayDate(2020);
    let easterMonday = computeEasterMondayOrCorpusChristiDate(easterSunday, 'easterMonday');
    expect(easterMonday.getDate()).toBe(13);
    expect(easterMonday.getMonth()).toBe(3);
    expect(easterMonday.getDay()).toBe(1);

    easterSunday = computeEasterSundayDate(2008);
    easterMonday = computeEasterMondayOrCorpusChristiDate(easterSunday, 'easterMonday');
    expect(easterMonday.getDate()).toBe(24);
    expect(easterMonday.getMonth()).toBe(2);
    expect(easterMonday.getDay()).toBe(1);

    easterSunday = computeEasterSundayDate(2024);
    easterMonday = computeEasterMondayOrCorpusChristiDate(easterSunday, 'easterMonday');
    expect(easterMonday.getDate()).toBe(1);
    expect(easterMonday.getMonth()).toBe(3);
    expect(easterMonday.getDay()).toBe(1);
  });
});

describe('Is correct computing corpus Christi date', () => {
  test('Is correct computing date of corpus Christi', () => {
    let easterSunday = computeEasterSundayDate(2020);
    let corpusChristi = computeEasterMondayOrCorpusChristiDate(easterSunday, 'corpusChristi');
    expect(corpusChristi.getDate()).toBe(11);
    expect(corpusChristi.getMonth()).toBe(5);
    expect(corpusChristi.getDay()).toBe(4);

    easterSunday = computeEasterSundayDate(2008);
    corpusChristi = computeEasterMondayOrCorpusChristiDate(easterSunday, 'corpusChristi');
    expect(corpusChristi.getDate()).toBe(22);
    expect(corpusChristi.getMonth()).toBe(4);
    expect(corpusChristi.getDay()).toBe(4);

    easterSunday = computeEasterSundayDate(2024);
    corpusChristi = computeEasterMondayOrCorpusChristiDate(easterSunday, 'corpusChristi');
    expect(corpusChristi.getDate()).toBe(30);
    expect(corpusChristi.getMonth()).toBe(4);
    expect(corpusChristi.getDay()).toBe(4);
  });
});

describe('Is adding moving holidays to array', () => {
  const testHolidaysArray = [];
  const easterSunday = computeEasterSundayDate(2024);
  const easterMonday = computeEasterMondayOrCorpusChristiDate(easterSunday, 'easterMonday');
  const corpusChristi = computeEasterMondayOrCorpusChristiDate(easterSunday, 'corpusChristi');

  const allHolidayDays = addDatesOfMovingHolidays(
    testHolidaysArray,
    easterSunday,
    easterMonday,
    corpusChristi,
  );

  expect(allHolidayDays).toEqual([
    {
      dayId: 31,
      monthId: 2,
      description: 'Niedziela Wielkanocna',
    },
    {
      dayId: 1,
      monthId: 3,
      description: 'Poniedziałek Wielkanocny',
    },
    {
      dayId: 30,
      monthId: 4,
      description: 'Boże Ciało',
    },
  ]);
});
