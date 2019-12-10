const initialState = {
  styczeń: [
    {
      id: 1,
      nameOfDay: 'PN',
      hours: 9,
      holiday: false,
    },
    {
      id: 2,
      nameOfDay: 'WT',
      hours: 9,
      holiday: false,
    },
    {
      id: 3,
      nameOfDay: 'ŚR',
      hours: 9,
      holiday: false,
    },
    {
      id: 4,
      nameOfDay: 'CZ',
      hours: 0,
      holiday: false,
    },
    {
      id: 5,
      nameOfDay: 'PT',
      hours: 0,
      holiday: false,
    },
    {
      id: 6,
      nameOfDay: 'SO',
      hours: 0,
      holiday: false,
    },
    {
      id: 7,
      nameOfDay: 'ND',
      hours: 0,
      holiday: true,
    },
    {
      id: 8,
      nameOfDay: 'PN',
      hours: 0,
      holiday: false,
    },
    {
      id: 9,
      nameOfDay: 'WT',
      hours: 0,
      holiday: false,
    },
  ],
};

const replaceDayValue = (prevValue, newValue, indexToChange) => {
  const startValue = [...prevValue];
  const dayId = newValue.id;
  const index = indexToChange(startValue, dayId);
  startValue.splice(index, 1, newValue);
  return startValue;
};

const findIndexToChange = (startValue, dayId) => {
  const foundIndex = startValue.indexOf(startValue.find(day => day.id === dayId));
  return foundIndex;
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_WORK_HOURS': {
      return {
        ...state,
        ['styczeń']: replaceDayValue(state['styczeń'], action.payload.item, findIndexToChange),
      };
    }
    default:
      return state;
  }
};

export default rootReducer;

/* {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter(item => item.id !== action.payload.id),
        ], */
