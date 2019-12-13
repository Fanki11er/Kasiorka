import { createNewYear } from '../tools/index';
import { monthNames } from '../tools/index';
const initialState = {
  styczeń: [
    {
      dayId: 1,
      nameOfDay: 'PN',
      workHours: 9,
      isHoliday: false,
    },
    {
      dayId: 2,
      nameOfDay: 'WT',
      workHours: 9,
      isHoliday: false,
    },
    {
      dayId: 3,
      nameOfDay: 'ŚR',
      workHours: 9,
      isHoliday: false,
    },
    {
      dayId: 4,
      nameOfDay: 'CZ',
      workHours: 0,
      isHoliday: false,
    },
    {
      dayId: 5,
      nameOfDay: 'PT',
      workHours: 0,
      isHoliday: false,
    },
    {
      id: 6,
      nameOfDay: 'SO',
      workHours: 0,
      isHoliday: false,
    },
    {
      dayId: 7,
      nameOfDay: 'ND',
      workHours: 0,
      isHoliday: true,
    },
    {
      id: 8,
      nameOfDay: 'PN',
      workHours: 0,
      isHoliday: false,
    },
    {
      dayId: 9,
      nameOfDay: 'WT',
      workHours: 0,
      isHoliday: false,
    },
  ],
};

const replaceDayValue = (prevValue, newValue, indexToChange) => {
  const startValue = [...prevValue];
  const dayId = newValue.dayId;
  const index = indexToChange(startValue, dayId);
  startValue.splice(index, 1, newValue);
  return startValue;
};

const findIndexToChange = (startValue, dayId) => {
  const foundIndex = startValue.indexOf(startValue.find(day => day.dayId === dayId));
  return foundIndex;
};

const testState = createNewYear(monthNames, 2019);

const testReducer = (state = testState.months, action) => {
  return state;
};
export default testReducer;

/*const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_WORK_HOURS': {
      return {
        ...state,
        ['styczeń']: replaceDayValue(state['styczeń'], action.payload.item, findIndexToChange),
      };
    }
    default:
      return state;
  }
};

export default rootReducer;*/

/*const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_WORK_HOURS': {
      return {
        ...state,
        ['styczeń']: replaceDayValue(state['styczeń'], action.payload.item, findIndexToChange),
      };
    }
    default:
      return state;
  }
};

export default rootReducer;*/
